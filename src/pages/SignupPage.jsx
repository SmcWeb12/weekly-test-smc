import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    fathersName: "",
    batchTime: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!userInfo.name) validationErrors.name = "Name is required";
    if (!userInfo.email) validationErrors.email = "Email is required";
    if (!userInfo.phone) validationErrors.phone = "Phone number is required";
    if (!userInfo.fathersName) validationErrors.fathersName = "Father's name is required";
    if (!userInfo.batchTime) validationErrors.batchTime = "Batch time is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      setTimeout(() => {
        navigate("/test", { state: { userInfo } });
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('Screenshot 2024-11-28 214918.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-70"></div>

      <div className="relative p-8 max-w-lg w-full bg-white bg-opacity-90 rounded-3xl shadow-xl transform transition-all duration-500 hover:scale-105">
        <div className="flex items-center justify-center mb-8">
          <div
            className="w-12 h-12 bg-cover bg-center rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('Screenshot 2024-11-28 220732.png')",
            }}
          ></div>
          <h2 className="text-4xl font-bold text-center text-gradient mx-6 uppercase tracking-wider">
            Signup for Test
          </h2>
          <div
            className="w-12 h-12 bg-cover bg-center rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('Screenshot 2024-11-28 220732.png')",
            }}
          ></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              placeholder="Your Phone"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              name="fathersName"
              value={userInfo.fathersName}
              onChange={handleInputChange}
              placeholder="Father's Name"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            {errors.fathersName && <p className="text-red-500 text-sm">{errors.fathersName}</p>}
          </div>

          <div>
            <input
              type="text"
              name="batchTime"
              value={userInfo.batchTime}
              onChange={handleInputChange}
              placeholder="Batch Time"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            {errors.batchTime && <p className="text-red-500 text-sm">{errors.batchTime}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"}`}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          <p>
      class 11th test chapter-2?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
           
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
