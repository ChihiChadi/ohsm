import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';



const IncidentReports = props => {
  const [reports, setReports] = useState([]);
    
    useEffect(() => { fetchReports();}, []);

     /* const deleteUser=()=>{ axios.delete('/Users/delete/' + this.props.match.params.id)
          .then((res) => {
              console.log('User successfully deleted!')
          }).catch((error) => {
              console.log(error) })} */

    const fetchReports = async () => {
      const res = await axios.get('/IncidentReports');
      console.log(res.data);
      setReports(res.data); };

    return(
        <div><center><h1>Reports List</h1></center>
        <div className="container_Big">
        <Link to='/IncidentReports/Add' className="btn btn-primary">Add Report</Link>
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead>
               <tr>
                 <th scope="col">Report Title</th>
                 <th scope="col">Company</th>
                 <th scope="col">Site Adress</th>
                 <th scope="col">Reported By</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{reports.map((report) => {
                 return (
                 <tr key={report._id}>        
                  <td>{report.ReportTitle}</td>
                  <td>{report.companyName}</td> 
                  <td>{report.SiteAdress}</td>
                  <td>{report.ReportedBy}</td>
                  <td><span><Link to={'/IncidentReports/'+report._id}><ZoomInRoundedIcon/></Link></span>
                  <span><Link to={'/IncidentReports/edit/'+report._id}><EditRoundedIcon/></Link></span>
                  <span><Link to={`/IncidentReports/`+report._id+`/Tasks`}><BuildRoundedIcon/></Link></span>
                  <span><DeleteForeverRoundedIcon /></span></td>
                  </tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default IncidentReports;