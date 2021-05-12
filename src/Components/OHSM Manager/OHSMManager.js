import OHSMSidebar from './OHSMSidebar';
import Navbar from '../Navbar';
import '../Navbar.css';
import '../Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import Profile from '../Employee/Profile';
import IdRisks from './IdRisks';
import RiskAssessment from './RiskAssessment' ;
import Tasks from './Tasks' ;
import IncidentReports from './IncidentReports' ;
import Dashboard from './Dashboard';
import CompanySettings from './CompanySettings'  ;
import EditProfile from '../Employee/EditProfile';


function OHSMManager() {
    const [sidebarOpen, setsidebarOpen] = useState(false);
const openSidebar = () => {
  setsidebarOpen(true);
};
const closeSidebar = () => {
  setsidebarOpen(false);
};
return (
  <div className="container">
   <Router> 
    <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
    <OHSMSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    <Switch>
      <Route path="/"  exact component={Profile}><Profile/></Route>
      <Route path="/Profile"  exact component={Profile}><Profile/></Route>
      <Route path="/IdRisks" exact component={IdRisks}><IdRisks/></Route> 
      <Route path="/RiskAssessment" exact component={RiskAssessment}><RiskAssessment/></Route>
      <Route path="/Tasks" exact component={Tasks}><Tasks/></Route>
      <Route path="/IncidentReports" exact component={IncidentReports}><IncidentReports/></Route>
      <Route path="/Dashboard" exact component={Dashboard}><Dashboard/></Route>
      <Route path="/CompanySettings" exact component={CompanySettings}><CompanySettings/></Route>
      <Route path="/Profile/edit/:id" exact component={EditProfile}><EditProfile/></Route>
    </Switch>
    </Router>
  </div>
);
}

export default OHSMManager;