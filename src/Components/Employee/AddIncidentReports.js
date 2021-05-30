import React,{useState,useContext,} from 'react';
import {AuthContext} from '../AuthContext';
import './style.css';
import {withRouter} from 'react-router-dom';
import Message from '../Message';
import ReportService from './ReportService';

const AddIncidentReports = props =>{
  const [report,setReport] = useState({ReportTitle:"" ,ReportId:"" ,ReportedfBy:"",IncidentType:"",EmailRB:"" ,phoneRB1:"",phoneRB2:"",Company:"", SiteAdress:"" , Severity:"" , Report:"" ,date:"" });
  const [message,setMessage] = useState(null);
  
  const authContext = useContext(AuthContext);
  const change= event =>{
    setReport({...report,[event.target.name] : event.target.value});
}

const resetForm = ()=>{
    setReport({ReportTitle:"" ,ReportId:"" ,ReportedfBy:"" ,EmailRB:"",IncidentType:"",phoneRB1:'',phoneRB2:'',Company:"", SiteAdress:"" , Severity:"", Report:"" ,date:"" });
}

const onSubmit = event =>{
  event.preventDefault();
  ReportService.postReport(report).then(data =>{
      const { message } = data;
      resetForm();
      if(message.msgBody === "UnAuthorized"){
          setMessage(message);
          authContext.setUser({email : "", role : ""});
          authContext.setIsAuthenticated(false);
      }
      else{
          setMessage(message);
          console.log(data);
          alert('Report Sussefully Added');
          props.history.push('/MyReports');
          window.location.reload();
      }
  });
}

  return(
      <div className='ReportContainer'>
      <center><h1>Add Incident Reports</h1></center><br/>
      <form className='ReportForm' onSubmit={onSubmit}>

            <div className='form_field'>
          <label className='form_label' htmlFor='ReportTitle'>Report Title :</label>
    <input type='text'
        required
        id='ReportTitle'
        placeholder='Enter The Report Title'
        name='ReportTitle'
        onChange={change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='ReportId'>Report ID :</label>
        <input type='number'
        required
        id='ReportId'
        placeholder='Enter The Report ID'
        name='ReportId'
        onChange={change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='ReportedBy'>Reported By :</label>
        <input type='text'
        required
        id='ReportedBy'
        placeholder='Enter Your Full Name'
        name='ReportedBy'
        onChange={change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='EmailRB'>Reported By Email :</label>
        <input type='email'
        required
        id='EmailRB'
        placeholder='Enter Your Email'
        name='EmailRB'
        onChange={change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='phoneRB1'>Phone Number 1 :</label>
        <input type='number'
        required
        id='phoneRB1'
        placeholder='Enter Your Phone Number 1'
        name='phoneRB1'
        onChange={change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='phoneRB2'>Phone Number 2:</label>
        <input type='number'
        id='phoneRB2'
        placeholder='Phone Number 2 If You Have'
        name='phoneRB2'
        onChange={change}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteAdress'>Site Adress :</label> 
     <input type='text'
        required
        id='SiteAdress'
        name='SiteAdress'
        placeholder="Which Site"
        onChange={change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='Company'>Company Name :</label> 
     <input type='text'
        required
        id='Company'
        name='Company'
        placeholder="Company Name"
        onChange={change}/>
       </div>
       
       <div className='form_field'>
      <label className='form_label' htmlFor='date'>The Date When it Happened :</label> 
     <input type='date'
        required
        id='date'
        name='date'
        onChange={change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='IncidentType'>Incident Type :</label> 
     <select
        id="IncidentType"
        name='IncidentType'
        onChange={change}>
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
        onChange={change}>
        <option default>Select Severity Level:</option> 
    <option value="Critical">A Citical Incident</option>
    <option value="Major">A Major Incident</option>
    <option value="Minor">A Minor Incident</option>
  </select>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='Report'>Report Details:</label>
    <textarea
        required
        id="Report"
        name='Report'
        placeholder="Report Details"
        onChange={change} 
        rows="13"/> 
        </div>

        <div className='form_field'>
       <button className='form_field_button btn'>Submit Report</button>
       </div>
       </form>
       {message ? <Message message={message}/> : null}
      </div>
  );
};

export default withRouter(AddIncidentReports);