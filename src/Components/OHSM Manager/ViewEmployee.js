import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewEmployee = () => {
  const [employee, setEmployee] = useState([
    "IdNumber","Fullname","BirthDate","gender","email","phonenumber2","phonenumber1","role","company"]);
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(() => {loadEmployee(id);}, []);
  const loadEmployee = async () => {
    const res = await axios.get('/Employees/'+id);
    console.log(res.data);
    setEmployee(res.data);
  };
  return (
    <div><center><h1>Employee Profile</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Employee Informations:</h3>
        <li className="list-group-item">Employee ID: {employee.IdNumber}</li>
        <li className="list-group-item">Name: {employee.fullname}</li>
        <li className="list-group-item">Birth Date: {employee.BirthDate}</li>
        <li className="list-group-item">Gender: {employee.gender}</li>
        <li className="list-group-item">Email: {employee.email}</li>
        <li className="list-group-item">Role: {employee.role}</li>
        <li className="list-group-item">Phone Number 1: {employee.phonenumber1}</li>
        <li className="list-group-item">Phone Number 2: {employee.phonenumber2}</li>
        <li className="list-group-item">Company: {employee.company}</li>
        <Link className="btn btn-primary mr-2" to={'/Employees'}>Back</Link>
      </ul>
    </div>
    </center></div></div>
  );
};

export default ViewEmployee;