import { Navbar, AddFood } from "../../components";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../container";

const AddPage = () => {
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
      <AddFood />
      <Footer />
    </div>
  );
};

export default AddPage;
