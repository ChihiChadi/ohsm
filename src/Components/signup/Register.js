import React, {Component} from 'react';
import axios from 'axios';
import {Link, withRouter } from 'react-router-dom';
import './SignUp.css';


class Register extends Component{
    constructor(){
        super()
        this.state={
          fullname:'',
          email:'',
          phonenumber1:'',
          phonenumber2:'',
          password:'',
          role:'',
          gender:'',
          company:'',
          IdNumber:'',
          BirthDate:'',
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
         email:this.state.email,
         phonenumber1:this.state.phonenumber1,
         phonenumber2:this.state.phonenumber2,
         password:this.state.password,
         gender:this.state.gender,
         BirthDate:this.state.BirthDate,
         IdNumber:this.state.IdNumber,
         company:this.state.company,
         role:this.state.role
       }
         axios.post('http://localhost:4000/Register', registered)
         .then(form=>console.log(form.data),this.props.history.push('/LogIn'))
         .catch(err=>alert("Email Already Exist Or Server Problem"),this.props.history.push('/Register'))};

    render(){
        return (
            <div className='form'>
            <form className='RegisterForm' onSubmit={this.onSubmit}>
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
        <label className='form_label' htmlFor='phonenumber1'>Phone Number 1 :</label>
    <input type="number"
        required
        id='phonenumber1'
        placeholder="Enter Your Phone Number #1"
        name='phonenumber1'
        onChange={this.change}
        value={this.state.phonenumber1}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='phonenumber'>Phone Number 2 :</label>
    <input type="number"
        id='phonenumber2'
        placeholder="Enter Your Phone Number #2"
        name='phonenumber2'
        onChange={this.change}
        value={this.state.phonenumber2}/>
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
      <label className='form_label' htmlFor='BirthDate'>Birth Date :</label>
    <input type='date'
        required
        id="BirthDate"
        name='BirthDate'
        onChange={this.change}
        value={this.state.BirthDate} /> 
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='gender'>Gender :</label>
    <select
        required
        id='gender'
        name='gender'
        onChange={this.change}
        value={this.state.gender}>
        <option default>Select Your Gender:</option> 
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        </select>
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='company'>The Company You Work For :</label>
    <input type="text"
        required
        id='company'
        placeholder="Enter The Name Of The Company"
        name='company'
        onChange={this.change}
        value={this.state.company}/>
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='IdNumber'>ID Number :</label>
    <input type="number"
        required
        id='IdNumber'
        placeholder="Enter Your ID Number"
        name='IdNumber'
        onChange={this.change}
        value={this.state.IdNumber}/>
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='role'>Your Role In The Company :</label>
    <select
        required
        id='role'
        name='role'
        onChange={this.change}
        value={this.state.role}>
        <option default>Select Your Role:</option> 
        <option value="OHSMManager">OHSM Manager</option>
        <option value="Employee">Employee</option>
        </select>
        </div>
        <div className='form_field'>
       <button className='form_field_button btn'>Register</button><Link to='/LogIn' className='form_name_link'> I'm Already a Member</Link>
       </div>
    </form>
    
    </div>  
  )
        }
}
export default withRouter(Register);