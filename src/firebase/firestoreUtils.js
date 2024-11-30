import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import Firestore database instance

// Function to add an enquiry to Firestore
export const addEnquiry = async (enquiryData) => {
  try {
    // Adding the enquiry data to Firestore in the 'enquiries' collection
    const docRef = await addDoc(collection(db, "enquiries"), enquiryData);
    console.log("Enquiry added with ID: ", docRef.id); // Optionally log the document ID
  } catch (error) {
    console.error("Error adding enquiry: ", error); // Log any errors
    throw error; // Throw error so that it can be caught in the component
  }
};
