import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditUser extends Component {
  constructor(props) {
    super(props)
        this.state={
          fullname:'',
          phonenumber:'',
          BirthDate:'',
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/Users/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          fullname: res.data.fullname,
          phonenumber: res.data.phonenumber,
          BirthDate: res.data.BirthDate
          
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
      BirhDate: this.state.BirthDate,
      phonenumber: this.state.phonenumber
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
        <label className='form_label' htmlFor='phonenumber'>Phone Number :</label>
    <input type="number"
        required
        id='phonenumber'
        placeholder="Enter Your Phone Number"
        name='phonenumber'
        onChange={this.change}
        value={this.state.phonenumber}/>
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
        <button className='form_field_button btn'>Update</button>
          
        
    </form>
    </div>);
  }
}
export default withRouter(EditUser);