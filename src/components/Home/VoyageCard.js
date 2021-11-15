import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: 'none',
  },
  media: {
    height: 250,
    position: 'relative',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

const VoyageCard = ({ image, title, url }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(url);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={image} title={title}>
          <span className={classes.overlay} />
          <Typography variant='h3' className={classes.title} align='center'>
            {title}
            <br />
            <ArrowDownIcon fontSize='large' />
          </Typography>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default VoyageCard;
