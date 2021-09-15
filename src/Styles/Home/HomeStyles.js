import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
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
  MainGrid: {},
  LeftGridItem: {
    border: '1px solid #ccc',
    paddingInline: 20,
  },
  RightGridItem: {
    paddingInline: 20,
    border: '1px solid #ccc',
  },
}));

export default useStyles;
