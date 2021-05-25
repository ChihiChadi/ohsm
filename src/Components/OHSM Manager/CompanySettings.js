import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const CompanySettings = () => {
  const [company, setCompany] = useState([
    "CompanyId", "CompanyName","Email","PhoneNumber","Adress","Website"]);
  useEffect(() => {
    loadCompany();
  }, []);
  const loadCompany = async () => {
    const res = await axios.get('/CompanySettings');
    console.log(res.data);
    setCompany(res.data);
  };
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
        <Link className="btn btn-primary mr-2" to={'/CompanySettings/edit/'+company._id}>Edit</Link>
      </ul>
    </div>
    </center></div></div>
  );
};

export default CompanySettings;