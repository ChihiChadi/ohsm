import "../Sidebar.css";
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import {NavLink} from 'react-router-dom';
import {EmployeeSidebarComponents} from './EmployeeSidebarComponents';
import AuthService from '../AuthService';
import {AuthContext} from '../AuthContext'; 
import {useContext} from 'react';

const  EmployeeSidebar = ({ sidebarOpen, closeSidebar }) =>{

  const {setIsAuthenticated,setUser} = useContext(AuthContext);
  const Logout = ()=>{
    AuthService.logout().then(data=>{
        if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
        }
    });
}
  return (
    <div id="sidebar" className={sidebarOpen ? "sidebar_responsive" : ""} >
      <div className="sidebar__title">
          <h1>Health & Safety</h1>
          <HighlightOffRoundedIcon className='CloseButton' onClick={() => closeSidebar()} />
      </div>

      <div className="sidebar__menu">
      <ul className="SidebarList">
                {EmployeeSidebarComponents.map((val,key)=>{
                   return(
                    <li 
                     className={val.cName} key={key}  >
                     <NavLink to={val.link} id="ListComponent" activeClassName="active">
                        <span>{val.icon}</span>
                        <span className='LinkTitle'>{val.title}</span>
                      </NavLink>
                    </li>
                )
            })}
            </ul>
            <button type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={Logout}>Logout</button>
        </div>
      </div>
  );
};

export default EmployeeSidebar;