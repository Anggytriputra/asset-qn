import React from "react";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorAlertWithMessage, successAlert } from "../helper/alerts";
import api from "../api/api";
import axios from "axios";
import { login } from "../reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (username, password) => {
    // console.log("username nih", username);
    try {
      const response = await axios.post("http://localhost:2000/auth", {
        username: username,
        password: password,
      });

      localStorage.setItem("token", response.data.result.token);

      // setelah mendapatkan token
      /*
      data user login akan di masukan kedalam di redux  agar bisa digunakan di global state
       */
      const usernih = response.data.result.user[0];
      dispatch(login(usernih));

      console.log("user", usernih);
      console.log("response nih", response);
      console.log("test");
      successAlert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.log("errornih", error);
      errorAlertWithMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
