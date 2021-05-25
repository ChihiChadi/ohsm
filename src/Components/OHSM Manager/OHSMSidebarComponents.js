import React from 'react';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import PlaceRoundedIcon from '@material-ui/icons/PlaceRounded';

export const OHSMSidebarComponents=[
    {
      title:'Profile',
      icon:<AccountBoxRoundedIcon/>,
      link:'/Profile',
      cName:'side-text'
    },
    { 
     title:'Risk Identification',
     icon:<ErrorOutlineRoundedIcon/>,
     link:'/IdRisks',
     cName: 'side-text'
    },
    {
     title:'Employees',
     icon:<GroupRoundedIcon/>,
     link:'/Employees',
     cName: 'side-text'
    },
    {
     title:'Sites',
     icon:<PlaceRoundedIcon/>,
     link:'/Sites',
     cName: 'side-text'
    },
    {
    title:'Incidents Reports',
    icon:<ReportRoundedIcon/>,
    link:'/IncidentReports',
    cName: 'side-text'
    },
    {
      title:'Dashboard',
      icon:<DashboardRoundedIcon/>,
      link:'/Dashboard',
      cName: 'side-text'
      },
    { 
     title:'Company Settings',
     icon:<SettingsRoundedIcon/>,
     link:'/CompanySettings',
     cName: 'side-text'
       },
  

] 




