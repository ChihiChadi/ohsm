import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'
//import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api';



const ViewSite  = props => {

  /*const containerStyle = {
    width: '1000px',
    height: '400px'
  };*/

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

/*  const center = {
    lat: site.lat,
    lng: site.lng
  };*/
  
const  lat= site.lat;
const    lng= site.lng;
  
  const xy = '!1m18!1m12!1m3!1d51076.22643596264!2d10.192213110090444!3d36.86009558408703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd33e8c8a1a7db%3A0xccc5e0d64ee751dc!2sMANAR%20CITY!5e0!3m2!1sen!2stn!4v1624102622146!5m2!1sen!2stn';
  /*
  const onLoad = marker => {
    console.log('marker: ', marker)
  }*/

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
        <iframe title="MapTitle" src="https://maps.google.com/maps?q="+lat+","+lng+"&hl=es&z=14&amp;output=embed"
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
        <Link className="btn btn-primary mr-2" to={'/Sites/edit/'+site._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewSite;