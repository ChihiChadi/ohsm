import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditUser extends Component {
  constructor(props) {
    super(props)
        this.state={
          fullname:'',
          phonenumber1:'',
          phonenumber2:'',
          role:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/Users/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          fullname: res.data.fullname,
          phonenumber1: res.data.phonenumber1,
          phonenumber2: res.data.phonenumber2,
          role:res.data.role
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  change(event){
    let target=event.target;
    let name=target.name;
    let value=target.value;
    this.setState({
     [name]:value
 });
}

  onSubmit(event) {
    event.preventDefault()
    const UserObj = {
      fullname: this.state.fullname,
      phonenumber1: this.state.phonenumber1,
      phonenumber2: this.state.phonenumber2,
      role:this.state.role
    };
    axios.put('/Users/update/'+this.props.match.params.id, UserObj)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to User Page 
    this.props.history.push('/Users')
  }


  render() {
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
        <label className='form_label' htmlFor='phonenumber1'>Phone Number 1:</label>
    <input type="number"
        required
        id='phonenumber1'
        placeholder="Enter Your Phone Number #1"
        name='phonenumber1'
        onChange={this.change}
        value={this.state.phonenumber1}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='phonenumber2'>Phone Number 2:</label>
    <input type="number"
        id='phonenumber2'
        placeholder="Enter Your Phone Number"
        name='phonenumber2'
        onChange={this.change}
        value={this.state.phonenumber2}/>
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
        <option value="Admin">Admin</option>
        <option value="OHSMManager">OHSM Manager</option>
        <option value="Employee">Employee</option>
        </select>
        </div>

        
        <button className='form_field_button btn'>Update</button>
          
        
    </form>
    </div>);
  }
}
export default withRouter(EditUser);