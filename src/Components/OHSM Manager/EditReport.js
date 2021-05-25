import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditReport extends Component {
  constructor(props) {
    super(props)
        this.state={
            ReportTitle:'',
            Severity:'',
            phoneRB:'',
            Report:'',
            IncidentType:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/IncidentReports/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            ReportTitle: res.data.ReportTitle,
            IncidentType:res.data.IncidentType,
            Severity: res.data.Severity,
            phoneRB: res.data.phoneRB,
            Report: res.data.Report
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
        ReportTitle: this.state.ReportTitle,
        IncidentType: this.state.IncidentType,
        Severity: this.state.Severity,
        phoneRB: this.state.phoneRB,
        Report: this.state.Report
    };

    axios.put('/IncidentReports/update/'+this.props.match.params.id, ReportObj)
      .then((res) => {
        console.log(res.data)
        console.log('Report successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to User Page 
    this.props.history.push('/IncidentReports')
  }


  render() {
    return (
      <div><center><h1>Edit Report</h1></center>
        <div className='ReportContainer'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='ReportTitle'>Report Title :</label>
    <input type='text'
        required
        id='ReportTitle'
        placeholder='Enter The Report Title'
        name='ReportTitle'
        onChange={this.change}
        value={this.state.ReportTitle}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='phoneRB'>Phone Number :</label>
    <input type="number"
        required
        id='phoneRB'
        placeholder="Enter Your Phone Number"
        name='phoneRB'
        onChange={this.change}
        value={this.state.phoneRB}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='IncidentType'>Incident Type :</label> 
     <select
        id="IncidentType"
        name='IncidentType'
        onChange={this.change}
        value={this.state.IncidentType} >
        <option default>Select The Type Of the Incident:</option> 
    <option value="Injury">An Injury</option>
    <option value="Near Miss">A Near Miss Incident</option>
    <option value="Property Damage">A Property Damage</option>
    <option value="Theft">A Theft</option>
    </select>
    </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='Severity'>Birth Date :</label>
      <select
        required
        id="Severity"
        name='Severity'
        onChange={this.change}
        value={this.state.Severity} >
        <option default>Select Severity Level:</option> 
           <option value="Critical">A Citical Incident</option>
           <option value="Major">A Major Incident</option>
           <option value="Minor">A Minor Incident</option>
      </select> 
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='Report'>Report Details :</label>
    <textarea
        required
        id='Report'
        placeholder='Enter The Report Details'
        name='Report'
        onChange={this.change}
        value={this.state.Report}
        rows="13"/>
        </div>

        <button className='form_field_button btn'>Update</button>  
    </form>
    </div></div>);
  }
}
export default withRouter(EditReport);