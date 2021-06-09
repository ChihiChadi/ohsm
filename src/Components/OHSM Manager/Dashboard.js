import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Employee/style.css'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([
    "nbReports", "nbEmployees","nbSites"]);
  useEffect(() => {
    loadDashboard();
  }, []);
  const loadDashboard = async () => {
    const res = await axios.get('/Dashboard');
    console.log(res.data);
    setDashboard(res.data);
  };
  return (
    <div><center><h1>Dashboard</h1></center>
    <div className="container_Big"><center>
    <div className="container">
     <div>
     <div>nb reports: {dashboard.nbReports}</div>
     <div>nb employees: {dashboard.nbEmployees}</div>
     <div>nb Sites: {dashboard.nbSites}</div>
     </div></div> </center></div></div>
  );
}
export default Dashboard;