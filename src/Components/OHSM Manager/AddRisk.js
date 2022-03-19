import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddIncidentTask extends Component{
    constructor(){
        super()
        this.state={
            RiskName:'',
            RiskId:'',
            Company:'',
            SiteAdress:'',
            RiskType:'',
            RiskSeverity:'',
            RiskProbability:'',
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
       const RiskObj={
        RiskName:this.state.RiskName,
        RiskId:this.state.RiskId,
        Company:this.state.Company,
        SiteAdress:this.state.SiteAdress,
        RiskType:this.state.RiskType,
        RiskSeverity:this.state.RiskSeverity,
        RiskProbability:this.state.RiskProbability,
        RiskDetails:this.state.RiskDetails
       }
         axios.post('/IdRisks/Add', RiskObj)
         .then(form=>console.log(form.data));
         this.props.history.push('/IdRisks');
         }


    render(){
        return (
            <div className='ReportContainer'>
      <center><h1>Add Risk</h1></center>
            <div className='form'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='RiskName'>Risk Title :</label>
    <input type='text'
        required
        id='RiskName'
        placeholder="Enter The Risks's Title"
        name='RiskName'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='RiskId'>Risk ID :</label> 
     <input type='number'
        required
        id='RiskId'
        name='RiskId'
        placeholder="Enter The Risk's ID "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='Company'>Company :</label> 
     <input type='text'
        required
        id='Company'
        name='Company'
        placeholder="Enter The Company's Name "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='RiskType'>Risk Type :</label> 
     <select
        id="RiskType"
        name='RiskType'
        onChange={this.change}>
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
        onChange={this.change}>
        <option default>Select Severity Level:</option> 
    <option value="Insignificant">Insignificant</option>
    <option value="Minor">Minor</option>
    <option value="Moderate">Moderate</option>
    <option value="Major">Major</option>
    <option value="Extreme">Extreme</option>
  </select>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='RiskProbability'>Risk Probability :</label> 
     <select
        id="RiskProbability"
        name='RiskProbability'
        onChange={this.change}>
        <option default>Select The Type Of The Risk:</option> 
    <option value="Unlikely ">Not Expected To Occur</option>
    <option value="Remote">Not Expected, But Possible</option>
    <option value="Occasional">May Occur Intermittently</option>
    <option value="Certain">Expected To Occur Eventually</option>
    <option value="Frequent">Likely To Occur Soon And Often</option>
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
        <label className='form_label' htmlFor='RiskDetails'>Risk Details :</label>
    <textarea
        required
        id='RiskDetails'
        placeholder="Enter The Risk's Details"
        name='RiskDetails'
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