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
  Skeleton,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Stage from './Stage';

const StagesTab = ({ stages }) => {
  return (
    <>
      {stages
        ? stages.map((stage, idx) => <Stage stage={stage} idx={idx} />)
        : [12332, 232, 23313, 423].map((el, idx) => (
            <React.Fragment key={el}>
              <Grid container>
                <Grid item sm={3} lg={2}>
                  <Skeleton variant='circle' />
                  <Box
                    style={{
                      width: 190,
                      marginTop: '1rem',
                      flexWrap: 'wrap',
                    }}
                    display='flex'
                    justifyContent='space-between'
                  >
                    {[1, 2, 3, 4].map((el) => (
                      <Skeleton variant='circle' />
                    ))}
                  </Box>
                </Grid>
                <Grid item sm={2} lg={1}></Grid>
                <Grid item sm={7} lg={9}>
                  <Typography variant='h5' textAlign='left' gutterBottom>
                    <Skeleton variant='text' />
                  </Typography>
                  <Typography variant='h6' textAlign='left' fontWeight='normal'>
                    <Skeleton variant='text' />
                  </Typography>
                  <List>
                    {[1123, 2312].map((el) => (
                      <ListItem key={el}>
                        <ListItemAvatar>
                          <Avatar>
                            {/* <EmojiObjectsIcon /> */}
                            <Skeleton variant='circle' />

                            {/* <LocalDiningIcon /> */}
                          </Avatar>
                        </ListItemAvatar>
                        <Skeleton variant='text' width='70%' />
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
