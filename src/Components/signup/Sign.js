import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import Register from './Register';
import LogIn from './LogIn';

function Sign () {

    return (
      <Router>
      <h1>Welcome To Occupational Health And Safety Management</h1><br></br>
      <div className='Sign'>
        <div className='app_form'>
        <div className= "switcher">
              <NavLink  to='/Register' activeClassName='switcher_item_active' className='switcher_item'>Register</NavLink>
              <NavLink to='/LogIn' activeClassName='switcher_item_active' className='switcher_item'>  Log In  </NavLink>
           </div>
           <Route path='/Register' component={Register}/>
           <Route path='/LogIn' component={LogIn}/>  
      </div>
      </div>
      </Router>
    )
  }

export default Sign;
