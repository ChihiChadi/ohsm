import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const IdRisks = props => {
  const [risks, setRisks] = useState([]);
    
    useEffect(() => {
      fetchRisks();
    }, []);
    const fetchRisks = async () => {
      const res = await axios.get(`/IdRisks`);
      console.log(res.data);
      setRisks(res.data); };
    
    return(
        <div><center><h1>Risks List</h1></center>
         <div className="container_Big">
        <Link to='/IdRisks/Add' className="btn btn-primary">Add Risk</Link>
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead className="thead-dark">
               <tr>
                 <th scope="col">Risk Name</th>
                 <th scope="col">Site Adress</th>
                 <th scope="col">Risk Type</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
               <tbody>{risks.map((risk) => {
                 return (<tr key={risk._id}>        
                  <td>{risk.RiskName}</td>
                  <td>{risk.SiteAdress}</td> 
                  <td>{risk.RiskType}</td>
                <td><span><Link to={`/IdRisks/`+risk._id}><ZoomInRoundedIcon/></Link></span>
                <span><Link to={`/IdRisks/edit/`+risk._id}><EditRoundedIcon/></Link></span>
                <span><Link to={`/IdRisks/`+risk._id+`/Tasks`}><BuildRoundedIcon/></Link></span>
                <span><DeleteForeverRoundedIcon/></span>
                  </td></tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default IdRisks;