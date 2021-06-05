import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'

const ViewReport = () => {
  const [report, setReport] = useState([
    "ReportId","ReportTitle","ReportedBy","SiteAdress","Severity","EmailRB","phoneRB1","phoneRB2","Report","Company"]);
    const { id } = useParams();
      // eslint-disable-next-line 
  useEffect(() => {loadReport(id);}, []);
  const loadReport = async () => {
    const res = await axios.get('/MyReports/'+id);
    console.log(res.data);
    setReport(res.data);
  };
  return (
    <div><center><h1>Report Informations</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Informations:</h3>
        <li className="list-group-item">Report ID: {report.ReportId}</li>
        <li className="list-group-item">Report Title: {report.ReportTitle}</li>
        <li className="list-group-item">Reported By: {report.ReportedBy}</li>
        <li className="list-group-item">Site : {report.SiteAdress}</li>
        <li className="list-group-item">Severity: {report.Severity}</li>
        <li className="list-group-item">Email : {report.EmailRB}</li>
        <li className="list-group-item">Phone Number 1: {report.phoneRB1}</li>
        <li className="list-group-item">Phone Number 2: {report.phoneRB2}</li>
        <li className="list-group-item">Company: {report.Company}</li>
        <li className="list-group-item Details">Report Details: {report.Report}</li>
        <Link className="btn btn-primary mr-2" to={'/MyReports/edit/'+report._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div>
    </div>
  );
};

export default  ViewReport;