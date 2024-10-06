import React, { useState, useEffect } from 'react';
import axios from 'axios';
import he from 'he'; // Import the he library for HTML entity decoding

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function TriviaGameGeneralKnowledge() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  useEffect(() => {
    fetchTrivia();
  }, []);

  const fetchTrivia = async () => {
    try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=9&type=multiple`);
      const decodedQuestions = response.data.results.map((question) => {
        const decodedQuestion = {
          ...question,
          question: he.decode(question.question), // Decode question text
          correct_answer: he.decode(question.correct_answer), // Decode correct answer
          incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)), // Decode incorrect answers
        };
        return decodedQuestion;
      });
      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Error getting trivia", error);
    }
  }

  const handleAnswerSelect = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct_answer) {
      setScore(score + 1);
    } else {
      setQuizOver(true);
      setScore(0);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizOver(true);
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizOver(false);
  }

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  if (quizOver) {
    return (
      <div className="bg-white p-4 rounded border border-gray-300 shadow">
        <h2 className="text-xl font-semibold mb-2">General Knowledge Quiz Results</h2>
        <p>Your score: {score}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledOptions = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  return (
    <div className="bg-white p-4 rounded border border-gray-300 shadow">
      <h2 className="text-2xl font-semibold mb-4">General Knowledge Trivia</h2>
      <p className="text-gray-700 mb-2">
        Question {currentQuestionIndex + 1}: {currentQuestion.question}
      </p>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => (
            <button
              className="bg-blue-500 text-white text-lg font-semibold p-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              key={index}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <p className="text-gray-700">
        Score: {score}
      </p>
    </div>
  );
}