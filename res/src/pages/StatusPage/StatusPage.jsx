import React from "react";
import { Navbar, Status } from "../../components";
import { Footer } from "../../container";

const StatusPage = ({ title }) => {
  return (
    <div>
      <Navbar />
      <Status title={title} />
      <Footer />
    </div>
  );
};

export default StatusPage;
