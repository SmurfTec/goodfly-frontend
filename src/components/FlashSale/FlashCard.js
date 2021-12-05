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
    padding: 15,
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
  expireDate: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#FE7D6D',
    padding: 7,
    fontSize: 16,
    /* font-weight: bold; */
    borderBottomRightRadius: 12,
    color: '#fff',
  },
  discountSpan: {
    position: 'absolute',
    top: 0,
    right: 0,
    background: '#18D680',
    padding: 7,
    fontSize: 16,
    color: '#fff',
    borderBottomLeftRadius: 12,
  },
}));
const FlashCard = (props) => {
  const classes = styles();
  const {
    _id,
    title,
    service,
    description,
    price,
    image,
    history,
    discount,
    saleExpires,
  } = props;

  const handleClick = () => {
    history.push(`/tours/details/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.cardMedia} image={image} title={title} />
        <CardContent className={classes.cardContent}>
          <span className={classes.discountSpan}> {discount}% Off</span>
          <span className={classes.expireDate}>
            till {new Date(saleExpires).toLocaleDateString()}
          </span>
          <section className={classes.content}>
            <section
              style={{
                flexBasis: '60%',
                flexGrow: 1,
              }}
            >
              <Typography variant='h5' component='h2'>
                {title.toUpperCase()}
              </Typography>
              <Typography
                variant='subtitle1'
                gutterBottom
                component='p'
                sx={{
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
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
