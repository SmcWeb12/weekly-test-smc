import React from "react";

const QuestionCard = ({
  question,
  index,
  handleOptionChange,
  userAnswers,
  totalQuestions,
  isSubmitted,
}) => {
  const userAnswer = userAnswers.find((a) => a.questionId === question.id);

  return (
    <div
      className="relative border-2 border-gray-200 p-6 rounded-xl shadow-xl bg-cover bg-center transition-transform transform hover:scale-105"
      style={{
        backgroundImage: `url(${question.image || "/default-background.jpg"})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        {/* Question Progress */}
        <p className="text-right text-sm font-medium text-gray-300 mb-2">
          Question {index + 1} of {totalQuestions}
        </p>

        {/* Question Text */}
        <h3 className="text-2xl font-semibold mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, optIndex) => {
            const isSelected = userAnswer?.answer === option;
            const isCorrect = isSubmitted && question.answer === option;
            const isWrong =
              isSubmitted && isSelected && question.answer !== option;

            return (
              <div
                key={optIndex}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  isCorrect
                    ? "bg-green-500 text-white"
                    : isWrong
                    ? "bg-red-500 text-white"
                    : isSelected
                    ? "bg-blue-400 text-white"
                    : "bg-gray-800"
                } hover:bg-blue-600`}
                onClick={() => !isSubmitted && handleOptionChange(question.id, option)}
              >
                <input
                  type="radio"
                  id={`option-${question.id}-${optIndex}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={isSelected}
                  disabled={isSubmitted}
                  onChange={() => handleOptionChange(question.id, option)}
                  className="mr-3"
                />
                <label
                  htmlFor={`option-${question.id}-${optIndex}`}
                  className="text-lg"
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
