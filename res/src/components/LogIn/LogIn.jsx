import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/userSlice";
import FormInput from "../FormInput/FormInput";
import "../Register/register.css";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState(null);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login/",
        values
      );
      dispatch(setCurrentUser(res.data));
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/");
    } catch (error) {
      setNotification(error.response.data);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl font-serif">LogIn</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <a className="login_link" href="/register">
          Create a new account
        </a>
        <h1 className="app_notification">{notification && notification}</h1>
        <button>LogIn</button>
      </form>
    </div>
  );
};

export default LogIn;
