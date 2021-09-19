import React, { useState, useEffect, useContext } from 'react';

// MUI
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
} from '@material-ui/core';
// --- //

// Assets
import img1 from 'Assets/img/ethical.png';
import img2 from 'Assets/img/desert.jpg';
import img3 from 'Assets/img/malaysia.jpg';
import img4 from 'Assets/img/maldives.jpg';

import stageImg1 from 'Assets/img/stage1.png';
import stageImg2 from 'Assets/img/stage12.png';
import stageImg3 from 'Assets/img/stage2.png';
import stageImg4 from 'Assets/img/stage23.png';
// ------------------------------

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const stages = [
  {
    _id: '12312',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1],
  },
  {
    _id: '12122',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [stageImg1, stageImg2, stageImg3, stageImg3, stageImg3],
  },
  {
    _id: '121dasdad2',
    date: '05/04/2020 - Jour #01 : ',
    locatation: 'Départ Aéroport Paris CDG',
    description: `Ut mi turpis, sagittis quis eleifend non, faucibus eget velit. Proin ullamcorper 
      pulvinar velit, vitae egestas mauris mattis in. Nam dapibus facilisis nisi, non mollis
      magna. Pellentesque at tincidunt tortor. Quisque imperdiet condimentum. 
      `,
    accommodations: [
      {
        _id: '12312312',
        location:
          'Etape : Aéroport internationnal Paris Charles de Gaulle',
        description:
          'Aliquam vel purus molestie, bibendum quam ac, tempor tortor.',
      },
      {
        _id: '12312',
        location: 'Repas : Demi-pension',
        description:
          'Urna quis sodales luctus, leo diam porttitor ante, sit amet venenatis sapien nisi in lacus.',
      },
    ],
    images: [
      stageImg3,
      stageImg4,
      // stageImg3,
      // stageImg4,
      // stageImg3,
      // stageImg4,
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  Carousel: {
    '& img': {
      height: 300,
      objectFit: 'cover',
    },
  },
  Grid1: {
    width: '95%',
    margin: '3rem auto',
  },
  TourDetails: {
    backgroundColor: '#fafafa',
    minHeight: 292,
    textAlign: 'left',
    position: 'relative',
    // [theme.breakpoints.down('sm')]: {
    //   marginBottom: 100,
    // },
  },

  TourDescription: {
    display: 'flex',
  },

  RightGrid: {
    backgroundColor: '#46b9f6',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#fff',
    borderRadius: 10,
    height: 170,
  },

  Stages: {
    backgroundColor: '#fafafa',
    color: '#333333',
  },

  Tabs: {
    '& .MuiTab-root': {
      backgroundColor: '#e6e6e6',
      color: '#808080',
    },
    '& .Mui-selected': {
      backgroundColor: '#fafafa',
      color: '#333333',
    },
  },
  InActiveTab: {
    // backgroundColor: '#fafafa',
    // color: '#333333',
  },
  ActiveTab: {
    // backgroundColor: '#e6e6e6',
    // color: '#808080',
  },
}));

const Index = () => {
  const classes = useStyles();

  return <div>Ethical Page Here</div>;
};

export default Index;
