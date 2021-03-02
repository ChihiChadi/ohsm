import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';



class Sign extends Component {

  render() {

    return (
      <Router>
      <div className='Sign'>
        <div className='app_form'>
        <div className= "switcher">
              <NavLink exact to='/' activeClassName='switcher_item_active' className='switcher_item'>Sign Up</NavLink>
              <NavLink to='/SignIn' activeClassName='switcher_item_active' className='switcher_item'>Sing In</NavLink>
           </div>
           <Route exact path='/' component={SignUp}/>
      <Route path='/SignIn' component={SignIn}>
      </Route>
      </div>
      </div>
      </Router>
    )
  }
}

export default Sign
