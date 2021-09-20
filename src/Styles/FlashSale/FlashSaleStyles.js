import { makeStyles } from '@material-ui/styles';

import flashImg from 'Assets/img/flash-sale.png';
import ethicalImg from 'Assets/img/ethical-main.png';

export const styles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0 auto',
    padding: 10,
    maxWidth: 1200,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 6),
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: (styleProps) =>
      `url(${
        styleProps.location.pathname.includes('flash')
          ? flashImg
          : ethicalImg
      })`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: 280,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 65,
  },
  spaceSection: {
    backgroundColor: '#e6e6e6',
    minHeight: 200,
    margin: '100px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  filter: {
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',

    '& h6': {
      marginLeft: 10,
    },
  },
}));
