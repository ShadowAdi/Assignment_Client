import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data ", formData);
      const res = await axios.post(
        "https://assignment-dqi6.onrender.com//api/user/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.log("Error ", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white w-[40%] mx-auto h-[40%] shadow-lg rounded"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
