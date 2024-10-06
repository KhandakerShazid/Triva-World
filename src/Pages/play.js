import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import triviaCategories from "../triviaCategories";
import animallogo from "../images/animallogo.jpg";
import sportlogo from "../images/sportslogo.png";
import genlogo from "../images/generallogo.png";
import musiclogo from "../images/musiclogo.jpg";
import historylogo from "../images/history.jpg";


function CreatePost({ isAuth }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const gen = "Test your knowledge on a little bit of everything!";
  const sport = "Put your sports experience to use!";
  const animals = "How much do you know about Animals?";
  const music = "Who doesn't love music?";
  const history = "This ones for the geeks...";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {triviaCategories.map(category => (
        <Link
          key={category.id}
          to={`/trivia/${category.id}`}
          className={`category-card ${selectedCategory === category.id ? "selected" : ""} relative rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg hover:bg-red-500 hover:shadow-lg hover:text-white hover:scale-110 hover:duration-300 hover:ease-in-out transform transition-all`}
          onClick={() => setSelectedCategory(category.id)}
          
        >
          <img
            src={category.id === 1 ? genlogo: category.id === 2 ? sportlogo : category.id === 3 ? historylogo: category.id === 4 ? animallogo : category.id === 5 ? musiclogo : ""}
            alt={category.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className = {`text-gray-600 ${selectedCategory === category.id ? "" : "hover:text-white"}`}>{category.id === 1 ? gen: category.id === 2 ? sport : category.id === 3 ? history : category.id === 4 ? animals: category.id === 5 ? music: ""}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CreatePost;