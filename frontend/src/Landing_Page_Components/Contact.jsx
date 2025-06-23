import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "", // Add the 'date' field to formData
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add current system time to the formData
    const currentDate = new Date().toISOString(); // Get current time in ISO format
    const dataToSend = { ...formData, date: currentDate };

    try {
      const res = await axios.post("http://localhost:5000/contact", dataToSend);

      if (res.data.status === "success") {
        alert(`Your query has been submitted successfully! Contact ID: ${res.data.contact_id}`);
        setFormData({ name: "", email: "", message: "", date: "" }); // Reset form after submission
      } else {
        alert("Failed to submit query. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      alert("An error occurred while sending your query.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Have a Question in Mind?</h1>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Let Us Help You</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg max-w-lg w-full flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="yourmail@gmail.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Write your message here..."
          rows="4"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        ></textarea>

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition duration-300 font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;