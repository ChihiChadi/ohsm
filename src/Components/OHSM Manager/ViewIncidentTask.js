import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'


const ViewIncidentTask = () => {
  const [task, setTask] = useState([
    "TaskTitle","TaskId","companyName","SiteAdress","SiteType","Responsable"]);
  const { id } = useParams();
  useEffect(() => {loadSite(id);}, []);
  const loadSite = async () => {
    const res = await axios.get('/IncidentReports/:id/Tasks/'+id);
    console.log(res.data);
    setTask(res.data);
  };
  return (
    <div><center><h1>Risk Details</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Details:</h3>
        <li className="list-group-item">Task ID: {task.TaskId}</li>
        <li className="list-group-item">Title: {task.TaskTitle}</li>
        <li className="list-group-item">Site Adress: {task.SiteAdress}</li>
        <li className="list-group-item">Company: {task.companyName}</li>
        <li className="list-group-item">Task Type: {task.TaskType}</li>
        <li className="list-group-item Details">Task Details: {task.TaskDetails}</li>
        <Link className="btn btn-primary mr-2" to={'/IncidentReports/:id/Tasks/edit/'+task._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewIncidentTask;