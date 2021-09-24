import React from 'react';
import {
   Card,
   CardContent,
   Typography,
   CardActions,
   CardMedia,
   Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      //   paddingInline: 2,
   },
   cardMedia: {
      paddingTop: '56.25%', // 16:9
   },
   cardContent: {
      flexGrow: 1,
   },
   cardTitle: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
      color: '#ffffff',
      fontSize: 35,
      fontWeight: 'bold',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      lineHeight: 'normal',
   },
}));

function CaourselCard({ title, desc, image }) {
   const classes = useStyles();
   return (
      <Card className={classes.card}>
         <CardMedia
            className={classes.cardMedia}
            image={image}
            title={desc}
         >
            <Typography className={classes.cardTitle}>
               {title}
            </Typography>
         </CardMedia>
         <CardContent className={classes.cardContent}>
            <Typography>{desc}</Typography>
         </CardContent>
      </Card>
   );
}

export default CaourselCard;
