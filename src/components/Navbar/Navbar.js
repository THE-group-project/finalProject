import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link className="brand-logo" to="/">
          FitMii
        </Link>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <Link to="/" className="waves-effect waves-light btn">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="waves-effect waves-light btn">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// have a state that says "logged in" and pass it down as a prop

export default Navbar;
