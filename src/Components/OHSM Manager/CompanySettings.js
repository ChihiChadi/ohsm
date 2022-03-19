import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'
//import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CompanySettings = () => {

  /*const containerStyle = {
     width: '1000px',
     height: '400px'
   };
 */



  const [company, setCompany] = useState([
    "CompanyId", "CompanyName", "Email", "PhoneNumber", "Adress", "Website"]);
  useEffect(() => {
    loadCompany();
  }, []);
  const loadCompany = async () => {
    const res = await axios.get('/CompanySettings');
    console.log(res.data);
    setCompany(res.data);
  };
  const lat = company.lat;
  const lng = company.lng;

  /*const center = {
      lat: company.lat,
      lng: company.lng
    };
    const position = {
    
    }
    
    const onLoad = marker => {
      console.log('marker: ', marker)
    }*/

  return (
    <div><center><h1>Company Settings</h1></center>
      <div className="container_Big"><center>
        <div className="container">
          <ul className="list-group"><h3>Company Informations:</h3>
            <li className="list-group-item">Company ID: {company.CompanyId}</li>
            <li className="list-group-item">Name: {company.CompanyName}</li>
            <li className="list-group-item">Email: {company.Email}</li>
            <li className="list-group-item">Phone Number: {company.PhoneNumber}</li>
            <li className="list-group-item">Adress: {company.Adress}</li>
            <li className="list-group-item">Website: {company.Website}</li>
            <li classname="list-group-item Map">
              <iframe title="MapTitle" src={`https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="1000"
                height="400"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"></iframe>
              {/*<LoadScript
        googleMapsApiKey="AIzaSyC_HjEhcTrRODaZ9BjzIqrid8-mtdh0qhw">
       <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}>
        
      
        <Marker
      onLoad={onLoad}
      position={position}
    />
        
      </GoogleMap>
      </LoadScript>*/}
            </li>
            <Link className="btn btn-primary mr-2" to={'/CompanySettings/edit/' + company._id}>Edit</Link>
          </ul>
        </div>
      </center></div></div>
  );
};

export default CompanySettings;