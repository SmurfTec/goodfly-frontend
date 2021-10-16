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
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  CustomRadioGroup,
  CustomInputField,
} from 'components/FormControls';
import { isMethod } from '@babel/types';
import TotalBill from './TotalBill';

const deliveryMethods = [
  {
    value: 'rpd1111',
    label: 'Relay point delivery',
    time: '24H',
    scheduledDelivery: 'Delivery scheduled for 11/16/2020',
    rate: '240€',
  },
  {
    value: 'hd1112',
    label: 'Home delivery by Collissimo',
    time: '24H',
    scheduledDelivery: 'Delivery scheduled for 11/16/2020',
    rate: '540€',
  },
  {
    value: 'pus1113',
    label: 'Pick up in store',
    time: '24H',
    scheduledDelivery: 'Order available 11/16/2020',
    rate: 'FREE',
  },
];

const relaypointContent = (handleClick, postalAddress) => {
  return (
    <Box sx={{ mt: 4, mb: 2, display: 'flex', flexWrap: 'nowrap' }}>
      <Typography variant='subtitle1' sx={{ maxWidth: 250, mx: 1 }}>
        {postalAddress}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        sx={{ minWidth: 90 }}
        onClick={handleClick}
      >
        Modify
      </Button>
    </Box>
  );
};
const addressContent = (control, isAddressDiff, formProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant='subtitle1'
        color='textSecondary'
        sx={{ mb: 1 }}
      >
        Billing Address
      </Typography>
      <CustomRadioGroup
        name='billingaddress'
        control={control}
        options={[
          {
            label: 'Identical to the delivery address',
            value: 'identical',
          },
          {
            label: 'Use a different billing address',
            value: 'different',
          },
        ]}
      />

      {isAddressDiff === 'different' && (
        <Box
          sx={{
            mt: 3,
            '& p': {
              display: 'none',
            },
          }}
        >
          <CustomInputField
            name='newBillingAddress'
            label='Billing Address'
            type='text'
            register={formProps?.register}
            errors={formProps?.errors}
            errorMessage='Specify another billing address'
            placeholder='New Billing Address'
          />
        </Box>
      )}
    </Box>
  );
};

const Step2 = ({ validateStep2 }) => {
  const { handleSubmit, control, watch, register, errors } =
    useForm();
  const [dialog, setDialog] = React.useState(false);
  const [postalAddress, setpostalAddress] = React.useState(
    'Lyon Librairie la bonne paye 50 rue delabarre 69008'
  );
  const watchDeliveryMethod = watch(
    'deliveryMethod',
    deliveryMethods[0].value
  );
  const watchBillingAddress = watch('billingaddress');

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
    validateStep2(data);
  };
  return (
    <>
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant='subtitle1' color='textSecondary'>
            Choose the delivery method
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
            <form
              id='formDelivery'
              onSubmit={handleSubmit(travellersForm)}
            >
              <Controller
                name='deliveryMethod'
                control={control}
                defaultValue={deliveryMethods[0].value}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    {deliveryMethods.map((singleOption, i) => {
                      return (
                        <>
                          <Grid
                            container
                            spacing={2}
                            key={singleOption.value}
                          >
                            <Grid item xs={12} sm={4}>
                              <Box
                                sx={{
                                  '& span': {
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold',
                                    color: '#666666',
                                  },
                                }}
                              >
                                <FormControlLabel
                                  key={singleOption.value}
                                  value={`${singleOption.value}`}
                                  label={singleOption.label}
                                  control={<Radio />}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography
                                variant='subtitle2'
                                color='textSecondary'
                              >
                                {singleOption.time}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography
                                variant='subtitle2'
                                color='textSecondary'
                              >
                                {singleOption.scheduledDelivery}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant='subtitle1'>
                                {singleOption.rate}
                              </Typography>
                            </Grid>
                          </Grid>
                          {watchDeliveryMethod ===
                            deliveryMethods[0].value &&
                            singleOption.value ===
                              deliveryMethods[0].value && (
                              <>
                                {relaypointContent(
                                  handleDialogOpen,
                                  postalAddress
                                )}
                                <Divider
                                  sx={{ my: 2, width: '100%' }}
                                />
                              </>
                            )}
                          {watchDeliveryMethod ===
                            singleOption.value &&
                            watchDeliveryMethod !==
                              deliveryMethods[2].value && (
                              <Box sx={{ mt: 2 }}>
                                {addressContent(
                                  control,
                                  watchBillingAddress,
                                  { register, errors }
                                )}
                              </Box>
                            )}
                          {i < deliveryMethods.length - 1 && (
                            <Divider sx={{ my: 3, width: '100%' }} />
                          )}
                        </>
                      );
                    })}
                  </RadioGroup>
                )}
              />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} sx={{ mt: -9 }}>
          <TotalBill formName='formDelivery' />
        </Grid>
      </Grid>

      <Dialog
        fullWidth='true'
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

export default Step2;
