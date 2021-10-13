import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  root: {
    border: '2px solid #CCCC',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  gridDate: {
    display: 'flex',
    height: '100%',
    alignItems: 'end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default styles;
