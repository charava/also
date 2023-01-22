import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div class='NavBarBox'>
      <Link class='navName' to="/"><h2>also</h2></Link>
      <ul>
        <li class='navList'><Link class='navLink' to="/">Home</Link></li>
        <li class='navList'><Link class='navLink' to="/form">Find a Buddy</Link></li>
        <li class='navList'><Link class='navLink' to="/about">About</Link></li>
        <li class='navList'><Link class='navLink' to="/faqs">FAQs</Link></li>
        <li class='navList'><Link class='navLink' to="/terms">Terms and Conditions</Link></li>
        <li class='navList'><Link class='navLink' to="/privacy">Privacy Policy</Link></li>
        {/* <li class='navList'><Link class='navLink' to="/contact">Contact</Link></li> */}
     	</ul>
    </div>
  );
};

export default NavBar;