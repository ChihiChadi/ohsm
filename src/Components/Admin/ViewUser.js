import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewUser = () => {
  const [user, setUser] = useState([
    "IdNumber","Fullname","BirthDate","gender","email","phonenumber1","phonenumber2","role","company"]);
  const { id } = useParams();
  useEffect(() => {loadUser(id);}, []);
  const loadUser = async () => {
    const res = await axios.get('/Users/'+id);
    console.log(res.data);
    setUser(res.data);
  };
  return (
    <div><center><h1>User Informations</h1>
    <div className="container">
      <ul className="list-group"><h3>Informations:</h3>
        <li className="list-group-item">Employee ID: {user.IdNumber}</li>
        <li className="list-group-item">Name: {user.fullname}</li>
        <li className="list-group-item">Birth Date: {user.BirthDate}</li>
        <li className="list-group-item">Gender: {user.gender}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">Role: {user.role}</li>
        <li className="list-group-item">Phone Number 1: {user.phonenumber1}</li>
        <li className="list-group-item">Phone Number 2: {user.phonenumber2}</li>
        <li className="list-group-item">Company: {user.company}</li>
        <Link className="btn btn-primary mr-2" to={'/Users/edit/'+user._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div>
  );
};

export default  ViewUser;