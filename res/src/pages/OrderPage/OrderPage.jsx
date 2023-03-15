import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Order } from "../../components";
import { Footer } from "../../container";

const OrderPage = () => {
  const user = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/LogIn");
    }
  });
  return (
    <div>
      <Navbar />
      <Order />
      <Footer />
    </div>
  );
};

export default OrderPage;
