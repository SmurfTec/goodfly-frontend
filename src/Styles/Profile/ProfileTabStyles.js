import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },

  hidden: {
    display: 'none',
  },

  content: {
    padding: '0.5rem',
    '&:last-child': {
      paddingBottom: '0.5rem',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  resConfig: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    rowGap: 15,
    height: '100%',
  },
  payDetailsGrid: {
    [theme.breakpoints.up('sm')]: {
      paddingInline: 20,
    },
  },
}));

export default styles;
