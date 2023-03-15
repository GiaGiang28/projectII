import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingTable.css";

const BookingTable = () => {
  const user = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    email: user.email,
    userid: user.id,
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/booking/", values);
      navigate("/Successful");
    } catch (error) {
      navigate("/Error");
    }
  };

  return (
    <section id="form" data-aos="fade-up">
      <div className="container">
        <h5 className="form__title">Book Table</h5>
        <div className="form__wrapper">
          <form name="booking" method="POST" netlify="true">
            <div className="form__group">
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                id="firstName"
                name="First Name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="Phone">Phone</label>
              <input
                type="text"
                id="Phone"
                name="Phone"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="Date"
                onChange={(e) => setValues({ ...values, date: e.target.value })}
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="time">time</label>
              <input
                type="time"
                id="time"
                name="Time"
                onChange={(e) => setValues({ ...values, time: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn primary-btn"
              onClick={handleClick}
            >
              Book Table
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingTable;
