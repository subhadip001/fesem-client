import React from "react";
import "./Homebar.css";
import image from "./Fesem.png";
import image2 from "./iit.png";

function Homebar() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="iitl" src={image2} />
        </div>
        <h1>FESEM</h1>
        <div className="links">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
      <h2 className="about-heading">FESEM Booking</h2>
      <div className="content">
        <div className="about">
          <div className="wrapper">
            <img className="image" src={image} />
            <h2 style={{ fontWeight: "bold" }}>IIC FESEM Machine</h2>
          </div>

          <br />
          <div>
            <h2 style={{ fontWeight: "bold" }}>Contact Details:</h2>
            <ul>
              <li>
                Officer/Lab In-charge -{" "}
                <span style={{ fontWeight: "bold" }}>Dr Kaushik Pal </span>
              </li>
              <li>
                In-charge Email/Phone -{" "}
                <span style={{ fontWeight: "bold" }}>
                  fesem@me.iitr.ac.in(6375980440)
                </span>
              </li>
              <li>
                Location -{" "}
                <span style={{ fontWeight: "bold" }}>
                  MIED West Block (ground floor)
                </span>
              </li>
              <li>
                Status - <span style={{ fontWeight: "bold" }}>Active</span>
              </li>
              <li>
                Sample Requirements - <br />
                <ol style={{ fontWeight: "bold" }}>
                  <li>Fine Powder Sample</li>
                  <br />
                  <li>Solid Sample of maximum size 1cm x 1cm x 1cm</li>
                </ol>
              </li>
            </ul>
            <br />
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default Homebar;
