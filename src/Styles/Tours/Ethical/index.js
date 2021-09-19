import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
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
  Reviews: {
    backgroundColor: '#fafafa',
    width: '95%',
    marginInline: 'auto',
    paddingTop: 30,
  },
  Review: {
    backgroundColor: '#fff',
    padding: '40px 20px',
    marginBottom: '2rem',
    borderRadius: 15,
    border: '1px solid #ccc',
    width: 420,
    marginInline: 'auto',
  },
  ReviewUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ReviewInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
