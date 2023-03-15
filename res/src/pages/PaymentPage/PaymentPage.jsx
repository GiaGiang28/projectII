import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Payment } from "../../components";
import { Footer } from "../../container";

const PaymentPage = () => {
  const user = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user?.isAdmin === 0) {
      navigate("/");
    }
    if (!user) {
      navigate("/LogIn");
    }
  });
  return (
    <div>
      <Navbar />
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
