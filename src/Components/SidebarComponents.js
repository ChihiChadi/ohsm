import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

export const SidebarComponents=[
    {
     title:'Home',
     icon:<HomeRoundedIcon/>,
     link:'/Home',
     cName: 'side-text'
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
     link:'/RiskAssesment',
     cName: 'side-text'
    },
    {
     title:'Tasks',
     icon:<AssignmentTurnedInRoundedIcon/>,
     link:'/Tasks',
     cName: 'side-text'
    },
    {
     title:'Equipments',
     icon:<BuildRoundedIcon/>,
     link:'/Equipments',
     cName: 'side-text'
       },
    {
    title:'Incidents Reports',
    icon:<ReportRoundedIcon/>,
    link:'/IncidentReports',
    cName: 'side-text'
    },
    { 
     title:'Settings',
     icon:<SettingsRoundedIcon/>,
     link:'/Settings',
     cName: 'side-text'
       },
    {
    title:'Dashboard',
    icon:<DashboardRoundedIcon/>,
    link:'/Dashboard',
    cName: 'side-text'
    }    

] 




