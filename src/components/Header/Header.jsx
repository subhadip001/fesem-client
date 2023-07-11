import React from 'react'
import "./Header.css"
import image from "./iit.png";

function Header() {
  return (
    <div className='header'>
   <div className='logo'>
      <img className='iitl' src={image}/>
    </div>
    <h1>FESEM</h1>
    </div>
  )
}

export default Header
