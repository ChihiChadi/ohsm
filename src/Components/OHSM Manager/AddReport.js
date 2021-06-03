import React, {Component} from 'react';
import axios from 'axios';
import '../Employee/style.css';
import {withRouter} from 'react-router-dom';

class AddReport extends Component{
  constructor(){
      super()
      this.state={
        ReportTitle:"" ,
        ReportId:"" ,
        ReportedBy:"",
        IncidentType:"",
        EmailRB:"" ,
        phoneRB1:"",
        phoneRB2:"",
        companyName:"",
        SiteAdress:"" , 
        Severity:"" , 
        Report:"" ,
        date:"" };
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
     const ReportObj={
      ReportTitle:this.state.ReportTitle,
      ReportId:this.state.ReportId,
      ReportedBy:this.state.ReportedBy,
      companyName:this.state.companyName,
      IncidentType:this.state.IncidentType,
      EmailRB:this.state.EmailRB,
      phoneRB1:this.state.phoneRB1,
      phoneRB2:this.state.phoneRB2,
      SiteAdress:this.state.SiteAdress,
      Severity:this.state.Severity,
      Report:this.state.Report,
      date:this.state.date
     }
       axios.post('/IncidentReports/Add', ReportObj)
       .then(form=>console.log(form.data));
       alert('Report Added Successfully');
       this.props.history.push('/IncidentReports');
       window.location.reload();
       
       }

       render(){
  return(
      <div className='ReportContainer'>
      <center><h1>Add Incident Report</h1></center><br/>
      <form className='ReportForm' onSubmit={this.onSubmit}>

            <div className='form_field'>
          <label className='form_label' htmlFor='ReportTitle'>Report Title :</label>
    <input type='text'
        required
        id='ReportTitle'
        placeholder='Enter The Report Title'
        name='ReportTitle'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='ReportId'>Report ID :</label>
        <input type='number'
        required
        id='ReportId'
        placeholder='Enter The Report ID'
        name='ReportId'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='ReportedBy'>Reported By :</label>
        <input type='text'
        required
        id='ReportedBy'
        placeholder='Enter Your Full Name'
        name='ReportedBy'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='EmailRB'>Reported By Email :</label>
        <input type='email'
        required
        id='EmailRB'
        placeholder='Enter Your Email'
        name='EmailRB'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='phoneRB1'>Phone Number 1:</label>
        <input type='number'
        required
        id='phoneRB'
        placeholder='Your Phone Number 1'
        name='phoneRB1'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='phoneRB2'>Phone Number 2:</label>
        <input type='number'
        id='phoneRB2'
        placeholder='Phone Number 2 If You Have'
        name='phoneRB2'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteAdress'>Site Adress :</label> 
     <input type='text'
        required
        id='SiteAdress'
        name='SiteAdress'
        placeholder="Which Site"
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='companyName'>Company Name :</label> 
     <input type='text'
        required
        id='companyName'
        name='companyName'
        placeholder="Company Name"
        onChange={this.change}/>
       </div>
       
       <div className='form_field'>
      <label className='form_label' htmlFor='date'>The Date When it Happened :</label> 
     <input type='date'
        required
        id='date'
        name='date'
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='IncidentType'>Incident Type :</label> 
     <select
        id="IncidentType"
        name='IncidentType'
        onChange={this.change}>
        <option default>Select The Type Of the Incident:</option> 
    <option value="Injury">An Injury</option>
    <option value="Near Miss">A Near Miss Incident</option>
    <option value="Property Damage">A Property Damage</option>
    <option value="Theft">A Theft</option>
  </select>
       </div>
       
       <div className='form_field'>
      <label className='form_label' htmlFor='Severity'>Severity :</label> 
     <select
        id="Severity"
        name='Severity'
        onChange={this.change}>
        <option default>Select Severity Level:</option> 
    <option value="Critical">Citical</option>
    <option value="Major">Major</option>
    <option value="Minor">Minor</option>
  </select>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='Report'>Report Details:</label>
    <textarea
        required
        id="Report"
        name='Report'
        placeholder="Report Details"
        onChange={this.change} 
        rows="13"/> 
        </div>

        <div className='form_field'>
       <button className='form_field_button btn'>Submit</button>
       </div>
       </form>
      </div>
  );
};}

export default withRouter(AddReport);