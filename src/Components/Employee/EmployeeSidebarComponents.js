import React from 'react';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const EmployeeSidebarComponents=[
    {
      title:'Profile',
      icon:<AccountBoxRoundedIcon/>,
      link:'/Profile',
      cName:'side-text'
    },
    {
    title:'Add Incidents Reports',
    icon:<AssignmentIcon/>,
    link:'/AddIncidentReports',
    cName: 'side-text'
    },
    {
    title:'My Reports',
    icon:<ReportRoundedIcon/>,
    link:'/MyReports',
    cName: 'side-text'
    },

] 