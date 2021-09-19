import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f2f2f2',
   },
   cardMedia: {
      paddingTop: '56.25%', // 16:9
   },
   cardContent: {
      flexGrow: 1,
   },
   content: {
      display: 'flex',
      flexDirection: 'row',
   },
   amountContent: {
      flex: 'none',
   },
}));
function FlashCard(props) {
   const classes = styles();
   const { title, noOfJourneys, service, desc, price, image } = props;
   return (
      <Card className={classes.card}>
         <CardActionArea>
            <CardMedia
               className={classes.cardMedia}
               image={image}
               title={title}
            />
            <CardContent className={classes.cardContent}>
               <section className={classes.content}>
                  <section>
                     <Typography variant='h5' component='h2'>
                        {title}
                     </Typography>
                     <Typography variant='subtitle1' gutterBottom>
                        {desc}
                     </Typography>
                     <Typography variant='subtitle2'>
                        {service}
                     </Typography>
                  </section>
                  <section className={classes.amountContent}>
                     <Typography
                        variant='h4'
                        sx={{ backgroundColor: '#fff', padding: 1.2 }}
                     >
                        {price}
                     </Typography>
                  </section>
               </section>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}

export default FlashCard;
