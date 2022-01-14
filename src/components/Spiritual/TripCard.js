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

import Rating from '@material-ui/lab/Rating';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder';
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

const TripCard = ({ tour, history }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    _id,
    title,
    noOfJourneys,
    service,
    desc,
    price,
    image,
    country,
    startingDate,
    endingDate,
    boardType,
    ratings,
  } = tour;

  const handleClick = () => {
    // console.log(`_id`, _id);
    history.push(`/tours/details/${_id}`);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title={title} />
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
            {startingDate
              ? `${t('from')} ${new Date(
                  startingDate
                ).toLocaleDateString()} ${t('to')} 
           ${new Date(endingDate).toLocaleDateString()}
            `
              : t('Open Offer')}
          </Typography>
          <Typography
            color='textSecondary'
            variant='subtitle2'
            gutterBottom
            align='center'
          >
            {startingDate && (
              <>
                {Math.ceil(
                  Math.abs(new Date(endingDate) - new Date(startingDate)) /
                    1000 /
                    60 /
                    60 /
                    24
                )}
                {` ${t('days')} `}
              </>
            )}{' '}
            {boardType}
          </Typography>
          <Rating
            name='read-only'
            value={ratings}
            readOnly
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            size='small'
          />
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'center', paddingBottom: 20 }}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          style={{ borderRadius: 0, paddingInline: 30 }}
          onClick={handleClick}
        >
          {t('Find Out More')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(TripCard);
