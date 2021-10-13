import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

const TripCard = (props) => {
  const classes = useStyles();

  const {
    _id,
    title,
    noOfJourneys,
    service,
    desc,
    price,
    image,
    history,
    country,
    startingDate,
    endingDate,
    boardType,
  } = props;

  const handleClick = () => {
    // console.log(`_id`, _id);
    history.push(`/tours/spiritual/${_id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title='Contemplative Reptile'
          onClick={handleClick}
        />
        <CardContent>
          <Box onClick={handleClick}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                gutterBottom
                variant='h5'
                component='h2'
                align='center'
                style={{ marginRight: 20 }}
              >
                {title}
              </Typography>
              <Typography
                gutterBottom
                variant='h5'
                component='h2'
                align='center'
                color='error'
              >
                {price}
              </Typography>
            </Box>
            <Typography
              color='textSecondary'
              align='center'
              variant='subtitle2'
              style={{ minWidth: 190 }}
            >
              {`from ${startingDate.toLocaleDateString()} to 
           ${endingDate.toLocaleDateString()}
            `}
            </Typography>
            <Typography
              color='textSecondary'
              variant='subtitle2'
              gutterBottom
              align='center'
            >
              {Math.ceil(
                Math.abs(endingDate - startingDate) /
                  1000 /
                  60 /
                  60 /
                  24
              )}
              {' Days '} {boardType}
            </Typography>
            <FavoriteIcon
              color='error'
              style={{ position: 'absolute', left: 10, top: 20 }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{ justifyContent: 'center', paddingBottom: 20 }}
      >
        <Button
          variant='contained'
          size='small'
          color='primary'
          style={{ borderRadius: 0, paddingInline: 30 }}
        >
          Find Out More
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(TripCard);
