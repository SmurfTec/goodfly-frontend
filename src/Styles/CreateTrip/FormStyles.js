import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
   textInput: {
      width: '100%',
      padding: '9px 20px',
      textAlign: 'left',
      border: 0,
      outline: 0,
      borderRadius: 6,
      backgroundColor: '#fff',
      fontSize: 15,
      fontWeight: 300,
      color: '#8D8D8D',
      WebkitTransition: 'all 0.3s ease',
      transition: 'all 0.3s ease',
   },
   paper: {
      //   backgroundColor: '#f2f2f2',
      backgroundColor: theme.palette.grey[200],
      fontStyle: 'italic',
      marginTop: theme.spacing(7),
      paddingBlock: theme.spacing(7),
      //   px: 15,
      //   py: 7,
      //   mt: 7,

      [theme.breakpoints.up('md')]: {
         paddingInline: theme.spacing(14),
      },

      [theme.breakpoints.between('sm', 'md')]: {
         paddingInline: theme.spacing(4),
      },

      [theme.breakpoints.down('sm')]: {
         paddingInline: theme.spacing(2),
      },
   },
}));
