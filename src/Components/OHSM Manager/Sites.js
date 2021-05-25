import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';

const Sites = props => {
  const [sites, setSites] = useState([]);
    
    useEffect(() => { fetchSites();}, []);

     /* const deleteUser=()=>{ axios.delete('/Users/delete/' + this.props.match.params.id)
          .then((res) => {
              console.log('User successfully deleted!')
          }).catch((error) => {
              console.log(error) })} */

    const fetchSites= async () => {
      const res = await axios.get('/Sites');
      console.log(res.data);
      setSites(res.data); };

    return(
        <div><center><h1>Sites's List</h1></center>
        <div className="container_Big">
        <Link to='/Sites/:id/Add' className="btn btn-primary">Add Site</Link>
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead>
               <tr>
                 <th scope="col">Site Name</th> 
                 <th scope="col">Company</th>
                 <th scope="col">Adress</th>
                 <th scope="col">Responsable</th> 
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{sites.map((site) => {
                 return (
                 <tr key={site._id}>        
                  <td>{site.SiteName}</td>
                  <td>{site.companyN}</td> 
                  <td>{site.Responsable}</td>
                  <td>{site.SiteAdress}</td>
                  <td><span><Link to={'/Sites/'+site._id}><ZoomInRoundedIcon/></Link></span>
                  <span><Link to={'/Sites/edit/'+site._id}><EditRoundedIcon/></Link></span>
                  <span><DeleteForeverRoundedIcon /></span></td>
                  </tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default Sites;