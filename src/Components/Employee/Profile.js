import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import './style.css'


const Profile = () => {
  const [user, setUser] = useState([
    "IdNumber","Fullname","BirthDate","gender","email","phonenumber","role","company"]);
  // eslint-disable-next-line
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get('/Profile');
    console.log(res.data);
    setUser(res.data);
  };
  return (
    <div><center><h1>My Profile</h1>
    <div className="container">
      <ul className="list-group"><h3>My Informations:</h3>
        <li className="list-group-item">Employee ID: {user.IdNumber}</li>
        <li className="list-group-item">Name: {user.fullname}</li>
        <li className="list-group-item">Birth Date: {user.BirthDate}</li>
        <li className="list-group-item">Gender: {user.gender}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">Role: {user.role}</li>
        <li className="list-group-item">Phone Number: {user.phonenumber}</li>
        <li className="list-group-item">Company: {user.company}</li>
        <Link className="btn btn-primary mr-2" to={'/Profile/edit/'+user._id}>Edit</Link>
      </ul>
      
    </div>
    </center></div>
  );
};

export default Profile;