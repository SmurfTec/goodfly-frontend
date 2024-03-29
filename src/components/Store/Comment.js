import { Paper, Avatar, Grid, Typography, Rating } from '@material-ui/core';
import React from 'react';
import { Box } from '@material-ui/system';
import styles from 'Styles/Comment';

const Comment = (props) => {
  const classes = styles();
  console.log(props);
  const { visitor, createdAt, comment, rating, reply } = props;

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
              src={visitor?.photo}
              className={classes.large}
            />
            <Typography
              variant='subtitle1'
              color='text.secondary'
              sx={{ mt: 1 }}
            >
              {visitor?.fullName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'end',
            }}
          >
            <Rating size='small' value={rating * 1 || 5} readOnly />
            <Box sx={{ mt: 1 }} />
            <Typography variant='body1' color='text.secondary'>
              {new Date(createdAt).toDateString()}
            </Typography>
            {/* <CustomRating
              name='commentRating'
              control={control}
              options={[0, 1, 2, 3, 4, 5]}
            /> */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant='body1' color='text.primary' sx={{ mt: 3 }}>
            {comment}
          </Typography>
          {reply && (
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
              {reply}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
