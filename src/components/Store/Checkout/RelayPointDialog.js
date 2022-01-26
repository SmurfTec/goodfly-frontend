import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
// import {MapBox1 as MapBox} from './MapBox';
import { useTranslation } from 'react-i18next';
import MondialRelay from './MondialRelay';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: '#f2f2f2',
    },
  },
  textInput: {
    width: '100%',
    padding: '9px 20px',
    textAlign: 'left',
    border: '1px solid #ccc',

    outline: 0,
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 300,
    color: '#000',
    WebkitTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  },
  postalCodeBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  LeftSection: {
    backgroundColor: '#fff',
    padding: 15,
  },
}));

const RelayPointDialog = ({ open, closeDialog, handleSubmit }) => {
  const classes = useStyles();
  const [relayPoint, setRelayPoint] = useState();

  const handleChange = (data) => {
    setRelayPoint(data);
  };

  const handleModify = () => {
    handleSubmit(relayPoint);
  };
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      // maxWidth='sm'
      open={open}
      onClose={closeDialog}
      aria-labelledby='form-dialog-title'
      className={classes.root}
    >
      <DialogTitle sx={{ display: 'flex' }}>
        {t('Choose your relay point')}
        <Close
          style={{
            marginLeft: 'auto',
            cursor: 'pointer',
          }}
          onClick={closeDialog}
        />
      </DialogTitle>
      <DialogContent>
        <MondialRelay handleChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color='primary'>
          {t('Close')}
        </Button>
        <Button
          disabled={!relayPoint}
          color='primary'
          onClick={handleModify}
          type='submit'
        >
          {t('Modify')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RelayPointDialog;
