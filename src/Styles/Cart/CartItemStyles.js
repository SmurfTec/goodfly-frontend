// import theme.breakpoints from '../../components/theme.breakpoints';
import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
  item: {
    padding: '1.25em 0',
    display: 'flex',
    alignItems: 'center',
    rowGap: theme.spacing(2),
    columnGap: theme.spacing(1),

    [theme.breakpoints.between('sm', 'md')]: {
      height: 'auto',
      justifyContent: 'start',
    },

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },

  description: {
    marginInline: theme.spacing(2),
    width: '35%',

    [theme.breakpoints.between('sm', 'md')]: {
      marginInline: theme.spacing(2),
    },
  },

  quantity: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    textAlign: 'center',
    alignItems: 'center',

    [theme.breakpoints.between('sm', 'md')]: {
      flexDirection: 'row',
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },

  totalPrice: {
    width: '15%',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  descriptionHeader: {
    width: '50%',
    paddingLeft: theme.spacing(7),
    [theme.breakpoints.between('sm', 'md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  quantityHeader: {
    width: '17%',
    textAlign: 'right',
    [theme.breakpoints.between('sm', 'md')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  priceHeader: {
    width: '14%',
    [theme.breakpoints.between('sm', 'md')]: {
      textAlign: 'right',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
