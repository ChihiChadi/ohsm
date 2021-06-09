import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddCompany extends Component{

    constructor(){
        super()
        this.state={
            CompanyName:'',
            Email:'',
            PhoneNumber:'',
            Adress:'',
            Website:'',
            lat:"",
            lng:""
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
       const CompanyObj={
        CompanyName:this.state.CompanyName,
        Email:this.state.Email,
        PhoneNumber:this.state.PhoneNumber,
        Adress:this.state.Adress,
        Website:this.state.Website,
        lat:this.state.lat,
        lng:this.state.lng
       }
         axios.post('/Companys/Add', CompanyObj)
         .then(form=>console.log(form.data));
         this.props.history.push('/Companys');
         }


    render(){
        return (
            <div className='form'>
            <form className='AddCompForm' onSubmit={this.onSubmit}>
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
      <label className='form_label' htmlFor='Email'>Company E-mail :</label> 
     <input type='email'
        required
        id='Email'
        name='Email'
        placeholder="Enter The Company's E-mail "
        onChange={this.change}
        value={this.state.Email}/>
       </div>
       <div className='form_field'>
        <label className='form_label' htmlFor='PhoneNumber'>Phone Number :</label>
    <input type="number"
        required
        id='PhoneNumber'
        placeholder="Enter The Copmpany's Phone Number"
        name='PhoneNumber'
        onChange={this.change}
        value={this.state.PhoneNumber}/>
        </div>
        <div className='form_field'>
      <label className='form_label' htmlFor='Adress'>Company Adress :</label>
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
    <input type="text"
        required
        id='Website'
        placeholder="Enter The Company's Website"
        name='Website'
        onChange={this.change}
        value={this.state.Website}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='lat'>Enter The Latitude :</label>
    <input type="number"
        id='lat'
        placeholder="Enter The Copmpany's Latitude "
        name='lat'
        onChange={this.change}
        value={this.state.lat}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='lng'>Enter The Longitude :</label>
    <input type="number"
        id='lng'
        placeholder="Enter The Copmpany's Longitude "
        name='lng'
        onChange={this.change}
        value={this.state.lng}/>
        </div>


    
    
        <div className='form_field'>
       <button className='form_field_button btn'>Add</button>
       </div>
    </form>
    </div>  
  )
    }}

export default withRouter(AddCompany);