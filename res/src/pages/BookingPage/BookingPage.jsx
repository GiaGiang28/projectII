import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, BookingTable } from "../../components";
import { Footer } from "../../container";

const BookingPage = () => {
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
      <BookingTable />
      <Footer />
    </div>
  );
};

export default BookingPage;
