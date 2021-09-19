import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
   root: {
      padding: 15,
      maxWidth: 250,
      backgroundColor: '#46b9f6',
      position: 'absolute',
      right: 70,
      bottom: '-60px',
      borderRadius: 10,
      textAlign: 'center',
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
