import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from 'Styles/Blog';
import { withRouter } from 'react-router-dom';

const ProductCard = ({ product, history }) => {
  const classes = styles();
  const { images, price, _id, name, category } = product;

  const handleClick = () => {
    history.push(`/store/product/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          sx={{ height: 250, position: 'relative' }}
          image={images?.[0]?.image}
          title={name}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& h3,h4,h5,h6': {
              textTransform: 'capitalize',
            },
          }}
        >
          <Typography gutterBottom variant='h5' color='text.secondary'>
            {name}
          </Typography>
          <Typography gutterBottom variant='subtitle1' sx={{ fontWeight: 900 }}>
            {price} €
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {category && category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(ProductCard);
