import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  nav: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexWrap: 'no-wrap',
    // overflowX: 'scroll',
    // maxWidth: 1000,
    // '& span': {
    //   minWidth: 'fit-content',
    // },
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
}));

export default useStyles;
