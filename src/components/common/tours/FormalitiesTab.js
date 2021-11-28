import React from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
import parse from 'html-react-parser';
import { Typography } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({}));

const FormalitiesTab = ({ formality }) => {
  // const classes = useStyles();

  return (
    <Box px={4}>
      <Typography variant='h3' sx={{ marginBottom: '20px' }}>
        {formality.title}
      </Typography>
      {formality ? parse(formality.content.toString()) : ''}
    </Box>
  );
};

export default FormalitiesTab;
