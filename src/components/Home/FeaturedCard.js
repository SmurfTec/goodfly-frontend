import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme, props) => ({
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
      backgroundImage: (props) => `url(${props.image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: 245,
      borderRadius: 15,
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
   //    const { mainHeading, price, desc } = props;
   const { mainHeading } = props;
   const classes = useStyles(props);

   return (
      <Container className={classes.root}>
         <section className={classes.title}>
            <Typography variant='h4'>{mainHeading}</Typography>
         </section>
      </Container>
   );
}
