import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to home page
      return;
    }
  });

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/coupon/create",
        { code: couponCode },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("response ", response.data);
      alert("Coupon created successfully!");
      setCouponCode("");
    } catch (error) {
      console.log("error ", error);
      alert("Error creating coupon");
    }
  };

  return (
    <div className="flex items-center w-full  mx-auto flex-col space-y-3 h-screen  justify-center  bg-gray-200  my-auto">
      <form
        onSubmit={handleCreateCoupon}
        className="p-6 bg-white w-[40%] mx-auto  shadow-lg rounded"
      >
        <h2 className="text-xl font-bold mb-4">Create Coupon</h2>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Create Coupon
        </button>
      </form>
      <div className="p-3 bg-white w-[40%] mx-auto justify-center items-center shadow-lg rounded">
        <Link
          to={"/admin"}
          className="      bg-white text-green-500 rounded"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default CreateCoupon;
