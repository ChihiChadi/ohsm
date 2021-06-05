import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddSite extends Component{
    constructor(){
        super()
        this.state={
            SiteName:'',
            SiteId:'',
            companyN:'',
            SiteAdress:'',
            SiteType:'',
            RiskSeverity:'',
            RiskDetails:'',
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
       const RiskObj={
        SiteName:this.state.SiteName,
        SiteId:this.state.SiteId,
        companyN:this.state.companyN,
        SiteAdress:this.state.SiteAdress,
        SiteType:this.state.SiteType,
        Responsable:this.state.Responsable,
        lat:this.state.lat,
        lng:this.state.lng
       }
         axios.post('/Sites/Add', RiskObj)
         .then(form=>console.log(form.data));
         this.props.history.push('/Sites');
         }


    render(){
        return (
            <div className='ReportContainer'>
      <center><h1>Add Risk</h1></center>
            <div className='form'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='SiteName'>Site Name :</label>
    <input type='text'
        required
        id='SiteName'
        placeholder="Enter The Site's Name"
        name='SiteName'
        onChange={this.change}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteId'>Site ID :</label> 
     <input type='number'
        required
        id='SiteId'
        name='SiteId'
        placeholder="Enter The Site's ID "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='companyN'>Company :</label> 
     <input type='text'
        required
        id='companyN'
        name='companyN'
        placeholder="Enter The Company's Name "
        onChange={this.change}/>
       </div>

       <div className='form_field'>
      <label className='form_label' htmlFor='SiteType'>Site Type :</label> 
     <select
        id="SiteType"
        name='SiteType'
        onChange={this.change}>
        <option default>Select The Type Of The Risk:</option> 
    <option value="Construction">Construction</option>
    <option value="Storage">Storage</option>
    <option value="Branch">Branch</option>
    <option value="Headquarters">Headquarters</option>
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
        <label className='form_label' htmlFor='Responsable'>Site Responsable :</label>
    <input type='text'
        required
        id='Responsable'
        placeholder="Enter The Site's Responsable"
        name='Responsable'
        onChange={this.change}/>
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
       <button className='form_field_button btn'>Submit</button>
       </div>
    </form>
    </div>  
    </div>
  )
    }
}
export default withRouter(AddSite);