import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    '&.MuiContainer-root': {
      [theme.breakpoints.up('sm')]: {
        // paddingLeft: 47,
        // paddingRight: 60,
        paddingInline: '5vw',
        /* max-width: 1052px; */
        width: '87vw',
        paddingInline: 'unset',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 'unset',
      },
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(6),
  },
  mainFeaturedPost: {
    position: 'relative',
    //   backgroundColor: theme.palette.grey[800],
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: (props) => `url(${props.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: (props) => props.align,
    minHeight: 280,
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    },
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 65,
    textShadow: '0px 0px 5px rgba(0,0,0,0.38)',
    textTransform: 'uppercase',
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
}));

export const GlobalClassesContext = React.createContext();

export const GlobalClassesProvider = ({ children, history }) => {
  const globalClasses = useStyles();

  return (
    <GlobalClassesContext.Provider
      displayName='Global Classes Context'
      value={{
        globalClasses,
      }}
    >
      {children}
    </GlobalClassesContext.Provider>
  );
};
