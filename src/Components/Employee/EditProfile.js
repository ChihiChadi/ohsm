import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props)
        this.state={fullname:'',phonenumber1:'',phonenumber2:'',};
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);}

  componentDidMount() {
    axios.get('/Profile/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          fullname: res.data.fullname,
          phonenumber1: res.data.phonenumber1,
          phonenumber2: res.data.phonenumber2 }); })
      .catch((error) => { console.log(error); })}

  change(event){
    let target=event.target;
    let name=target.name;
    let value=target.value;
    this.setState({[name]:value});}

  onSubmit(event) {
    event.preventDefault()
    const UserObj = {
      fullname: this.state.fullname,
      phonenumber1: this.state.phonenumber1,
      phonenumber2: this.state.phonenumber2};
    axios.put('/Profile/update/'+this.props.match.params.id, UserObj).then((res) => {
        console.log(res.data)
        console.log('Profile successfully updated') })
      .catch((error) => {console.log(error)})
    // Redirect to Profile 
    this.props.history.push('/Profile')
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
        placeholder="Enter Your Phone Number 1"
        name='phonenumber1'
        onChange={this.change}
        value={this.state.phonenumber}/>
        </div>
        <div className='form_field'>
        <label className='form_label' htmlFor='phonenumber2'>Phone Number 2:</label>
    <input type="number"
        id='phonenumber2'
        placeholder="Enter Your Phone Number 2"
        name='phonenumber2'
        onChange={this.change}
        value={this.state.phonenumber2}/>
        </div>
        <button className='form_field_button btn'>Update</button>
          
        
    </form>
    </div>);
  }
}
export default withRouter(EditProfile);