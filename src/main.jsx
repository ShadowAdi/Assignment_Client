import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import CreateCoupon from "./CreateCoupon.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use BrowserRouter
createRoot(document.getElementById("root")).render(
  <StrictMode>
<BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/CreateCoupon" element={<CreateCoupon />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<App />} /> {/* Use "/" for the root path */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
