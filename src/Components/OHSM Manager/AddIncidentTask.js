import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddIncidentTask extends Component{
    constructor(){
        super()
        this.state={
            TaskTitle:'',
            IncidentTitle:'',
            TaskId:'',
            companyName:'',
            SiteAdress:'',
            TaskType:'',
            RiskDetails:''
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
       const TaskObj={
        TaskTitle:this.state.TaskTitle,
        IncidentTitle:this.state.IncidentTitle,
        TaskId:this.state.RiskId,
        companyName:this.state.companyName,
        SiteAdress:this.state.SiteAdress,
        TaskType:this.state.TaskType,
        TaskDetails:this.state.TaskDetails
       }
         axios.post('/IncidentReports/:id/Tasks/Add', TaskObj)
         .then(form=>console.log(form.data));
         this.props.history.push('/IncidentReports');
         }


    render(){
        return (
            <div className='ReportContainer'>
      <center><h1>Add Task</h1></center>
            <div className='form'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='TaskTitle'>Task Title :</label>
    <input type='text'
        required
        id='TaskTitle'
        placeholder="Enter The Task's Title"
        name='TaskTitle'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='IncidentTitle'>Incident Title :</label>
    <input type='text'
        required
        id='IncidentTitle'
        placeholder="Enter The Incident's Title"
        name='IncidentTitle'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='TaskId'>Task ID :</label> 
     <input type='number'
        required
        id='TaskId'
        name='TaskId'
        placeholder="Enter The Task's ID "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='companyName'>Company Name :</label> 
     <input type='text'
        required
        id='companyName'
        name='companyName'
        placeholder="Enter The Company's Name "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='TaskType'>Task Type :</label> 
     <select
        id="TaskType"
        name='TaskType'
        onChange={this.change}>
        <option default>Select The Type Of The Task:</option> 
    <option value="Corrective">Corrective</option>
    <option value="Preventive">Preventive</option>
    <option value="Improvement">Improvement</option>
  </select>
       </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteAdress'>Site Adress :</label>
    <input type='text'
        required
        id="SiteAdress"
        name='SiteAdress'
        placeholder="Enter The Site's Adress"
        onChange={this.change}/> 
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='TaskDetails'>Task Details :</label>
    <textarea
        required
        id='TaskDetails'
        placeholder="Enter The Task's Details"
        name='TaskDetails'
        onChange={this.change}
        rows="10"
        />
        </div>

        <div className='form_field'>
       <button className='form_field_button btn'>Submit</button>
       </div>
    </form>
    </div>  
    </div>
  )
    }
}
export default withRouter(AddIncidentTask);