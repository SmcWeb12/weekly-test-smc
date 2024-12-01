import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2"; // Import Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

  // Create chart data based on user answers and questions
  const chartData = {
    labels: questions.map((question) => question.question),  // X-Axis labels (questions)
    datasets: [
      {
        label: 'Your Score',  // Label for the chart
        data: questions.map((question) => {
          const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
          return userAnswer?.answer === question.answer ? 1 : 0; // Return 1 for correct answer, 0 for incorrect
        }),
        backgroundColor: questions.map((question, index) => {
          const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
          return userAnswer?.answer === question.answer
            ? 'rgba(0, 204, 102, 0.8)'  // Green color for correct answers
            : 'rgba(255, 99, 132, 0.8)';  // Red color for incorrect answers
        }), 
        borderColor: 'rgba(0, 0, 0, 0.1)',  // Light border color for all bars
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 204, 255, 0.8)',  // Hover effect for bars
        hoverBorderColor: 'rgba(0, 204, 255, 1)',  // Hover border color
        barPercentage: 0.8, // Bar thickness
      },
    ],
  };

  return (
    <div className="result-page bg-gradient-to-r from-blue-600 to-green-500 p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Test Completed</h2>

      <div className="user-info space-y-6 bg-white p-6 rounded-lg shadow-lg">
        {/* Display user image */}
        {userInfo.image ? (
          <div className="text-center mb-6">
            <img
              src={userInfo.image} // Assuming image is a URL
              alt="User Avatar"
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
            />
          </div>
        ) : (
          <div className="text-center mb-6 text-gray-600">No image available</div>
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
        <h3 className="text-2xl font-semibold mb-6 text-center">Your Results</h3>

        {/* Chart.js Bar chart rendering */}
        <div className="chart-container mt-8 mb-6">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              animations: {
                tension: {
                  duration: 1000,
                  easing: 'easeInOutQuad',
                  from: 1,
                  to: 0,
                  loop: true,
                },
              },
              scales: {
                x: {
                  beginAtZero: true,  // X-Axis starts at 0
                  ticks: {
                    font: {
                      size: 14,
                      family: 'Arial, sans-serif',
                    },
                  },
                },
                y: {
                  beginAtZero: true,  // Y-Axis starts at 0
                  max: 1,  // Maximum value on Y-Axis is 1 (since it's binary - 0 or 1)
                  ticks: {
                    font: {
                      size: 14,
                      family: 'Arial, sans-serif',
                    },
                  },
                },
              },
              plugins: {
                tooltip: {
                  backgroundColor: '#333',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: '#aaa',
                  borderWidth: 1,
                },
                legend: {
                  labels: {
                    font: {
                      size: 16,
                      family: 'Arial, sans-serif',
                      weight: 'bold',
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* List all the questions with answers */}
        {questions.map((question, index) => {
          const userAnswer = userAnswers.find((answer) => answer.questionId === question.id);
          const isCorrect = userAnswer?.answer === question.answer;
          return (
            <div key={question.id} className="question-card bg-white p-6 rounded-lg shadow-lg mb-4 hover:shadow-2xl transition-shadow">
              <p className="text-lg font-semibold text-gray-800">
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
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/test", { replace: true })}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-300"
        >
          Retry Test
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
