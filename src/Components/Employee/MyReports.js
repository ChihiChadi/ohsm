import React,{useState,useEffect} from 'react';
import './style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';

const MyReports = props => {
  const [reports, setReports] = useState([]);
    
    useEffect(() => {
      fetchReports();
    }, []);
    const fetchReports = async () => {
      const res = await axios.get(`/MyReports`);
      console.log(res.data);
      setReports(res.data); };
    
    return(
        <div><center><h1>My Reports</h1></center>
        <div className="container_Big"><center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead className="thead-dark">
               <tr>
                 <th scope="col">Title</th>
                 <th scope="col">Site</th>
                 <th scope="col">Severity</th>
                 <th scope="col">Date</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
               <tbody>{reports.map((report) => {
                 return (<tr key={report._id}>        
                  <td>{report.ReportTitle}</td>
                  <td>{report.SiteAdress}</td> 
                  <td>{report.Severity}</td>
                  <td>{report.date}</td>
                <td><span><Link to={`/MyReports/${report._id}`}><ZoomInRoundedIcon/></Link></span>
                  <span><Link to={`/MyReports/edit/${report._id}`}><EditRoundedIcon/></Link></span></td></tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default MyReports;