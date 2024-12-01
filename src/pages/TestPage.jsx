import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import QuestionCard from "./QuestionCard"; // Import the advanced QuestionCard component

const TestPage = () => {
  const { state } = useLocation(); // Get userInfo from the signup page
  const { userInfo } = state || {};
  const [questions, setQuestions] = useState([]);  // Questions state
  const [userAnswers, setUserAnswers] = useState([]); // Store user answers
  const [timer, setTimer] = useState(300); // Timer in seconds (5 minutes)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Fetch questions from JSON file
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();

        if (Array.isArray(data)) {
          setQuestions(data); // Only set if it's an array
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timer <= 0) {
      if (timer <= 0) {
        alert("Time is up! Submitting your test...");
        handleSubmitTest();
      }
      return;
    }
    const interval = setInterval(() => setTimer((prevTime) => prevTime - 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleOptionChange = (questionId, selectedOption) => {
    const updatedAnswers = userAnswers.filter(
      (answer) => answer.questionId !== questionId
    );
    updatedAnswers.push({ questionId, answer: selectedOption });
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitTest = async () => {
    setIsSubmitted(true);

    const calculatedScore = userAnswers.reduce((score, userAnswer) => {
      const question = questions.find((q) => q.id === userAnswer.questionId);
      return question && userAnswer.answer === question.answer ? score + 1 : score;
    }, 0);

    try {
      await addDoc(collection(db, "results"), {
        ...userInfo,
        score: calculatedScore,
        totalQuestions: questions.length,
        answers: userAnswers,
      });
    } catch (error) {
      console.error("Error saving test result:", error);
      alert("Failed to save your test results. Please try again.");
    }

    // Pass userInfo and other data to ResultPage
    navigate("/result", { state: { userInfo, score: calculatedScore, totalQuestions: questions.length, userAnswers, questions } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-green-500 flex flex-col">
      {/* Timer */}
      <div className="sticky top-0 bg-blue-700 text-white p-4 text-center shadow-md">
        Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
      </div>

      <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white shadow-2xl rounded-xl mt-10">
        {/* Welcome Text and Images */}
        <div className="flex flex-col items-center mb-8 md:flex-row md:justify-between">
          <img src="/Screenshot 2024-11-28 214918.png" alt="left image" className="w-16 h-16 object-cover mb-4 md:mb-0" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">Welcome to the SMC WeeklyTest Chapter 2!</h2>
          <img src="/Screenshot 2024-11-28 214918.png" alt="right image" className="w-16 h-16 object-cover mb-4 md:mb-0" />
        </div>

        {/* Check if questions exist */}
        {questions.length === 0 ? (
          <div className="text-center text-xl text-red-600">
            <p>Loading questions...</p>
            <p>If the page keeps showing this message, there was an error fetching the questions.</p>
          </div>
        ) : (
          // Question Cards
          <div className="space-y-6">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                totalQuestions={questions.length}
                handleOptionChange={handleOptionChange}
                userAnswers={userAnswers}
                isSubmitted={isSubmitted}
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleSubmitTest}
            disabled={isSubmitted || timer <= 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitted ? "Submitted" : "Submit Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
