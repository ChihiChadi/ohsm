import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditRisk extends Component {
  constructor(props) {
    super(props)
        this.state={
            RiskName:'',
            Company:'',
            SiteAdress:'',
            RiskType:'',
            RiskSeverity:'',
            RiskDetails:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/IdRisks/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            RiskName: res.data.RiskName,
            Company:res.data.Company,
            SiteAdress: res.data.SiteAdress,
            RiskType:res.data.RiskType,
            RiskSeverity: res.data.RiskSeverity,
            RiskDetails:res.data.RiskDetails });})
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
    const RiskObj = {
        RiskName: this.state.RiskName,
        Company: this.state.Company,
        SiteAdress: this.state.SiteAdress,
        RiskType:this.state.RiskType,
        RiskSeverity:this.state.RiskSeverity,
        RiskDetails:this.state.RiskDetails
    };
    axios.put('/IdRisks/update/'+this.props.match.params.id, RiskObj)
      .then((res) => {
        console.log(res.data)
        console.log('Risk successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Risks Page 
    this.props.history.push('/IdRisks')
  }


  render() {
    return (
    <div><center><h1>Edit Risk</h1></center>
        <div className='ReportContainer'>
            <div className='form'>
            <form className='ReportForm' onSubmit={this.onSubmit}>

            <div className='form_field'>
          <label className='form_label' htmlFor='RiskName'>Risk Title :</label>
    <input type='text'
        required
        id='RiskName'
        placeholder="Enter The Risks's Title"
        name='RiskName'
        onChange={this.change}
        value={this.state.RiskName}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='Company'>Company Name :</label>
    <input type='text'
        required
        id='Company'
        placeholder="Enter The Company's Name"
        name='Company'
        onChange={this.change}
        value={this.state.Company}/>
        </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='RiskType'>Risk Type :</label> 
     <select
        id="RiskType"
        name='RiskType'
        onChange={this.change}
        value={this.state.RiskType}>
        <option default>Select The Type Of The Risk:</option> 
    <option value="Safety">A Safety Risk</option>
    <option value="Chemical">A Chemical Risk</option>
    <option value="Biological">A Biological Risk</option>
    <option value="Physical">A Physical Risk</option>
    <option value="Ergonomic">An Ergonomic Risk</option>
  </select>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='RiskSeverity'>Risk Severity :</label> 
     <select
        id="RiskSeverity"
        name='RiskSeverity'
        onChange={this.change}
        value={this.state.RiskSeverity}>
        <option default>Select Severity Level:</option> 
    <option value="Critical">A Citical Incident</option>
    <option value="Major">A Major Incident</option>
    <option value="Minor">A Minor Incident</option>
  </select>
       </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteAdress'>Site Adress :</label>
    <input type='text'
        required
        id="SiteAdress"
        name='SiteAdress'
        placeholder="Enter The Site's Adress"
        onChange={this.change}
        value={this.state.SiteAdress}
        /> 
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='RiskDetails'>Risk Details :</label>
    <textarea
        required
        id='RiskDetails'
        placeholder="Enter The Risk's Details"
        name='RiskDetails'
        onChange={this.change}
        value={this.state.RiskDetails}
        rows="13"
        />
        </div>

        <div className='form_field'>
       <button className='form_field_button btn'>Submit</button>
       </div>
    </form>
    </div>  
    </div></div>);
  }
}
export default withRouter(EditRisk);