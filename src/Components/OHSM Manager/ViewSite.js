import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'
import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api';



const ViewSite  = props => {

  const containerStyle = {
    width: '1000px',
    height: '400px'
  };

  const [site, setSite] = useState([
    "SiteName","SiteId","companyN","SiteAdress","SiteType","Responsable","lat","lng"]);
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(() => {loadSite(id);}, []);
  const loadSite = async () => {
    const res = await axios.get('/Sites/'+id);
    console.log(res.data);
    setSite(res.data);
  };

  const center = {
    lat: site.lat,
    lng: site.lng
  };
  const position = {
    lat: site.lat,
    lng: site.lng
  }
  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return (
    <div><center><h1>Site Details</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Details:</h3>
        <li className="list-group-item">Risk ID: {site.SiteId}</li>
        <li className="list-group-item">Title: {site.SiteName}</li>
        <li className="list-group-item">Site Adress: {site.SiteAdress}</li>
        <li className="list-group-item">Company: {site.companyN}</li>
        <li className="list-group-item">Site Type: {site.SiteType}</li>
        <li className="list-group-item">Responsable: {site.Responsable}</li>
        <li classname="list-group-item"> 
        <LoadScript
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
      </LoadScript>
       </li>
        <Link className="btn btn-primary mr-2" to={'/Sites/edit/'+site._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewSite;