import React from "react";
import MainBackground from "../../assets/bg.png";

const Status = ({ title }) => {
  return (
    <section
      className="w-full h-600 flex items-center justify-center"
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
      id="order"
    >
      <p
        className={`text-9xl ${
          title === "Successful" ? "text-green-700" : "text-red-800"
        }`}
      >
        {title}
      </p>
    </section>
  );
};

export default Status;
