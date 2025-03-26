import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("https://assignment-dqi6.onrender.com/api/user/register", formData);
      console.log("Response ",response)
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Error registering user");
      console.log("Error ",error)
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white w-[40%] mx-auto h-[40%] shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
