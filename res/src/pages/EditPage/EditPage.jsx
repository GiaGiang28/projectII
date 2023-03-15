import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, EditFood } from "../../components";
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
      <EditFood />
      <Footer />
    </div>
  );
};

export default AddPage;
