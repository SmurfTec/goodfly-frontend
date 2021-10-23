import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  MainContainer: {
    '&.MuiContainer-root': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 47,
        paddingRight: 60,
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
