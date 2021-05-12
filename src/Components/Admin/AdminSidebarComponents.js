import React from 'react';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';


export const AdminSidebarComponents=[
    {
      title:'Profile',
      icon:<AccountBoxRoundedIcon/>,
      link:'/Profile',
      cName:'side-text'
    },
    {
     title:'Companys',
     icon:<BusinessRoundedIcon/>,
     link:'/Companys',
     cName: 'side-text'
    },
    {
    title:'Users',
    icon:<PeopleAltRoundedIcon/>,
    link:'/Users',
    cName:'side-text'
    },
    { 
     title:'Admin Settings',
     icon:<SettingsRoundedIcon/>,
     link:'/SettingsAdmin',
     cName: 'side-text'
       },
  

] 