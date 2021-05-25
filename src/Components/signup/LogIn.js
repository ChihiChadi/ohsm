import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import './SignUp.css';
import loginavatar from './login.png';
import AuthService from '../AuthService';
import {AuthContext} from '../AuthContext';
import Message from '../Message';

const LogIn = props=>{
    const [user,setUser] = useState({email: "", password : ""});
    const authContext = useContext(AuthContext);
    const [message,setMessage] = useState(null);

    const change = event =>{
        setUser({...user,[event.target.name] : event.target.value});
    };

    const onSubmit = event =>{
        event.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/Profile');
            } 
            else{
            alert("Email Or Password Wrong");
            }});};

           return(
                <div className='form'>
                <form className='LoginForm' onSubmit={onSubmit}>
                <img alt='' src={loginavatar} width="100px" height="100px"/>
            <div className='form_field'>
          <label className='form_label' htmlFor='email'>E-mail Address :</label> 
         <input type='email'
            required
            id='email'
            name='email'
            className='form_field_input'
            placeholder="Enter E-mail"
            onChange={change}/>
           </div>
           <div className='form_field'>
          <label className='form_label' htmlFor='password'>Password :</label>
        <input type='password'
            required
            id="password"
            name='password'
            className='form_field_input'
            placeholder="********************"
            onChange={change}/> 
            </div>
            <div className='form_field'>
           <button className='form_field_button btn'>Log In</button><Link to='/Register' className='form_name_link'> Create an Account</Link>
           </div>
        </form>
        {message ? <Message message={message}/> : null}
        </div>  
)   
}


export default LogIn;
  