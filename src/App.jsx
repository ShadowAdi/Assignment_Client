import { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "./components/CouponCard";
import { Link } from "react-router-dom";

function App() {
  const [coupons, setCoupons] = useState([]);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [isToken]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "https://assignment-dqi6.onrender.com/api/coupon/findAllCoupons",
          { withCredentials: true }
        );
        if (response.data.success) {
          setCoupons(response.data.coupons);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  // Function to handle claimed coupons
  const handleCouponClaim = (claimedCouponId) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon._id === claimedCouponId
          ? { ...coupon, status: "claimed" }
          : coupon
      )
    );
  };

  return (
    <div className="bg-slate-200 min-h-screen py-8 px-10 flex flex-col space-y-6 w-full items-center justify-start">
      <nav className="w-full flex justify-end gap-5 items-center">
        {isToken && (
          <Link to={"/admin"} className="text-blue-700 underline">
            Go To Admin
          </Link>
        )}
        {isToken && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
            }}
            className="bg-blue-700 py-4 px-5 text-white "
          >
            Logout
          </button>
        )}
        {!isToken && (
          <Link to={"/login"} className="text-blue-700 ">
            Login As Admin
          </Link>
        )}
      </nav>
      <section className="w-full flex flex-col gap-5 justify-center items-center">
        <div className="flex justify-center items-center w-[60%]">
          <h1 className="text-3xl font-bold text-black">Coupons</h1>
        </div>

        <main className="px-4 py-5 w-2/3 grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <CouponCard
                key={coupon._id}
                coupon={coupon}
                onClaim={handleCouponClaim}
              />
            ))
          ) : (
            <div className="w-[80%] mx-auto py-6  justify-center items-center flex">
              <p className="text-gray-500 ">No coupons available</p>
            </div>
          )}
        </main>
      </section>
    </div>
  );
}

export default App;
