import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';



const Companys=() => {
  const [companys, setCompanys] = useState([]);
    const { id } = useParams();
    useEffect(() => { fetchCompanys();}, []);
    useEffect(() => {deleteCompany(id);}, []);
      const deleteCompany= async()=>{ 
       const res= await axios.delete('/Companys/delete/'+id);
          console.log('Company successfully deleted!',res.data)
         .catch((error) => {
              console.log(error) })} 

    const fetchCompanys = async () => {
      const res = await axios.get('/Companys');
      console.log(res.data);
      setCompanys(res.data); };

  return(
        <div><center><h1>Companies List</h1></center>
        <Link to='/Companys/Add' className="btn btn-primary">Add Company</Link>
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead className="thead-dark">
               <tr>
                 <th scope="col">Name</th>
                 <th scope="col">Email</th>
                 <th scope="col">Phone Number</th>
                 <th scope="col">Adress</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{companys.map((company) => {
                 return (
                 <tr key={company._id}>        
                  <td>{company.CompanyName}</td>
                  <td>{company.Email}</td> 
                  <td>{company.PhoneNumber}</td>
                  <td>{company.Adress}</td>
                  <td><span><Link to={'/Companys/'+company._id}><ZoomInRoundedIcon/></Link></span>
                  <span><Link to={'/Companys/edit/'+company._id}><EditRoundedIcon/></Link></span>
                  <span> <DeleteForeverRoundedIcon onClick={deleteCompany}/></span></td>
                  </tr>);
                    })}
               </tbody>
             </table>  
        </div>
         </center>
        </div>
    );
}

  
export default Companys;