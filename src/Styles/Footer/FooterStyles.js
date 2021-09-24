import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
   footer: {
      marginTop: theme.spacing(5),
      backgroundColor: '#333333',
      padding: theme.spacing(4, 4, 0),
      userSelect: 'none',
   },
   logoTitle: {
      cursor: 'pointer',
      userSelect: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      //   width: 150,
      width: 130,
      fontWeight: 900,

      '& img': {
         width: 50,
         height: 50,
      },
   },
   gridContent: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      color: theme.palette.grey[300],
   },

   contentTitle: {
      marginBottom: theme.spacing(2),
      color: theme.palette.grey[400],
      textTransform: 'uppercase',
   },
   subContent: {
      padding: '3px 0',
      '& a': {
         color: theme.palette.common.white,
         '&:hover': {
            color: '#fa0f0c',
         },
      },

      '& svg': {
         color: theme.palette.common.white,
         marginRight: theme.spacing(1.5),
         fontSize: '1rem',
      },
   },
   icons: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
   },
   rightsReservedFooter: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.grey[100],
   },
}));
