import AdminSidebar from './AdminSidebar';
import Navbar from '../Navbar';
import '../Navbar.css';
import '../Sidebar.css';
import {useState} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Profile from '../Employee/Profile';
import Companys from './Companys';
import SettingsAdmin from './SettingsAdmin';
import EditProfile from '../Employee/EditProfile';
import Users from './Users';
import EditUser from './EditUser';
import ViewUser from './ViewUser';

function Admin() {
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const openSidebar = () => {setsidebarOpen(true);};
    const closeSidebar = () => {setsidebarOpen(false);};

return (
  <div className="container">
   <Router> <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
    <AdminSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    <Switch>
      <Route path="/"  exact component={Profile}><Profile/></Route>
      <Route path="/Profile" exact component={Profile}><Profile/></Route>
      <Route path="/Profile/edit/:id" exact component={EditProfile}><EditProfile/></Route>
      <Route path="/Companys" exact component={Companys}><Companys/></Route> 
      <Route path="/SettingsAdmin" exact component={SettingsAdmin}><SettingsAdmin/></Route> 
      <Route path="/Users" exact component={Users}><Users/></Route>
      <Route path="/Users/edit/:id"  exact component={EditUser}><EditUser/></Route>
      <Route path="/Users/:id"  exact component={ViewUser}><ViewUser/></Route>
    </Switch>
    </Router>
  </div>
);
}

export default Admin;