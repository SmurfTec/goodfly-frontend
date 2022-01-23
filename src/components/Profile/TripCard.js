import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderTopLeftRadius: 0,
  },
  media: {
    height: 240,
  },
});

const TripCard = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    noOfJourneys,

    history,
    country,
    departureDate,
    returnDate,

    trip,
  } = props;

  const { _id, title, service, desc, price, image, boardType } = trip;

  const handleClick = () => {
    // console.log(`_id`, _id);
    history.push(`/tours/details/${_id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
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
                {price} €
              </Typography>
            </Box>
            <Typography
              color='textSecondary'
              align='center'
              variant='subtitle2'
              style={{ minWidth: 190 }}
            >
              {`${t('from')} ${new Date(
                departureDate
              ).toLocaleDateString()} ${t('to')} 
           ${new Date(returnDate).toLocaleDateString()}
            `}
            </Typography>
            <Typography
              color='textSecondary'
              variant='subtitle2'
              gutterBottom
              align='center'
            >
              {/* {new Date(returnDate) - new Date(departureDate)} */}
              {boardType?.toUpperCase()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(TripCard);
