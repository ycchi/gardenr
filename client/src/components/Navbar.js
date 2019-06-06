import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
   return (
      <nav className="navbar sticky-top navbar-light bg-light flex-fill">
         <a className="navbar-brand" href="/garden">GARDENR</a>
         <ul className="nav justify-content-end">
            <li className="nav-item">
               <span className="navbar-text">
                  Welcom back {props.username}
               </span>
            </li>
            
            <li className="nav-item">
               <a className="nav-link text-dark" href="http://localhost:5000/auth/logout"><i className="fas fa-sign-out-alt"></i> Log Out</a>
            </li>
         </ul>
      </nav>
   )
}

export default NavBar;