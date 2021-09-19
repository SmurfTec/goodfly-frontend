// NavBar Styles

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
   root: {},
   Appbar: {
      // backgroundColor: '#1462aa',
      backgroundColor: '#fff',
      // color: '#B033fa',
      paddingInline: 60,
      boxShadow: 'none',
   },
   grow: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      display: 'none',
      cursor: 'pointer',

      [theme.breakpoints.up('sm')]: {
         display: 'block',
      },
   },
   NavItem: {
      display: 'block',
      color: '#000',
      cursor: 'pointer',
      fontWeight: 700,
      textDecoration: 'none',
      fontSize: 17,
      '&:hover': {
         // borderBottom: '2px solid #B033fa',
         color: 'deepskyblue',
         transition: '0.3s',
      },
   },
   darkBtn: {
      overflow: 'unset !important',
      '&button': {},
   },
   RegisterBtn: {
      '&.MuiButton-contained': {
         backgroundColor: 'rgb(6, 198, 255)',
         borderRadius: 20,
         color: '#fff',
         transition: '0.6s',
         '&:hover': {
            backgroundColor: '#03a0d7',
         },
      },
   },

   sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
         display: 'flex',
         justifyContent: 'flex-end',
         flexGrow: '1',
         '& span': {
            color: '#4D4D4D',
            cursor: 'pointer',
         },
      },
   },

   sectionMobile: {
      display: 'flex',
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
         display: 'none',
         '& span': {
            color: '#4D4D4D',
            cursor: 'pointer',
         },
      },
   },
   MobileMenu: {
      height: 500,
   },
}));

export default useStyles;
