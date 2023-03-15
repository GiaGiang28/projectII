import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register, LogIn, CartContainer, EditFood } from "./components";
import {
  HomePage,
  BookingPage,
  AddPage,
  MenuPage,
  OrderPage,
  EditPage,
  PaymentPage,
  StatusPage,
} from "./pages";
import "./App.css";

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/Booking" element={<BookingPage />} />
      <Route path="/AddFood" element={<AddPage />} />
      <Route path="/Menu" element={<MenuPage />} />
      <Route path="/Bill" element={<CartContainer />} />
      <Route path="/Order" element={<OrderPage />} />
      <Route path="/EditFood" element={<EditPage />} />
      <Route path="/Payment" element={<PaymentPage />} />
      <Route path="/Successful" element={<StatusPage title="Successful" />} />
      <Route
        path="/Error"
        element={<StatusPage title="Error! Please try again" />}
      />
    </Routes>
  </div>
);

export default App;
