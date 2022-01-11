import React, { useEffect, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import FavoriteIconOutlined from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router';
import { AuthContext } from 'Contexts/AuthContext';
import { ToursContext } from 'Contexts/ToursContext';
import { useTranslation } from 'react-i18next';

const styles = makeStyles((theme) => ({
  card: {
    //  height: '100%',
    //  height: 250,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 0,
    position: 'relative',

    '& .MuiCardActionArea-root': { minHeight: 250 },
  },
  cardMedia: {
    height: '100%',
    paddingTop: '100%',
    opacity: 0.7,
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
  cardoverlay: {
    bottom: 20,
    left: '50%',
    color: '#fff',
    position: 'absolute',
    backgroundColor: 'transparent',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  favIcon: {
    top: 10,
    left: 15,
    position: 'absolute',
  },
}));
const TripCard = (props) => {
  const classes = styles();

  const { user } = useContext(AuthContext);
  const { favouriteTrip, unFavouriteTrip } = useContext(ToursContext);
  const { t } = useTranslation();

  const {
    _id,
    country,
    title,
    price,
    image,
    startingDate,
    endingDate,
    boardType,
    history,
    location,
  } = props;

  const handleFavorite = (e) => {
    // e.preventDefault();

    e.stopPropagation();

    //  * If User NOT Logged In , goto Login Page
    if (!user) history.push(`/auth/login?redirect=${location.pathname}`);
    favouriteTrip(_id, () => {});
  };

  const handleUnFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    //  * If User NOT Logged In , goto Login Page
    if (!user) history.push(`/auth/login?redirect=${location.pathname}}`);
    else unFavouriteTrip(_id, () => {});
  };

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    // // if (!user?.favourities || user?.favourities.length === 0) {
    // //   setIsFavourite(false);
    // //   return;
    // // }
    // // * If User if NOT Logged In , log him in
    // if(!user) {
    //   setIsFavourite(false)
    // }

    if (!!user?.favourities?.find((el) => el._id === _id)) setIsFavourite(true);
    else setIsFavourite(false);
  }, [user, _id]);

  const handleClick = () => {
    history.push(`/tours/details/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={image} title={title} />

      <div className={classes.cardoverlay}>
        {/* this text should overlay the image */}
        <Typography variant='h4' component='h2'>
          {title.toUpperCase()}
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
          {t('Starting From')} {price} €
        </Typography>

        <Typography variant='subtitle2' style={{ minWidth: 190 }}>
          {startingDate
            ? `from ${new Date(startingDate).toLocaleDateString()} to 
           ${new Date(endingDate).toLocaleDateString()}
            `
            : t('Open Offer')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
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
        <Button
          variant='contained'
          onClick={handleClick}
          style={{
            backgroundColor: '#fff',
            color: '#000',
            width: 200,
          }}
          size='small'
        >
          {t('Discover')}
        </Button>
      </div>

      <div className={classes.favIcon}>
        {isFavourite ? (
          <FavoriteIconFilled
            style={{
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={handleUnFavorite}
          />
        ) : (
          <FavoriteIconOutlined
            style={{
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={handleFavorite}
          />
        )}
      </div>
    </Card>
  );
};
export default withRouter(TripCard);
