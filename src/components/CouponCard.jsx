import React, { useState } from "react";
import axios from "axios";

const CouponCard = ({ coupon, onClaim }) => {
    const [isClaimed, setIsClaimed] = useState(false);
  
    const handleClaim = async () => {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/coupon/claim"
        );
  
        if (response.data.success) {
          setIsClaimed(true);
          onClaim(response.data.coupon._id); // Call the parent function
        }
      } catch (error) {
        console.error("Error claiming coupon:", error);
      }
    };
  
  return (
    <div className="px-4 py-5 space-y-5 bg-slate-600 shadow-xl rounded-md flex flex-col items-start">
      <h4 className="text-2xl text-white">{coupon.code}</h4>
      <button
        className={`px-4 rounded-xl py-3 ${
          isClaimed ? "bg-gray-400" : "bg-blue-600"
        }`}
        onClick={handleClaim}
        disabled={isClaimed}
      >
        <span className="text-white">
          {isClaimed ? "Claimed" : "Claim Coupon"}
        </span>
      </button>
    </div>
  );
};

export default CouponCard;
