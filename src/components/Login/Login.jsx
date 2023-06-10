import React, { useState } from "react";
import Header from "../Header/Header";
import "./Login.css";
import image from "../Homebar/Fesem.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login({setToken,setAdmin}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({
      email: email,
      password: password,
    });
    if(result.admin !== null){
      setAdmin({admin: result.admin});
      console.log(result.admin);
      navigate("/");
    }
    if (result.token !== null) {
      sessionStorage.setItem('name', JSON.stringify(result.name));
      sessionStorage.setItem('email', JSON.stringify(result.email));
      sessionStorage.setItem('dept', JSON.stringify(result.dept));
      sessionStorage.setItem('contactNo', JSON.stringify(result.contactNo));
      sessionStorage.setItem('enrollNo', JSON.stringify(result.enrollNo));
      sessionStorage.setItem('bookingsAvailableThisWeek', JSON.stringify(result.bookingsAvailableThisWeek));
      sessionStorage.setItem('_id', JSON.stringify(result.id));



      setToken({token: result.token});
      
      console.log(result);
      navigate("/");
      
    } else
      alert(
        "The password or the email id entered is incorrect. Please try again or register"
      );
  
  };
  return (
    <>
      <Header />
      <div className="login-content">
        <div className="lwrapper">
          <img className="image" src={image} />
        </div>
        <div className="login-wrapper">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter your email"
              pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
              title="example@gmail.com"
              required
            />
            <br />
            <label htmlFor="pass">Password</label>
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="pass"
              name="pass"
              placeholder="Enter your password"
              required
            />
            <br />
            <br />
            <div className="button">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setAdmin : PropTypes.func.isRequired
};

export default Login;
