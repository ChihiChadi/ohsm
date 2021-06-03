import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditReport extends Component {
  constructor(props) {
    super(props)
        this.state={
            ReportTitle:'',
            Severity:'',
            phoneRB1:'',
            phoneRB2:'',
            report:'',
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/MyReports/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            ReportTitle: res.data.ReportTitle,
            Severity: res.data.Severity,
            phoneRB1: res.data.phoneRB1,
            phoneRB2: res.data.phoneRB2,
            report: res.data.report
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
        Severity: this.state.Severity,
        phoneRB1: this.state.phoneRB1,
        phoneRB2: this.state.phoneRB2,
        report: this.state.report
    };

    axios.put('/MyReports/update/'+this.props.match.params.id, ReportObj)
      .then((res) => {
        console.log(res.data)
        console.log('Report successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to User Page 
    this.props.history.push('/MyReports')
  }


  render() {
    return (
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
        <label className='form_label' htmlFor='phoneRB1'>Phone Number 1:</label>
    <input type="number"
        required
        id='phoneRB1'
        placeholder="Enter Your Phone Number"
        name='phoneRB1'
        onChange={this.change}
        value={this.state.phoneRB1}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='phoneRB2'>Phone Number 2:</label>
    <input type="number"
        id='phoneRB'
        placeholder="Your Phone Number If You Have One"
        name='phoneRB2'
        onChange={this.change}
        value={this.state.phoneRB2}/>
        </div>
        

        <div className='form_field'>
      <label className='form_label' htmlFor='Severity'>Severity :</label>
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
        placeholder='Enter The Report Title'
        name='Report'
        onChange={this.change}
        value={this.state.ReportTitle}
        rows="13"/>
        </div>

        <button className='form_field_button btn'>Update</button>  
    </form>
    </div>);
  }
}
export default withRouter(EditReport);