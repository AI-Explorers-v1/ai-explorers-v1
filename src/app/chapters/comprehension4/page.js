"use client";

import React, { useState } from 'react';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import SideNavbar from "@/app/components/SideNavbar";
import { FaBars } from 'react-icons/fa'; 

const questions = [
  {
    question: "What is classification in AI?",
    options: [
      "Grouping objects based on their features",
      "Teaching a machine to play chess",
      "Generating new images from text",
      "Translating languages in real-time"
    ],
    correctAnswer: 0
  },
  {
    question: "Which model is commonly used for apple vs. orange classification?",
    options: [
      "Unsupervised Learning",
      "Supervised Learning",
      "Reinforcement Learning",
      "Clustering"
    ],
    correctAnswer: 1
  },
  {
    question: "What does a Decision Tree use to represent the features of a dataset?",
    options: [
      "Nodes",
      "Edges",
      "Vertices",
      "Matrices"
    ],
    correctAnswer: 0
  },
  {
    question: "What is the primary objective of the SVM algorithm?",
    options: [
      "To find the optimal hyperplane that separates data points",
      "To generate new data from existing data",
      "To recognize objects in images",
      "To translate text from one language to another"
    ],
    correctAnswer: 0
  },
  {
    question: "Which algorithm works by storing the entire dataset and classifying new data points based on similarity?",
    options: [
      "Decision Tree",
      "K-Nearest Neighbors",
      "Support Vector Machines",
      "Neural Networks"
    ],
    correctAnswer: 1
  }
];

export default function Comprehension3() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, { ...questions[currentQuestion], selectedOption, isCorrect }]);
    setSelectedOption(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers([]);
    setScore(null);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const percentageScore = (correctAnswers / questions.length) * 100;
    setScore(percentageScore);
  };

  React.useEffect(() => {
    if (currentQuestion === questions.length) {
      calculateScore();
    }
  }, [currentQuestion]);

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="relative flex-grow">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative flex-grow flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
          <SideNavbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-16 text-center text-3xl leading-9 font-extrabold text-white">
              Chapter 4 Comprehension Test
            </h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
            {currentQuestion < questions.length ? (
              <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="text-white text-lg">
                  <strong>{currentQuestion + 1}. {questions[currentQuestion].question}</strong>
                </div>
                <div className="mt-4 space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center cursor-pointer px-4 py-2 border ${selectedOption === index ? 'border-gray-400' : 'border-transparent'} rounded-md text-white`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <input
                        type="radio"
                        name="option"
                        value={index}
                        checked={selectedOption === index}
                        onChange={() => handleOptionSelect(index)}
                        className="form-radio"
                      />
                      <span className="ml-2">{option}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleNextQuestion}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-3xl font-extrabold text-white">
                  Test Completed!
                </h3>
                <div
                  className={`text-3xl font-bold mt-4 ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}
                >
                  {score !== null ? `You scored ${score.toFixed(2)}%` : null}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleRestart}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Restart Test
                  </button>
                </div>
                <div className="mt-8">
                  {answers.map((answer, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
                      <div className="text-white text-lg">
                        <strong>{index + 1}. {answer.question}</strong>
                      </div>
                      <div className="mt-2 space-y-2">
                        {answer.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`px-4 py-2 rounded-md ${optionIndex === answer.correctAnswer ? 'bg-green-500 text-white' : ''} ${optionIndex === answer.selectedOption && optionIndex !== answer.correctAnswer ? 'bg-red-500 text-white' : ''}`}
                          >
                            {option}
                            {optionIndex === answer.correctAnswer && (
                              <span className="ml-2">&#10003;</span>
                            )}
                            {optionIndex === answer.selectedOption && optionIndex !== answer.correctAnswer && (
                              <span className="ml-2">&#10007;</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
}
