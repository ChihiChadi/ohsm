import React,{useContext} from 'react';
import Sign from './Components/signup/Sign';
import Admin from './Components/Admin/Admin.js';
import Employee from './Components/Employee/Employee';
import OHSMManager from './Components/OHSM Manager/OHSMManager.js';
import {AuthContext} from './Components/AuthContext';


function App() {
 const { user,isAuthenticated}=useContext(AuthContext);

  return ( 
<div>
    {!isAuthenticated  && <Sign/>}

    {user.role==="Employee" && isAuthenticated  && <Employee/>}

    {user.role==="OHSMManager" && isAuthenticated &&  <OHSMManager/>}

    {user.role==="Admin" && isAuthenticated && <Admin/>}
</div>    
 )
};
export default App;
