import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const CompanySettings = () => {
  const [company, setCompany] = useState([
    "CompanyName","Email","PhoneNumber","Adress"]);
  // eslint-disable-next-line
  const { id } = useParams();
  useEffect(() => {
    loadReport();
  }, []);
  const loadReport = async () => {
    const res = await axios.get('/CompanySettings');
    console.log(res.data);
    setCompany(res.data);
  };
  return (
    <div><center><h1>Company Settings</h1>
    <div className="container">
      <ul className="list-group"><h3>Company Informations:</h3>
        <li className="list-group-item">Company ID: {company._id}</li>
        <li className="list-group-item">Name: {company.CompanyName}</li>
        <li className="list-group-item">Email: {company.Email}</li>
        <li className="list-group-item">Phen Nymber: {company.PhoneNumber}</li>
        <li className="list-group-item">Adress: {company.Adress}</li>
        <Link className="btn btn-primary mr-2" to={'/Company/edit/'+company._id}>Edit</Link>
      </ul>
      
    </div>
    </center></div>
  );
};

export default CompanySettings;