import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomRadioGroup, CustomInputField } from 'components/FormControls';
import { isMethod } from '@babel/types';
import TotalBill from './TotalBill';
import BankCardOption from './paymentStep/paymentOptions/BankCardOption';
import BankTransferOption from './paymentStep/paymentOptions/BankTransferOption';
import PaypalOption from './paymentStep/paymentOptions/PaypalOption';
import LoyaltyPointsOption from './paymentStep/paymentOptions/LoyaltyPoints';

const Step3 = ({ validateStep, cart }) => {
  const { handleSubmit, control, watch, register, errors } = useForm();
  const [dialog, setDialog] = React.useState(false);

  const values = ['card', 'bank', 'paypal', 'points'];

  const bankCardInitial = {
    cardNumber: '',
    cardexpires: '',
    cardNumber: '',
  };
  const [bankCardDetails, setBankCardDetails] = useState(bankCardInitial);
  const [postalAddress, setpostalAddress] = React.useState(
    'Lyon Librairie la bonne paye 50 rue delabarre 69008'
  );
  const watchPaymentOptions = watch('paymentMethod');

  const handleDialogOpen = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const postalCodeValidate = (data) => {
    handleDialogClose();
    setpostalAddress(data?.postalAddress);
  };

  const travellersForm = (data) => {
    validateStep(data);
  };

  return (
    <>
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant='subtitle1' color='textSecondary'>
            Choose the payment method
          </Typography>

          <Paper
            sx={{
              mt: 3,
              px: 3,
              py: 5,
              backgroundColor: '#fafafa',
              mb: 4,
            }}
          >
            <form id='formDelivery' onSubmit={handleSubmit(travellersForm)}>
              <Controller
                name='paymentMethod'
                control={control}
                defaultValue={values[0]}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <BankCardOption
                      value={values[0]}
                      currentValue={watchPaymentOptions}
                    />
                    <BankTransferOption value={values[1]} />
                    <PaypalOption value={values[2]} />
                    <LoyaltyPointsOption value={values[3]} />

                    <Divider sx={{ my: 3, width: '100%' }} />
                  </RadioGroup>
                )}
              />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} sx={{ mt: -9 }}>
          <TotalBill
            formName='formDelivery'
            cart={cart}
            paymentOption={watchPaymentOptions}
          />
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth='md'
        // maxWidth='sm'
        open={dialog}
        onClose={handleDialogClose}
        aria-labelledby='form-dialog-title'
        sx={{
          '& form': {
            backgroundColor: '#f2f2f2',
          },
        }}
      >
        <form onSubmit={handleSubmit(postalCodeValidate)}>
          <DialogContent>
            <DialogContentText>
              Enter your postal code to find a relay point near you
            </DialogContentText>

            <Box
              sx={{
                mt: 3,
                '& p': {
                  display: 'none',
                },
              }}
            >
              <CustomInputField
                name='postalCode'
                label='Postal code'
                type='number'
                register={register}
                errors={errors}
                errorMessage='Specify the postal code'
                placeholder='Postal Code'
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color='primary'>
              Close
            </Button>
            <Button color='primary' type='submit'>
              Modify
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Step3;
