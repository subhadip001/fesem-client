import React from "react";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="header">
        <div className="brand">
          <div className="logo"></div>
          <h1>FESEM</h1>
        </div>
        <div className="links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Header;
