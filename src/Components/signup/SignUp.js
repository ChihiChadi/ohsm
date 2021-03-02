import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter } from 'react-router-dom';
import './SignUp.css'

class SignUp extends Component{
    constructor(){
        super()
        this.state={
          fullname:'',
          username:'',
          email:'',
          password:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }
    
      change(event){
        let target=event.target;
        let name=target.name;
        let value=target.value;
        this.setState({
         [name]:value
     });
    }
    
      onSubmit(event){
       event.preventDefault()
       const registered={
         fullname:this.state.fullname,
         username:this.state.username,
         email:this.state.email,
         password:this.state.password,
       }
         axios.post('http://localhost:4000/App/SignUp', registered)
         .then(form=>console.log(form.data));
         this.props.history.push('/SignIn');
    
         }


    render(){
        return (
            <div className='form'>
            <form className='form_fields' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='fullname'>Full Name :</label>
    <input type='text'
        required
        id='fullname'
        placeholder='Enter Your Full Name'
        name='fullname'
        onChange={this.change}
        value={this.state.fullname}/>
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='username'>User Name :</label>
    <input type="text"
        required
        id='username'
        placeholder="Enter Your Username"
        name='username'
        onChange={this.change}
        value={this.state.username}/>
        </div>
        <div className='form_field'>
      <label className='form_label' htmlFor='email'>E-mail Address :</label> 
     <input type='email'
        required
        id='email'
        name='email'
        placeholder="Enter Your E-mail Address"
        onChange={this.change}
        value={this.state.email}/>
       </div>
       <div className='form_field'>
      <label className='form_label' htmlFor='password'>Password :</label>
    <input type='password'
        required
        id="password"
        name='password'
        placeholder="********************"
        onChange={this.change}
        value={this.state.password} /> 
        </div>
        <div className='form_field'>
       <button className='form_field_button btn'>Sign Up</button><Link to='/SignIn' className='form_name_link'> I'm Already a Member</Link>
       </div>
    </form>
    </div>  
  )
    }
}
export default withRouter(SignUp);