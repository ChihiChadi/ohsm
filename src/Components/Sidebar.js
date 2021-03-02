import React from 'react';
import './Sidebar.css';
import {SidebarComponents} from './SidebarComponents';
import {NavLink} from 'react-router-dom';


function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                {SidebarComponents.map((val,key)=>{
                   return(
                    <li 
                     className={val.cName} key={key}  >
                     <NavLink to={val.link} activeClassName="active">
                        <span>{val.icon}</span>
                        <span>{val.title}</span>
                      </NavLink>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default Sidebar
