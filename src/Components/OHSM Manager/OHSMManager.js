import OHSMSidebar from './OHSMSidebar';
import Navbar from '../Navbar';
import '../Navbar.css';
import '../Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import Profile from '../Employee/Profile';
import IdRisks from './IdRisks';
import Employees from './Employees' ;
import IncidentReports from './IncidentReports' ;
import Sites from './Sites';
import Dashboard from './Dashboard';
import CompanySettings from './CompanySettings'  ;
import EditProfile from '../Employee/EditProfile';
import AddReport from './AddReport';
import ViewReport from './ViewReport';
import EditReport from './EditReport';
import ReportTasks from './ReportTasks'
import EditCompany from './EditCompany';
import AddRisk from './AddRisk';
import EditRisk from './EditRisk';
import ViewRisk from './ViewRisk';
import AddRiskTask from './AddRiskTask';
import RiskTasks from './RiskTasks'
import AddSite from './AddSite';
import EditSite from './EditSite';
import ViewSite from './ViewSite';
import AddIncidentTask from './AddIncidentTask';
import ViewRiskTask from './ViewRiskTask';
import ViewIncidentTask from './ViewIncidentTask';
import EditIncidentTask from './EditIncidentTask';
import EditRiskTask from './EditRiskTask';
import ViewEmployee from './ViewEmployee';

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
      <Route path="/Profile"  exact component={Profile}><Profile/></Route>
      <Route path="/"  exact component={Profile}><Profile/></Route>
      <Route path="/Profile/edit/:id" exact component={EditProfile}><EditProfile/></Route>

      <Route path="/IdRisks" exact component={IdRisks}><IdRisks/></Route> 
      <Route path="/IdRisks/Add" exact component={AddRisk}><AddRisk/></Route> 
      <Route path="/IdRisks/edit/:id" exact component={EditRisk}><EditRisk/></Route> 
      <Route path="/IdRisks/:id/Tasks" exact component={RiskTasks}><RiskTasks/></Route>
      <Route path="/IdRisks/:id/Tasks/Add" exact component={AddRiskTask}><AddRiskTask/></Route>
      <Route path="/IdRisks/:id/Tasks/:id" exact component={ViewRiskTask}><ViewRiskTask/></Route>
      <Route path="/IdRisks/:id/Tasks/edit/:id" exact component={EditRiskTask}><EditRiskTask/></Route>
      <Route path="/IdRisks/:id" exact component={ViewRisk}><ViewRisk/></Route>

      <Route path="/Employees" exact component={Employees}><Employees/></Route>
      <Route path="/Employees/:id" exact component={ViewEmployee}><ViewEmployee/></Route>

      <Route path="/Sites" exact component={Sites}><Sites/></Route>
      <Route path="/Sites/Add" exact component={AddSite}><AddSite/></Route>
      <Route path="/Sites/edit/:id" exact component={EditSite}><EditSite/></Route>
      <Route path="/Sites/:id" exact component={ViewSite}><ViewSite/></Route>

      <Route path="/IncidentReports" exact component={IncidentReports}><IncidentReports/></Route>
      <Route path="/IncidentReports/Add" exact component={AddReport}><AddReport/></Route>
      <Route path="/IncidentReports/edit/:id" exact component={EditReport}><EditReport/></Route>
      <Route path="/IncidentReports/:id/Tasks" exact component={ReportTasks}><ReportTasks/></Route>
      <Route path="/IncidentReports/:id/Tasks/Add" exact component={AddIncidentTask}><AddIncidentTask/></Route>
      <Route path="/IncidentReports/:id/Tasks/:id" exact component={ViewIncidentTask}><ViewIncidentTask/></Route>
      <Route path="/IncidentReports/:id/Tasks/edit/:id" exact component={EditIncidentTask}><EditIncidentTask/></Route>
      <Route path="/IncidentReports/:id" exact component={ViewReport}><ViewReport/></Route>

      <Route path="/Dashboard" exact component={Dashboard}><Dashboard/></Route>

      <Route path="/CompanySettings" exact component={CompanySettings}><CompanySettings/></Route>
      <Route path="/CompanySettings/edit/:id" exact component={EditCompany}><EditCompany/></Route>
      
    </Switch>
    </Router>
  </div>
);
}

export default OHSMManager;