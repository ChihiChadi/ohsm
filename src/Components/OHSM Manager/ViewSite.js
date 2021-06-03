import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewSite = () => {
  const [site, setSite] = useState([
    "SiteName","SiteId","companyN","SiteAdress","SiteType","Responsable"]);
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(() => {loadSite(id);}, []);
  const loadSite = async () => {
    const res = await axios.get('/Sites/'+id);
    console.log(res.data);
    setSite(res.data);
  };
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
        <Link className="btn btn-primary mr-2" to={'/Sites/edit/'+site._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewSite;