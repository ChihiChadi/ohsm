import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewCompany = () => {
  const [company, setCompany] = useState(["CompanyId","CompanyName","PhoneNumber","Adress","Email","Website"]);
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(() => {loadCompany(id);}, []);
  const loadCompany = async () => {
    const res = await axios.get('/Companys/'+id);
    console.log(res.data);
    setCompany(res.data);
  };
  return (
    <div><center><h1>Company Informations</h1>
    <div className="container">
      <ul className="list-group"><h3>Informations:</h3>
        <li className="list-group-item">Company ID: {company.CompanyId}</li>
        <li className="list-group-item">Name: {company.CompanyName}</li>
        <li className="list-group-item">Email: {company.Email}</li>
        <li className="list-group-item">Phone Number: {company.PhoneNumber}</li>
        <li className="list-group-item">Adress: {company.Adress}</li>
        <li className="list-group-item">Website: {company.Website}</li>
        <Link className="btn btn-primary mr-2" to={'/Companys/edit/'+company._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div>
  );
};

export default  ViewCompany;