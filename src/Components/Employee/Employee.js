import React,{useState} from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import Navbar from '../Navbar';
import '../Navbar.css';
import '../Sidebar.css';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Profile from './Profile';
import MyReports from './MyReports';
import AddIncidentReports from './AddIncidentReports';
import EditProfile from './EditProfile';
import ViewReport from './ViewReport';
import EditReport from './EditReport';

function Employee() {
    const [sidebarOpen, setsidebarOpen] = useState(false);
    const openSidebar = () => {setsidebarOpen(true);};
    const closeSidebar = () => {setsidebarOpen(false);};
    
return (
  <div className="container">
   <Router> 
   <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
    <EmployeeSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    <Switch>
    <Route path="/"  exact component={Profile}><Profile/></Route>
    <Route path="/Profile"  exact component={Profile}><Profile/></Route>
    <Route path="/AddIncidentReports" exact component={AddIncidentReports}><AddIncidentReports/></Route>
    <Route path="/MyReports" exact component={MyReports}><MyReports/></Route> 
    <Route path="/MyReports/edit/:id" exact component={EditReport}><EditReport/></Route>
    <Route path="/MyReports/:id" exact component={ViewReport}><ViewReport/></Route>
    <Route path="/Profile/edit/:id" exact component={EditProfile}><EditProfile/></Route>
    </Switch> 
   </Router>
  </div>
);
}

export default Employee;