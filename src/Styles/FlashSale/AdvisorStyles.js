import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    padding: 15,
    maxWidth: 250,
    backgroundColor: '#46b9f6',
    position: 'absolute',
    right: 20,
    bottom: '-60px',
    borderRadius: 10,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    border: '1px solid #fff',
    padding: 10,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
}));
