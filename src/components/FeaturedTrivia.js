import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';


const FeaturedTrivia = () => {
    const [featuredQuestion, setFeaturedQuestion] = useState('');

    useEffect(() => {
        fetchTriva();
    }, []);
    
    const fetchTriva = async () => {
        try{
            const response = await axios.get("https://opentdb.com/api.php?amount=1")
            const question = response.data.results[0].question;
            setFeaturedQuestion(question);
        } catch(error) {
            console.error("Error getting trivia", error);
        }
    };

    return(
        <div className="bg-white p-4 rounded border border-gray-300 shadow">
            <h2 className="text-xl font-semibold mb-2">Featured Trivia</h2>
            <p className="text-gray-700">{featuredQuestion}</p>
        </div>
        
    )
}

export default FeaturedTrivia;