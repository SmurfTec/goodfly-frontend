import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Grid,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

import { CustomRadioGroup, CustomInputField } from 'components/FormControls';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
// import {MapBox1 as MapBox} from './MapBox';
import { MapBox2 as MapBox } from './MapBox';

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

const RelayPointDialog = ({ open, closeDialog }) => {
  const classes = useStyles();

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm();

  const submitFormData = (data) => {
    // console.log('Form Data :', data);
  };

  const validatePostalCode = () => {};
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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5} className={classes.LeftSection}>
            <form onSubmit={handleSubmit((data) => submitFormData(data))}>
              <Box className={classes.postalCodeBox}>
                <FormControl
                  error={Boolean(errors.postalCode)}
                  sx={{ border: '1px solid #ccc' }}
                >
                  <input
                    className={classes.textInput}
                    type='text'
                    {...register('postalCode', {
                      required: true,
                      maxLength: 10,
                      minLength: 5,
                    })}
                    placeholder='Postal Code'
                  />
                  {errors.postalCode && (
                    <FormHelperText>Postal Code</FormHelperText>
                  )}
                </FormControl>
                <Button variant='contained' color='primary' type='submit'>
                  Validate
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MapBox />
          </Grid>
        </Grid>
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
