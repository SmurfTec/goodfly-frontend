import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 15,
      backgroundColor: theme.palette.background.paper,
      '& .MuiTabs-flexContainer': {
         // justifyContent: 'space-around',
         '& .MuiTab-root': {
            minWidth: 100,
            flexGrow: 1,
         },
      },
      '& .MuiTabs-indicator': {
         backgroundColor: 'unset',
      },
      '& .Mui-selected': {
         backgroundColor: theme.palette.dark,
         color: '#fff',
      },
      '& .MuiTab-wrapper': {
         textTransform: 'capitalize',
      },
   },
   TabPanel: {
      backgroundColor: theme.palette.dark,
      color: '#fff',
      height: '90%',
   },
}));

export default useStyles;
