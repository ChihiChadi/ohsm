import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditSite extends Component {
  constructor(props) {
    super(props)
        this.state={
            SiteName:'',
            companyN:'',
            SiteAdress:'',
            Responsable:'',
            SiteType:''
        };
        this.change=this.change.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      }

  componentDidMount() {
    axios.get('/Sites/edit/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            SiteName: res.data.SiteName,
            companyN:res.data.companyN,
            SiteType: res.data.SiteType,
            Responsable: res.data.Responsable,
            SiteAdress: res.data.SiteAdress
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
    const SiteObj = {
        SiteName: this.state.SiteName,
        companyN: this.state.companyN,
        SiteAdress: this.state.SiteAdress,
        SiteType: this.state.SiteType,
        Responsable: this.state.Responsable
    };

    axios.put('/Sites/update/'+this.props.match.params.id, SiteObj)
      .then((res) => {
        console.log(res.data)
        console.log('Site successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Sites Page 
    this.props.history.push('/Sites')
  }


  render() {
    return (
      <div><center><h1>Edit Site</h1></center>
        <div className='ReportContainer'>
            <form className='ReportForm' onSubmit={this.onSubmit}>
            <div className='form_field'>
          <label className='form_label' htmlFor='SiteName'>Site Name :</label>
    <input type='text'
        required
        id='SiteName'
        placeholder='Enter The Site Name'
        name='SiteName'
        onChange={this.change}
        value={this.state.SiteName}/>
        </div>

        <div className='form_field'>
        <label className='form_label' htmlFor='companyN'>Company Name :</label>
    <input type="text"
        required
        id='companyN'
        placeholder="Enter The Company Name"
        name='companyN'
        onChange={this.change}
        value={this.state.companyN}/>
        </div>

        <div className='form_field'>
      <label className='form_label' htmlFor='SiteType'>Site Type :</label> 
     <select
        id="SiteType"
        name='SiteType'
        onChange={this.change}
        value={this.state.SiteType} >
        <option default>Select The Type Of the Site:</option> 
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
        id='SiteAdress'
        placeholder='Enter The Site Adress'
        name='SiteAdress'
        onChange={this.change}
        value={this.state.SiteName}/>
        </div>

        <div className='form_field'>
          <label className='form_label' htmlFor='Responsable'>Responsable :</label>
    <input type='text'
        required
        id='Responsable'
        placeholder="Enter The Site's Responsable"
        name='Responsable'
        onChange={this.change}
        value={this.state.Responsable}/>
        </div>

        <button className='form_field_button btn'>Update</button>  
    </form>
    </div></div>);
  }
}
export default withRouter(EditSite);