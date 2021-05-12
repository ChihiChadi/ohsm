import React from 'react';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';


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
     title:'Risk Assessment',
     icon:<EmojiObjectsRoundedIcon/>,
     link:'/RiskAssessment',
     cName: 'side-text'
    },
    {
     title:'Tasks',
     icon:<AssignmentTurnedInRoundedIcon/>,
     link:'/Tasks',
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




