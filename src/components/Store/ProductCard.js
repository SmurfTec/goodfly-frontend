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
import { withRouter } from 'react-router';

const styles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    borderRadius: 'unset',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  amountContent: {
    flex: 'none',
  },
}));

const ProductCard = ({ product, history }) => {
  const classes = styles();
  const {
    _id,
    name,
    description,
    price,
    category,
    rating,
    images,
    region,
  } = product;

  const handleClick = () => {
    history.push(`/store/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          className={classes.cardMedia}
          image={images[0]}
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <section className={classes.content}>
            <Typography
              variant='h5'
              color='textSecondary'
              component='h2'
            >
              {name.toUpperCase()}
            </Typography>
            <Typography variant='h4' gutterBottom>
              {price}
            </Typography>
            <Typography
              variant='h6'
              color='textSecondary'
              fontWeight='bold'
            >
              {region}
            </Typography>
          </section>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default withRouter(ProductCard);
