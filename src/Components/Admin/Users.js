import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';



const Users=() => {
  const [users, setUsers] = useState([]);
    const { id } = useParams();
    useEffect(() => { fetchUsers();}, []);
    useEffect(() => {deleteUser(id);}, []);
      const deleteUser= async()=>{ 
       const res= await axios.delete('/Users/delete/'+id);
          console.log('User successfully deleted!',res.data)
         .catch((error) => {
              console.log(error) })} 

    const fetchUsers = async () => {
      const res = await axios.get('/Users');
      console.log(res.data);
      setUsers(res.data); };

  return(
        <div><center><h1>Users List</h1>
          <div className="container"> 
             <table className="table table-bordered">
             <thead className="thead-dark">
               <tr>
                 <th scope="col">Full Name</th>
                 <th scope="col">Company</th>
                 <th scope="col">Role</th>
                 <th scope="col">Email</th>
                 <th scope="col">Actions</th>
               </tr>
               </thead>
              <tbody>{users.map((user) => {
                 return (
                 <tr key={user._id}>        
                  <td>{user.fullname}</td>
                  <td>{user.company}</td> 
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td><span><Link to={'/Users/'+user._id}><ZoomInRoundedIcon/></Link></span>
                  <span> <Link to={'/Users/edit/'+user._id}><EditRoundedIcon/></Link></span>
                  <span> <DeleteForeverRoundedIcon onClick={deleteUser}/></span></td>
                  </tr>);
                    })}
               </tbody>
             </table>  
        </div>
        </center>
        </div>
    );
}

  
export default Users;