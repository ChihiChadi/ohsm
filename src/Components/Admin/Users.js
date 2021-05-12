import React,{useState,useEffect} from 'react';
import '../Employee/style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ZoomInRoundedIcon from '@material-ui/icons/ZoomInRounded';


const Users = props => {
  const [users, setUsers] = useState([]);
    
    useEffect(() => { fetchUsers();}, []);

      const deleteUser= async()=>{ 
        axios.delete('/Users/delete/'+ this.props.match.params.id).then((res) => {
              console.log('User successfully deleted!',res.data)
          }).catch((error) => {
              console.log(error) })} 

    const fetchUsers = async () => {
      const res = await axios.get('/Users');
      console.log(res.data);
      setUsers(res.data); };

    return(
        <div><center><h1>Users List</h1>
          <div className="container"> 
             <table className="table">
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
                  <td><Link to={'/Users/'+user._id}><ZoomInRoundedIcon/></Link>
                      <Link to={'/Users/edit/'+user._id}><EditRoundedIcon/></Link>
                      <DeleteForeverRoundedIcon onClick={deleteUser}/></td>
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