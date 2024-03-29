import { Paper, Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Box } from '@material-ui/system';
import styles from 'Styles/Comment';

import commentImg from 'Assets/blogcomment.png';

const Comment = ({ comment }) => {
  const classes = styles();
  return (
    <Paper
      elevation={0}
      sx={{ border: '2px solid #CCCC', display: 'flex', p: 3, my: 3 }}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3}>
          <Box className={classes.avatarBox}>
            <Avatar
              alt='Remy Sharp'
              src={
                comment.user?.photo ||
                `https://ui-avatars.com/api/?rounded=true&name=${comment?.user?.fullName
                  .split(' ')
                  .join('+')}`
              }
              className={classes.large}
            />
            <Typography
              variant='subtitle1'
              color='text.secondary'
              sx={{ mt: 1 }}
            >
              {comment.user?.fullName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box className={classes.gridDate}>
            <Box />
            <Typography variant='body1' color='text.secondary'>
              {new Date(comment.createdAt).toDateString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
          <Typography color='text.primary' sx={{ mt: 3 }}>
            {comment.text}
          </Typography>
          {comment.reply && (
            <Typography
              variant='body2'
              color='text.primary'
              sx={{
                mt: 3,
                borderLeft: '2px solid #ccc',
                marginLeft: '1rem',
                fontStyle: 'italic',
                paddingLeft: '1rem',
              }}
            >
              {comment.reply}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
