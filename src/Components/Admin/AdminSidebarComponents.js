import React from 'react';

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

  

] 