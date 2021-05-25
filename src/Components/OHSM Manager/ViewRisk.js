import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewRisk = () => {
  const [risk, setRisk] = useState([
    "RiskId","RiskName","Company","SiteAdress","RiskType","RiskSeverity","RiskDetails"]);
  const { id } = useParams();
  useEffect(() => {loadRisk(id);}, []);
  const loadRisk = async () => {
    const res = await axios.get('/IdRisks/'+id);
    console.log(res.data);
    setRisk(res.data);
  };
  return (
    <div><center><h1>Risk Details</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Details:</h3>
        <li className="list-group-item">Risk ID: {risk.RiskId}</li>
        <li className="list-group-item">Title: {risk.RiskName}</li>
        <li className="list-group-item">Site Adress: {risk.SiteAdress}</li>
        <li className="list-group-item">Company: {risk.Company}</li>
        <li className="list-group-item">Risk Type: {risk.RiskType}</li>
        <li className="list-group-item">Risk Severity: {risk.RiskSeverity}</li>
        <li className="list-group-item Details">Risk Details: {risk.RiskDetails}</li>
        <Link className="btn btn-primary mr-2" to={'/IdRisks/edit/'+risk._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewRisk;