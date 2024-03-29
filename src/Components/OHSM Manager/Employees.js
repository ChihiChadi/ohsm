import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';

const Employees = props => {
  const [employees, setEmployees] = useState([]);
    
    useEffect(() => { fetchEmployees();}, []);

    const fetchEmployees = async () => {
      const res = await axios.get('/Employees');
      console.log(res.data);
      setEmployees(res.data); };

    return(
        <div><center><h1>Employees List</h1></center>
        <div className="container_Big">
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead>
               <tr>
                 <th scope="col">Employee Name</th>
                 <th scope="col">Company</th>
                 <th scope="col">Email</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{employees.map((employee) => {
                 return (
                 <tr key={employee._id}>        
                  <td>{employee.fullname}</td>
                  <td>{employee.company}</td> 
                  <td>{employee.email}</td>
                  <td><span><Link to={'/Employees/'+employee._id}><ZoomInRoundedIcon/></Link></span>
                  </td>
                  </tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default Employees;