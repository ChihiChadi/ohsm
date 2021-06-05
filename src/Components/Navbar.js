import React from 'react';
import "./Navbar.css";
import avatar from './avatar.svg';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
//import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {Link} from 'react-router-dom';
 

function Navbar ({ sidebarOpen, openSidebar }) {

    return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <MenuRoundedIcon className="fa fa-bars" aria-hidden="true"/>
      </div>
      <div className="navbar__left">
        <Link to ='#' className="active_link">User</Link>
      </div>
      <div className="navbar__right">
        <Link to='/Profile'>
          <img width="30" src={avatar} alt="avatar" />
        </Link>
      </div>
    </nav>
  );
  
};

export default Navbar;
  
    