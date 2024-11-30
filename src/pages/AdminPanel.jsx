import { useEffect, useState } from "react"; // Import necessary hooks
import { db } from "../firebase/firebaseConfig"; // Firebase configuration
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firestore functions
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa"; // Loading and error icons

const AdminPanel = () => {
  const [results, setResults] = useState([]);  // Store the results data
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // For delete confirmation modal
  const [deleteId, setDeleteId] = useState(null); // Store the ID of the result to delete

  // Fetching results from Firestore
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "results"));
        const resultsData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Store the document ID for later deletion
          questions: doc.data()?.questions || [],  // Ensure questions is always an array
          userAnswers: doc.data()?.userAnswers || [],  // Ensure userAnswers is always an array
          ...doc.data(),
        }));
        setResults(resultsData);
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    fetchResults();
  }, []);

  // Function to delete a specific result with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this result?");
    if (!confirmDelete) return; // If user cancels, do not proceed with deletion

    try {
      const docRef = doc(db, "results", id); // Reference to the specific document
      await deleteDoc(docRef); // Delete the document
      setResults(results.filter((result) => result.id !== id)); // Remove the deleted result from the state
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete the result. Please try again.");
    }
  };

  // Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center text-red-600">
        <FaExclamationTriangle className="text-6xl mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-800">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 p-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
          Admin Panel - Test Results
        </h2>

        <div className="space-y-8">
          {results.map((result, index) => (
            <div key={result.id} className="card bg-cover bg-center rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105" 
                 style={{ backgroundImage: `url('/images/Screenshot-2024-11-28-214918.png')`, backgroundSize: 'cover' }}>
              
              {/* Updated gradient overlay with a custom color (blue) */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-transparent to-transparent rounded-xl"></div>
              
              <div className="relative p-6 z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-100">{`Student ${index + 1}: ${result.name}`}</h3>
                  <button
                    onClick={() => {
                      setDeleteId(result.id);
                      setShowDeleteConfirm(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4">
                  <p><strong>Email:</strong> {result.email}</p>
                  <p><strong>Phone:</strong> {result.phone}</p>
                  <p><strong>Father's Name:</strong> {result.fathersName}</p>
                  <p><strong>Batch Time:</strong> {result.batchTime}</p>
                  <p><strong>Score:</strong> {result.score}</p>
                  <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
                  <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
                </div>

                {/* Displaying the answers */}
                {result.questions && result.questions.length > 0 && result.questions.map((question, qIndex) => {
                  const userAnswer = result.userAnswers.find((answer) => answer.questionId === question.id);
                  const isCorrect = userAnswer?.answer === question.answer;
                  return (
                    <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm mt-4 bg-opacity-90">
                      <p><strong>{qIndex + 1}. {question.question}</strong></p>
                      <p className={`text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                        <strong>Your Answer:</strong> {userAnswer?.answer || "N/A"}
                      </p>
                      <p className={`text-lg ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                        <strong>Correct Answer:</strong> {question.answer}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center">
              <h3 className="text-2xl mb-4">Are you sure?</h3>
              <p>This action cannot be undone.</p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                  }}
                  className="px-6 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(deleteId);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
