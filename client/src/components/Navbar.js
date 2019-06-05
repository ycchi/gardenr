import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

const Navbar = (props) => {
   return (
      <nav className="navbar sticky-top navbar-light bg-light flex-fill">
         <a className="navbar-brand" href="/">GARDENR</a>
         <ul className="nav justify-content-end">
            <li className="nav-item">
               <span className="navbar-text">
                  Welcom back {props.username}
               </span>
            </li>
            
            <li className="nav-item">
               <a className="nav-link text-dark" href="/auth/logout"><i className="fas fa-sign-out-alt"></i> Log Out</a>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar;