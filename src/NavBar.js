import React from 'react';
import { Link } from "react-router-dom";
import mafecLogo from './mafec-logo-bg.png';

function NavBar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-md justify-content-end" style={{ backgroundColor: props.mode === 'dark' ? '0a192f#' : '#0a192f', height: '80px' }}>
        <div className="container-fluid">
          
          <a className="navbar-brand" href="/">
            <img src={mafecLogo} alt="logo" style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius:'15px' }} width="60" height="50" />
          </a>
  

          <div className='position-absolute start-16' id="navbarSupportedContent">
            <ul className="nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home" style={{ color: 'white', marginLeft:'20px' }}><b>Home</b></Link>
              </li>
              <li className="nav-item">
              {/* to="/generateAdmitCard"  */}
                <Link className="nav-link" to="/" style={{ color: 'white' }}><b>Generate Admit Card</b></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
