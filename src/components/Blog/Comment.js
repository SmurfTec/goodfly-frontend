import { Paper, Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';

const styles = makeStyles((theme) => ({
  root: {
    border: '2px solid #CCCC',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  gridDate: {
    display: 'flex',
    height: '100%',
    alignItems: 'end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  avatarBox: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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
              src={comment.user.photo}
              className={classes.large}
            />
            <Typography
              variant='subtitle1'
              color='text.secondary'
              sx={{ mt: 1 }}
            >
              NewDesign
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
        <Grid item xs={12} sm={12}>
          <Typography
            variant='body1'
            color='text.primary'
            sx={{ mt: 3 }}
          >
            {comment.text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
