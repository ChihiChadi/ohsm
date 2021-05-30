import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditRiskTask extends Component {
  constructor(props) {
    super(props)
        this.state={
            TaskTitle:'',
            companyName:'',
            SiteAdress:'',
            TaskType:'',
            TaskDetails:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/IdRisks/:id/Tasks/Edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            TaskTitle: res.data.TaskTitle,
            companyName:res.data.companyName,
            SiteAdress: res.data.SiteAdress,
            TaskType: res.data.TaskType,
            TaskDetails: res.data.TaskDetails
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
    const ReportObj = {
        TaskTitle: this.state.TaskTitle,
        companyName: this.state.companyName,
        SiteAdress: this.state.SiteAdress,
        TaskType: this.state.TaskType,
        TaskDetails: this.state.TaskDetails
    };

    axios.put('/IdRisks/:id/Tasks/update/'+this.props.match.params.id, ReportObj)
      .then((res) => {
        console.log(res.data)
        console.log('Task successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Tasks Page 
    this.props.history.push('/IdRisks/:id/Tasks')
  }


  render() {
    return (
      <div><center><h1>Edit Report</h1></center>
        <div className='ReportContainer'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='TaskTitle'>Task Title :</label>
    <input type='text'
        required
        id='TaskTitle'
        placeholder='Enter The Task Title'
        name='TaskTitle'
        onChange={this.change}
        value={this.state.TaskTitle}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='companyName'>Company Name :</label>
    <input type="text"
        required
        id='companyName'
        placeholder="Enter The Company Name"
        name='companyName'
        onChange={this.change}
        value={this.state.companyName}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='TaskType'>Task Type :</label> 
     <select
        id="TaskType"
        name='TaskType'
        onChange={this.change}
        value={this.state.TaskType} >
        <option default>Select The Type Of the Task:</option> 
    <option value="Corrective">Corrective</option>
    <option value="Preventive">Preventive</option>
    <option value="Improvement">Improvement</option>
    </select>
    </div>

    <div className='form_field'>
          <label className='form_label' htmlFor='SiteAdress'>Site Adress :</label>
    <input type='text'
        required
        id='SiteAdress'
        placeholder='Enter The Site Adress'
        name='SiteAdress'
        onChange={this.change}
        value={this.state.SiteAdress}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='TaskDetails'>Task Details :</label>
    <textarea
        required
        id='TaskDetails'
        placeholder='Enter The Task Details'
        name='TaskDetails'
        onChange={this.change}
        value={this.state.TaskDetails}
        rows="13"/>
        </div>

        <button className='form_field_button btn'>Update</button>  
    </form>
    </div></div>);
  }
}
export default withRouter(EditRiskTask);