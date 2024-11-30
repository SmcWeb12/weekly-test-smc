import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation(); // Get userInfo, score, answers, and questions from the test page
  const { userInfo, score, totalQuestions, userAnswers, questions } = state || {};  // Safely destructure from state

  const [loading, setLoading] = useState(true); // To handle loading state for user image or data fetching
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && score !== undefined) {
      setLoading(false); // If all data is available, stop loading
    }
  }, [userInfo, score]);

  // If userInfo or score is missing, show an error and redirect to the test page
  if (loading) {
    return (
      <div className="loading-message text-center p-6">
        <p>Loading your results...</p>
      </div>
    );
  }

  if (!userInfo || score === undefined) {
    return (
      <div className="error-message text-center p-6 text-red-600">
        Error: User information or test score is missing. Please try again.
        <button
          onClick={() => navigate("/test", { replace: true })}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Go Back to Test
        </button>
      </div>
    );
  }

  // Calculate the score percentage (if applicable)
  const scorePercentage = totalQuestions ? ((score / totalQuestions) * 100).toFixed(2) : 0;

  return (
    <div className="result-page bg-gradient-to-r from-blue-600 to-green-500 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center text-white">Test Completed</h2>

      <div className="user-info space-y-4 bg-white p-6 rounded-lg shadow-lg">
        {/* Display user image */}
        {userInfo.image ? (
          <div className="text-center mb-4">
            <img
              src={userInfo.image} // Assuming image is a URL
              alt="User Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        ) : (
          <div className="text-center mb-4">No image available</div>
        )}
        <p className="text-lg">
          <strong>Name:</strong> {userInfo.name || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userInfo.email || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Score:</strong> {score || "N/A"} / {totalQuestions || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Percentage:</strong> {scorePercentage}% {/* Display the score percentage */}
        </p>
      </div>

      {/* Display Correct and Incorrect Answers in Cards */}
      <div className="mt-8 space-y-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">Your Results</h3>
        {questions.map((question, index) => {
          const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
          const isCorrect = userAnswer?.answer === question.answer;
          return (
            <div key={question.id} className="question-card bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">
                <strong>{index + 1}. {question.question}</strong>
              </p>
              <div className="mt-2">
                <p className={`text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  <strong>Your Answer:</strong> {userAnswer?.answer || "N/A"}
                </p>
                <p className={`text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                  <strong>Correct Answer:</strong> {question.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to retry the test */}
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/test", { replace: true })}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry Test
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
