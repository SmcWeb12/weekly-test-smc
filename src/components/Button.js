import React from 'react';

const Button = ({ 
  text, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-white transition duration-300 
                 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} 
                 ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
