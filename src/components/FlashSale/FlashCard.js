import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';

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
    justifyContent: 'space-between',
  },
  amountContent: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  DiscountPrice: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
    transform: 'scale(0.9)',
    opacity: 0.5,
    textDecoration: 'line-through solid red',
  },
  Price: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
  },
}));
const FlashCard = (props) => {
  const classes = styles();
  const { _id, title, service, description, price, image, history, discount } =
    props;

  const handleClick = () => {
    history.push(`/tours/details/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.cardMedia} image={image} title={title} />
        <CardContent className={classes.cardContent}>
          <section className={classes.content}>
            <section>
              <Typography variant='h5' component='h2'>
                {title.toUpperCase()}
              </Typography>
              <Typography
                variant='subtitle1'
                gutterBottom
                component='p'
                sx={{
                  wordBreak: 'break-word',
                  maxHeight: '50px',
                  width: '150px',
                }}
              >
                {description}
              </Typography>
              <Typography variant='subtitle2'>{service}</Typography>
            </section>
            <section className={classes.amountContent}>
              <Typography variant='h4' className={classes.DiscountPrice}>
                {price + (price * discount) / 100} $
              </Typography>
              <Typography variant='h4' className={classes.Price}>
                {price} $
              </Typography>
            </section>
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default withRouter(FlashCard);
