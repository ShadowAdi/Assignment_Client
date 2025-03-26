import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if token exists, if not, redirect to home page
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to home page
      return;
    }

    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "https://assignment-dqi6.onrender.com//api/coupon/findCoupons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoupons(response.data.coupons);
      } catch (error) {
        console.log("Error fetching coupons ", error);
      }
    };

    fetchCoupons();
  }, [navigate]);

  const handleDelete = async (couponId) => {
    try {
      const response = await axios.delete(
        `https://assignment-dqi6.onrender.com//api/coupon/deleteCoupon/${couponId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId)); // Remove deleted coupon from state
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <div className="min-h-screen py-12 w-full justify-start flex flex-col items-center bg-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-3 items-center">
      <Link className="px-4 rounded-xl py-3 bg-blue-600" to="/CreateCoupon">
        <span className="text-white">Create Coupon</span>
      </Link>
      <Link className="px-4 rounded-xl py-3 bg-blue-600" to="/">
        <span className="text-white">Home</span>
      </Link>

      </div>
      <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div key={coupon._id} className="p-4 bg-white shadow-lg rounded">
              <h4 className="text-lg font-bold">{coupon.code}</h4>
              <p>Status: {coupon.status}</p>
              <p>
                Claimed By:{" "}
                {coupon.claimedBy ? coupon.claimedBy.ip : "Not claimed"}
              </p>
              <button
                className="px-4 rounded-xl py-3 bg-red-600 text-white mt-2"
                onClick={() => handleDelete(coupon._id)}
              >
                Delete Coupon
              </button>
            </div>
          ))
        ) : (
          <p>No coupons available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
