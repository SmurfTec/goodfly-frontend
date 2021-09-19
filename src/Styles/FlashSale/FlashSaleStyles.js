import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
   root: {
      width: '90%',
      margin: '0 auto',
      padding: 10,
      maxWidth: 1200,
   },
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
   },
   cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
   },
   mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: 230,
      borderRadius: 15,
   },
   overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
   },
   mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
         padding: theme.spacing(6),
         paddingRight: 0,
      },
   },
   title: {
      position: 'absolute',
      bottom: 20,
      left: 65,
   },
   spaceSection: {
      backgroundColor: '#e6e6e6',
      minHeight: 200,
      margin: '100px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
   },
   filter: {
      paddingLeft: 20,
      display: 'flex',
      alignItems: 'center',

      '& h6': {
         marginLeft: 10,
      },
   },
}));
