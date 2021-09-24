import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
   card: {
      //  height: '100%',
      //  height: 250,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',

      '& .MuiCardActionArea-root': { minHeight: 250 },
   },
   media: {
      height: '100%',
      paddingTop: '100%',
   },

   root: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      //   marginBottom: theme.spacing(4),
      backgroundImage: (props) => `url(${props.imageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: 245,
      borderRadius: 15,
      borderTopLeftRadius: 0,
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      [theme.breakpoints.down('sm')]: {
         minHeight: 180,
      },
   },
   title: {
      position: 'absolute',
      bottom: 20,
      left: 25,
   },
}));

export default function MediaCard(props) {
   const { title } = props;
   const classes = useStyles(props);

   return (
      <Container className={classes.root}>
         <section className={classes.title}>
            <Typography variant='h2'>{title}</Typography>
         </section>
      </Container>
   );
}
