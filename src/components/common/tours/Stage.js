import React, { useState, useEffect } from 'react';
// $ MUI Stuff *//
import {
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Skeleton,
} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { makeStyles } from '@material-ui/styles';
import Lightbox from 'react-image-lightbox';
import UseToggle from 'Hooks/useToggle';

const useStyles = makeStyles((theme) => ({
  root: {
    '& img': {
      cursor: 'pointer',
    },
  },
}));

const Stage = ({ stage, idx }) => {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const [photoIndex, setphotoIndex] = useState(0);
  const [isOpen, toggleOpen] = UseToggle(false);

  useEffect(() => {
    if (!stage) return;

    let stageImages = stage.images;
    if (stage.accomodation?.images?.length > 0)
      stageImages = [...stageImages, ...stage.accomodation.images];
    setImages(stageImages);
  }, [stage]);

  return (
    <React.Fragment key={stage._id}>
      <Grid container className={classes.root}>
        <Grid item sm={3} lg={2}>
          <img
            onClick={toggleOpen}
            style={{ width: '100%' }}
            src={stage?.images[0]?.src}
            alt='data'
          />
          <Box
            style={{
              width: 190,
              marginTop: '1rem',
              flexWrap: 'wrap',
            }}
            display='flex'
            justifyContent='space-between'
          >
            {stage.images.slice(1, stage.images.length).map((el) => (
              <img
                onClick={toggleOpen}
                key={el._id}
                src={el?.src}
                style={{
                  marginBottom: 10,
                  cursor: 'pointer',
                  width: 88,
                }}
                alt='data'
              />
            ))}
            {stage?.accomodation?.images?.map((el) => (
              <img
                onClick={toggleOpen}
                key={el._id}
                src={el?.src}
                style={{
                  marginBottom: 10,
                  cursor: 'pointer',
                  width: 88,
                }}
                alt='data'
              />
            ))}
          </Box>
        </Grid>
        <Grid item sm={2} lg={1}></Grid>
        <Grid item sm={7} lg={9}>
          <Typography variant='h5' textAlign='left' gutterBottom>
            {`Stage : ${idx + 1} ${stage.location}`}
          </Typography>
          <Typography variant='h6' textAlign='left' fontWeight='normal'>
            {stage.description}
          </Typography>
          <List>
            {stage?.accommodations?.map((el) => (
              <ListItem key={el._id}>
                <ListItemAvatar>
                  <Avatar>
                    <EmojiObjectsIcon />
                    {/* <LocalDiningIcon /> */}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={el.location}
                  secondary={el.description}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
      <Box marginTop={2} />
      <Divider />
      <Box marginBottom={2} />

      {isOpen && images.length > 0 && (
        <Lightbox
          mainSrc={images[photoIndex]?.src}
          // mainSrc={images[0]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={toggleOpen}
          onMovePrevRequest={() =>
            setphotoIndex((st) => (st + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setphotoIndex((st) => (st + 1) % images.length)
          }
        />
      )}
    </React.Fragment>
  );
};

export default Stage;
