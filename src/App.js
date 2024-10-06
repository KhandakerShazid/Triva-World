import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home'; 
import CreatePost from './Pages/play';
import Login from './Pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from './firebase';
import SignUp from './Pages/SignUp';
import TriviaGameAnimals from './triviagames/triviaGameAnimals'; // Import the TriviaGame components
import TriviaGameGeneralKnowledge from './triviagames/triviaGameGeneralKnowledge';
import TriviaGameHistory from './triviagames/triviaGameHistory';
import TriviaGameMusic from './triviagames/triviaGameMusic';
import TriviaGameSports from './triviagames/triviaGameSports';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    }); 
  };

  return (
    <Router>
      <body className="bg-gray-100">
        <nav className="bg-red-500 p-4">
          <div className="max-w-8xl mx-auto flex items-center justify-between">
            <Link to="/Home" className="text-2xl font-bold text-white animate-bounce hover:text-black">TRiviA WOrLd</Link>
            <ul className="flex space-x-4 ml-auto font-bold">
              <li className='animate-bounce'><Link to="/Home" className="text-white hover:text-black">Home</Link></li>
              {isAuth && (<li className='animate-bounce '><Link to="/createpost" className="text-white hover:text-black"> Trivia Games </Link></li>)}
              {!isAuth && (<li className='animate-bounce '><Link to="/signup" className='text-white hover:text-black'>Sign-Up</Link></li>)}
              {!isAuth ? (
                <li className='animate-bounce'><Link to="/login" className="text-white hover:text-black">Login</Link></li>
              ) : (
                <li className='animate-bounce'><button onClick={signUserOut} className="text-white hover:text-black">Log Out</button></li>
              )}
            </ul>
          </div>
        </nav>
      </body>

      <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        {/* Route for CategoryFilter */}
        <Route path="/createpost" element={<CreatePost/>}></Route>
        {/* Routes for trivia game components */}
        <Route path="/trivia/4" element={<TriviaGameAnimals />} />
        <Route path="/trivia/1" element={<TriviaGameGeneralKnowledge/>} />
        <Route path="/trivia/3" element={<TriviaGameHistory />} />
        <Route path="/trivia/5" element={<TriviaGameMusic />} />
        <Route path="/trivia/2" element={<TriviaGameSports />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;