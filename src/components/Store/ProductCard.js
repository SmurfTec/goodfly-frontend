import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from 'Styles/Blog';

const ProductCard = (props) => {
  const classes = styles();
  const { handleClick, product } = props;
  const { images, price, _id, name, category } = product;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick} data-productId={_id}>
        <CardMedia
          sx={{ height: 250, position: 'relative' }}
          image={images[0]}
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
          <Typography
            gutterBottom
            variant='h5'
            color='text.secondary'
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant='subtitle1'
            sx={{ fontWeight: 900 }}
          >
            {price}€
          </Typography>
          <Typography variant='subtitle1' color='text.secondary'>
            {category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;