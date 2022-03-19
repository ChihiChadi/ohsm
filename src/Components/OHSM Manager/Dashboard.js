import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Employee/style.css'
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

const Dashboard = () => {
  const [dashboard1, setDashboard1] = useState([
    "nbReports", "nbEmployees", "nbSites"]);
  const [dashboard2, setDashboard2] = useState([]);
  const [dashboard3, setDashboard3] = useState([]);
  useEffect(() => {
    loadDashboard1();
    loadDashboard2();
    loadDashboard3();
  }, []);
  const loadDashboard1 = async () => {
    const res = await axios.get('/Dashboard1');
    console.log(res.data);
    setDashboard1(res.data);
  };
  const loadDashboard2 = async () => {
    const res = await axios.get('/Dashboard2');
    console.log(res.data);
    setDashboard2(res.data);
  };
  const loadDashboard3 = async () => {
    const res = await axios.get('/Dashboard3');
    console.log(res.data);
    setDashboard3(res.data);
  };
  const config = {
    type: "bar",
    plotarea: {
      adjustLayout:true
    },
    scaleX: {
      label:{
        text:"Here is  Reports"
      },
      labels:["Report1","Report2","Report3","Report4"] 
    },
    scaleY: {
      label:{
        text:"Here is Severity"
      },
      values:["","Minor","Major","Extreme"] 
    },
    series: [
      {
        values:["Major","Extreme","Extreme","Minor"]
      },
      ]
  }

  return (
    <div><center><h1>Dashboard</h1></center>
      <div className="container_Big"><center>
        <div className="container">
          <div className="Numbers">
            <div className="numbers">Incidents reports: <span className="num" > {dashboard1.nbReports}</span></div>
            <div className="numbers">Employees: <span className="num" >{dashboard1.nbEmployees}</span></div>
            <div className="numbers">Sites: <span className="num" >{dashboard1.nbSites}</span></div>
          </div><div className='Incidentchart'><ZingChart data={config} /></div>
        </div>
      </center>
      </div>
    </div>
  );
}
export default Dashboard;