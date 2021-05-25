import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditCompany extends Component {
  constructor(props) {
    super(props)
        this.state={
          CompanyName:'',
          PhoneNumber:'',
          Email:'',
          Website:'',
          Adress:'',
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/CompanySettings/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          CompanyName: res.data.CompanyName,
          PhoneNumber: res.data.PhoneNumber,
          Email: res.data.Email,
          Adress: res.data.Adress,
          Website:res.data.Website
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
    const CompanyObj = {
        CompanyName: this.state.CompanyName,
        PhoneNumber: this.state.PhoneNumber,
        Email: this.state.Email,
        Adress: this.state.Adress,
        Website: this.state.Website
    };

    axios.put('/CompanySettings/update/'+this.props.match.params.id, CompanyObj)
      .then((res) => {
        console.log(res.data)
        console.log('Company successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Companys Page 
    this.props.history.push('/CompanySettings')
  }


  render() {
    return (
      <div><h1>Edit Company Informations:</h1>
        <div className='form'>
            <form className='RegisterForm' onSubmit={this.onSubmit}>

        <div className='form_field'>
        <label className='form_label' htmlFor='CompanyName'>Company Name :</label>
    <input type='text'
        required
        id='CompanyName'
        placeholder="Enter The Company's Name"
        name='CompanyName'
        onChange={this.change}
        value={this.state.CompanyName}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='PhoneNumber'>Phone Number :</label>
    <input type="number"
        required
        id='PhoneNumber'
        placeholder="Enter The Company's Phone Number"
        name='PhoneNumber'
        onChange={this.change}
        value={this.state.PhoneNumber}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='Email'>Email :</label>
    <input type='text'
        required
        id="Email"
        name='Email'
        placeholder="Enter The Company's Email"
        onChange={this.change}
        value={this.state.Email} /> 
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='Adress'>Adress :</label>
    <input type='text'
        required
        id="Adress"
        name='Adress'
        placeholder="Enter The Company's Adress"
        onChange={this.change}
        value={this.state.Adress} /> 
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='Website'>Company Website :</label>
    <input type='text'
        required
        id='Website'
        placeholder="Enter The Company's Website"
        name='Website'
        onChange={this.change}
        value={this.state.Website}/>
        </div>

        <button className='form_field_button btn'>Update</button> 

    </form>
    </div></div>);
  }
}
export default withRouter(EditCompany);