import React, { useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
// import {MapBox1 as MapBox} from './MapBox';
import $ from 'jquery';

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

const MondialRelay = () => {
  useEffect(() => {
    const jQuery = document.createElement('script');
    jQuery.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
    jQuery.async = 'true';

    document.body.appendChild(jQuery);

    return () => {
      document.body.removeChild(jQuery);
    };
  });

  useEffect(() => {
    const scriptMr = document.createElement('script');
    scriptMr.src =
      'https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js';
    scriptMr.async = 'true';

    document.body.appendChild(scriptMr);

    return () => {
      document.body.removeChild(scriptMr);
    };
  });

  const call = () => {
    try {
      $('#Zone_Widgeteqdavsfdc').MR_ParcelShopPicker({
        Target: '#ParcelShopCode',
        Brand: 'BDTEST  ',
        Country: 'FR',
      });
    } catch (err) {
      console.log(`err`, err);
    }
  };

  (function () {
    // Parameterized the widget
    try {
      call();
    } catch (err) {
      console.log(`err`, err);
    }
  })();

  return (
    <div>
      <Button variant='contained' onClick={call}>
        Call
      </Button>
      <div id='Zone_Widget'></div>
      <div id='ParcelShopCode'></div>
    </div>
  );
};

const RelayPointDialog = ({ open, closeDialog }) => {
  const classes = useStyles();

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
        Choose your relay point
        <Close
          style={{
            marginLeft: 'auto',
            cursor: 'pointer',
          }}
          onClick={closeDialog}
        />
      </DialogTitle>
      <DialogContent>
        <MondialRelay />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color='primary'>
          Close
        </Button>
        <Button color='primary' type='submit'>
          Modify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RelayPointDialog;
