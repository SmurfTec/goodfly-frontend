import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'inline-block',
   },
}));

function Counter() {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <IconButton
            color='primary'
            aria-label='incrementd'
            component='span'
         >
            <AddIcon />
         </IconButton>
      </div>
   );
}

export default Counter;
