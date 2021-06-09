import React, { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../Employee/style.css'
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import 'zingchart/modules-es6/zingchart-heatmap.min.js';


const ViewRisk = () => {
  const [risk, setRisk] = useState([
    "RiskId","RiskName","Company","SiteAdress","RiskType","RiskSeverity","RiskProbability","RiskDetails"]);
  const { id } = useParams();
  // eslint-disable-next-line
  useEffect(() => {loadRisk(id);}, []);
  const loadRisk = async () => {
    const res = await axios.get('/IdRisks/'+id);
    console.log(res.data);
    setRisk(res.data);
  };
   
  const config={
    "type": "heatmap",
    "plot":{
      "background-color":"red",
      "aspect": "none",
      "value-box": {
        "rules":[
          {
            "rule":"%v == 100",
            'text': "LOW"
   
          },
          {
            "rule":"%v == 200",
            'text': "MEDIUM",
           
          },
            {
            "rule":"%v == 300",
            'text': "HIGH"
          },
            {
            "rule":"%v == 400",
            'text': "EXTREME"
          }
        ]

      },
      "hover-state":{
        "visible":false
      },
      "rules":[
        {
          "rule":"%v == 100",
          "background-color":"#90caf9",
          'tooltip-text': "LOW"
 
        },
        {
          "rule":"%v == 200",
          "background-color":"#ffb74d",
          'tooltip-text': "MEDIUM",
         
        },
          {
          "rule":"%v == 300",
          "background-color":"#ef6c00",
          'tooltip-text': "HIGH"
        },
          {
          "rule":"%v == 400",
          "background-color":"#d84315",
          'tooltip-text': "EXTREME"
        }
      ]
    },
    "scale-x":{
      "labels":["Insignificant","Minor","Moderate","Major","Extreme"],
      "line-color":"none",
      "guide":{
        "visible":false
      },
      "tick":{
        "visible":false
      },
      "placement":"opposite"
    },
    "scale-y":{
      "labels":["Unlikely", "Remote","Occasional","Certain","Frequent"],
      "line-color":"none",
      "guide":{
        "visible":false
      },
      "tick":{
        "visible":false
      }
    },
   "series": [
       { "values": [100,200,200,300,400]},
       { "values": [100,200,200,300,300]},
       { "values": [100,100,200,200,200]},
       { "values": [100,100,100,200,200]},
       { "values": [100,100,100,100,100]}
   ]
  }
   
  return (
    <div><center><h1>Risk Details</h1></center>
    <div className="container_Big"><center>
    <div className="container">
      <ul className="list-group"><h3>Details:</h3>
        <li className="list-group-item">Risk ID: {risk.RiskId}</li>
        <li className="list-group-item">Title: {risk.RiskName}</li>
        <li className="list-group-item">Site Adress: {risk.SiteAdress}</li>
        <li className="list-group-item">Company: {risk.Company}</li>
        <li className="list-group-item">Risk Type: {risk.RiskType}</li>
        <li className="list-group-item">Risk Severity: {risk.RiskSeverity}</li>
        <li className="list-group-item">Risk Probability: {risk.RiskProbability}</li>
        <li className="list-group-item Details">Risk Details: {risk.RiskDetails}</li>
        <li className="list-group-item Chart"><ZingChart data={config}/></li>

        <Link className="btn btn-primary mr-2" to={'/IdRisks/edit/'+risk._id}>Edit</Link>
      </ul>
    </div>
    </center>
    </div></div>
  );
};

export default  ViewRisk;