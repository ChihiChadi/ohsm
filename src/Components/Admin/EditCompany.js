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
          Adress:'',
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/Companys/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          CompanyName: res.data.CompanyName,
          PhoneNumber: res.data.PhoneNumber,
          Email: res.data.Email,
          Adress: res.data.Adress
          
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
    };

    axios.put('/Companys/update/'+this.props.match.params.id, CompanyObj)
      .then((res) => {
        console.log(res.data)
        console.log('Company successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Companys Page 
    this.props.history.push('/Companys')
  }


  render() {
    return (
        <div className='form'>
            <form className='RegisterForm' onSubmit={this.onSubmit}>

        <div className='form_field'>
        <label className='form_label' htmlFor='CompanyName'>Company Name :</label>
    <input type='text'
        required
        id='CompanyName'
        placeholder='Enter The Company Name'
        name='CompanyName'
        onChange={this.change}
        value={this.state.CompanyName}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='PhoneNumber'>Phone Number :</label>
    <input type="number"
        required
        id='PhoneNumber'
        placeholder="Enter The Company Phone Number"
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
        onChange={this.change}
        value={this.state.Email} /> 
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='Adress'>Adress :</label>
    <input type='text'
        required
        id="Adress"
        name='Adress'
        onChange={this.change}
        value={this.state.Adress} /> 
        </div>

        <button className='form_field_button btn'>Update</button> 

    </form>
    </div>);
  }
}
export default withRouter(EditCompany);