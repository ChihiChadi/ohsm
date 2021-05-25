import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'

const ViewReport = () => {
  const [report, setReport] = useState([
    "ReportId","ReportTitle","ReportedBy","SiteAdress","Severity","EmailRB","phoneRB","Report","Company"]);
    // eslint-disable-next-line 
    const { id } = useParams();
  useEffect(() => {loadReport(id);}, []);
  const loadReport = async () => {
    const res = await axios.get('/MyReports/'+id);
    console.log(res.data);
    setReport(res.data);
  };
  return (
    <div><center><h1>Report Informations</h1>
    <div className="container">
      <ul className="list-group"><h3>Informations:</h3>
        <li className="list-group-item">Report ID: {report.ReportId}</li>
        <li className="list-group-item">Report Title: {report.ReportTitle}</li>
        <li className="list-group-item">Reported By: {report.ReportedBy}</li>
        <li className="list-group-item">Site : {report.SiteAdress}</li>
        <li className="list-group-item">Severity: {report.Severity}</li>
        <li className="list-group-item">Email : {report.EmailRB}</li>
        <li className="list-group-item">Phone Number: {report.phoneRB}</li>
        <li className="list-group-item">Company: {report.Company}</li>
        <li className="list-group-item Details">Report Details: {report.Report}</li>
        <Link className="btn btn-primary mr-2" to={'/MyReports/edit/'+report._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div>
  );
};

export default  ViewReport;