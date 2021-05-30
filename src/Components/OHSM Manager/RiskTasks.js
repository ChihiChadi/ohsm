import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';

const RiskTasks = props => {
  const [tasks, setTasks] = useState([]);
    
    useEffect(() => { fetchRisksTasks();}, []);

     const deleteTask=(id)=>{ axios.delete('/IdRisks/:id/Tasks/delete' + id)
          .then((res) => {
              console.log('Task successfully deleted!')
              alert("Task successfully deleted!")
              window.location.reload();
          }).catch((error) => {
              console.log(error) })} 

    const fetchRisksTasks = async () => {
      const res = await axios.get('/IdRisks/:id/Tasks');
      console.log(res.data);
      setTasks(res.data); };

    return(
        <div><center><h1>Risk Tasks List</h1></center>
        <div className="container_Big">
        <Link to='/IncidentReports/:id/Tasks/Add' className="btn btn-primary">Add Task</Link>
        <center>
          <div className="container"> 
             <table className="table table-bordered">
             <thead>
               <tr>
                 <th scope="col">Task Title</th> 
                 <th scope="col">Company</th>
                 <th scope="col">Task Type</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{tasks.map((task) => {
                 return (
                 <tr key={task._id}>        
                  <td>{task.TaskTitle}</td>
                  <td>{task.companyName}</td> 
                  <td>{task.SiteAdress}</td>
                  <td><span><Link to={'/IdRisks/:id/Tasks/'+task._id}><ZoomInRoundedIcon/></Link></span>
                  <span><Link to={'/IdRisks/:id/Tasks/edit/'+task._id}><EditRoundedIcon/></Link></span>
                  <span><button className="Delete" onClick={() => { deleteTask(task._id) }}><DeleteForeverRoundedIcon/></button></span></td>
                  </tr>);})}
               </tbody>
             </table>  
        </div>
        </center>
        </div></div>
    );
}

  
export default RiskTasks;