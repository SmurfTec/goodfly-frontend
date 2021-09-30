import { makeStyles } from '@material-ui/styles';
import PromoImage from 'Assets/img/PromoImg.jpg';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    overflowX: 'auto',
    alignItems: 'center',

    maxWidth: 1250,
    margin: '1rem auto',

    '& span': {
      flex: '0 0 auto',
      padding: '8px 10px',
      marginRight: '1rem',
      textDecoration: 'none',
      color: '#4d4d4d',
      fontWeight: 'bold',
      '&:hover': {
        color: '#FB3431',
        cursor: 'pointer',
      },
    },
  },
  LeftGridItem: {
    paddingRight: 20,
    margin: '0 auto',
    '& .MuiPaper-root': {
      boxShadow: 'none',
      border: '1px solid black',
    },
    display: 'inline-block',

    [theme.breakpoints.up('md')]: {
      maxHeight: 525,
      //  position: 'absolute',
      bottom: 20,
      left: 65,
    },
  },
  RightGridItem: {
    paddingLeft: 20,
    //   border: '1px solid #ccc',

    [theme.breakpoints.up('md')]: {
      maxHeight: 525,
    },
  },
  travelPromo: {
    width: '100%',
    height: 500,
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(7),
    backgroundImage: `url(${PromoImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    fontStyle: 'italic',
  },
  promoContent: {
    marginLeft: theme.spacing(4),
    '& h2': {
      color: '#fff',
    },

    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
  promoDesc: {
    width: 380,
    borderRadius: 6,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255, 0.8)',
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
  newsLetterSubs: {
    padding: theme.spacing(3, 3),
    backgroundColor: '#4d4d4d',
    color: '#fff',
    borderRadius: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    '& h6': {
      '& span': {
        color: theme.palette.primary.main,
      },
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    width: '100%',
    padding: '9px 20px',
    textAlign: 'left',
    border: 0,
    outline: 0,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 300,
    color: '#8D8D8D',
    WebkitTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  },
  addressBox: {
    padding: theme.spacing(3, 3),
    backgroundColor: theme.palette.grey[400],
    color: '#fff',
    borderRadius: 15,
    fontStyle: 'italic',
  },
  partnersSection: {
    marginTop: theme.spacing(9),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    '& h4': {
      fontStyle: 'italic',
      marginTop: theme.spacing(4),
    },
  },
  carouselContainer: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
}));

export default useStyles;
