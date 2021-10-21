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
