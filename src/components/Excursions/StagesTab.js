import React from 'react';

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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

// $ ------------------ //
import Lightbox from 'react-image-lightbox';

const useStyles = makeStyles((theme) => ({}));

const StagesTab = ({ stages }) => {
  const classes = useStyles();

  return (
    <>
      {stages.map((stage, idx) => (
        <React.Fragment key={stage._id}>
          <Grid container>
            <Grid item sm={3} md={2}>
              <img
                src={stage?.images[0]}
                alt=''
                style={{ width: 210 }}
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
                {stage.images
                  .slice(1, stage.images.length)
                  .map((el, idx) => (
                    <img
                      key={idx}
                      src={el}
                      style={{ marginBottom: 10, width: 88 }}
                    />
                  ))}
              </Box>
            </Grid>
            <Grid item sm={1} md={1}></Grid>
            <Grid item sm={8} md={9}>
              <Typography variant='h5' textAlign='left' gutterBottom>
                {`${stage.date} Day : ${idx} ${stage.locatation}`}
              </Typography>
              <Typography
                variant='h6'
                textAlign='left'
                fontWeight='normal'
              >
                {stage.description}
              </Typography>
              <List>
                {stage.accommodations.map((el) => (
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
        </React.Fragment>
      ))}
    </>
  );
};

export default StagesTab;
