import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Divider,
  Button,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import { useForm, Controller } from 'react-hook-form';
import { CustomRadioGroup, CustomInputField } from 'components/FormControls';
import TotalBill from './TotalBill';
import useToggle from 'Hooks/useToggle';
import RelayPointDialog from './RelayPointDialog';
import { useTranslation } from 'react-i18next';

const deliveryMethods = [
  {
    value: 'relay-point',
    label: 'Relay point delivery',
    time: '24H',
    scheduledDelivery: 'Delivery scheduled for 11/16/2020',
    rate: '240€',
  },
  {
    value: 'home-delivery',
    label: 'Home delivery by Collissimo',
    time: '24H',
    scheduledDelivery: 'Delivery scheduled for 11/16/2020',
    rate: '540€',
  },
  {
    value: 'store-pickup',
    label: 'Pick up in store',
    time: '24H',
    scheduledDelivery: 'Order available 11/16/2020',
    rate: 'FREE',
  },
];

const relaypointContent = (handleClick, postalAddress, t) => {
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
        {t('Modify')}
      </Button>
    </Box>
  );
};
const addressContent = (control, isAddressDiff, formProps, t) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='subtitle1' color='textSecondary' sx={{ mb: 1 }}>
        {t('Shipping Address')}
      </Typography>
      <CustomRadioGroup
        name='shippingAddress'
        control={control}
        options={[
          {
            label: t('Identical to delivery address'),
            value: 'identical',
          },
          {
            label: t('Use a different Shipping address'),
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
            name='address'
            label={t('Address')}
            type='text'
            register={formProps?.register}
            errors={formProps?.errors}
            errorMessage={t('address is required')}
            placeholder={t('Address')}
          />
          <CustomInputField
            name='city'
            label={t('City')}
            type='text'
            register={formProps?.register}
            errors={formProps?.errors}
            errorMessage={t('city is required')}
            placeholder={t('City')}
          />
          <CustomInputField
            name='country'
            label={t('Country')}
            type='text'
            register={formProps?.register}
            errors={formProps?.errors}
            errorMessage={t('country is required')}
            placeholder={t('Country')}
          />
          <CustomInputField
            name='postalCode'
            label={t('Postal Code')}
            type='text'
            register={formProps?.register}
            errors={formProps?.errors}
            errorMessage={t('postalCode is required')}
            placeholder={t('Postal Code')}
          />
        </Box>
      )}
    </Box>
  );
};

const Step2 = ({ validateStep, cart, changeDeliveryMethod }) => {
  const { t } = useTranslation();

  const { handleSubmit, control, watch, register, errors } = useForm();
  const [dialog, setDialog] = React.useState(false);
  const [isMapDialogOpen, toggleMapDialog] = useToggle(false);

  const [postalAddress, setpostalAddress] = React.useState(
    'Lyon Librairie la bonne paye 50 rue delabarre 69008'
  );
  const watchDeliveryMethod = watch('deliveryMethod', deliveryMethods[0].value);
  const watchShippingAddress = watch('shippingAddress');

  useEffect(() => {
    changeDeliveryMethod(watchDeliveryMethod);
  }, [watchDeliveryMethod]);

  const travellersForm = (data) => {
    validateStep(data);
  };

  const transDelivery = (m) => {
    let b = m.split(' ').pop();
    let c = m.split(b)[0];
    return `${t(c.trim())} ${b}`;
  };
  const handleRelayPoint = (relayPoint) => {
    // console.log(`relayPoint`, relayPoint);
    toggleMapDialog();
  };

  return (
    <>
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant='subtitle1' color='textSecondary'>
            {t('Choose the delivery method')}
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
                name='deliveryMethod'
                control={control}
                defaultValue={deliveryMethods[0].value}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    {deliveryMethods.map((singleOption, i) => {
                      return (
                        <React.Fragment key={i}>
                          <Grid container spacing={2}>
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
                                  label={t(singleOption.label)}
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
                                {/* {t(singleOption.scheduledDelivery)} */}

                                {t(
                                  transDelivery(singleOption.scheduledDelivery)
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant='subtitle1'>
                                {singleOption.rate}
                              </Typography>
                            </Grid>
                          </Grid>
                          {watchDeliveryMethod === deliveryMethods[0].value &&
                            singleOption.value === deliveryMethods[0].value && (
                              <>
                                {relaypointContent(
                                  toggleMapDialog,
                                  postalAddress,
                                  t
                                )}
                                <Divider sx={{ my: 2, width: '100%' }} />
                              </>
                            )}
                          {watchDeliveryMethod === singleOption.value && (
                            // watchDeliveryMethod !==
                            //   deliveryMethods[2].value && (
                            <Box sx={{ mt: 2 }}>
                              {addressContent(
                                control,
                                watchShippingAddress,
                                {
                                  register,
                                  errors,
                                },
                                t
                              )}
                            </Box>
                          )}
                          {i < deliveryMethods.length - 1 && (
                            <Divider sx={{ my: 3, width: '100%' }} />
                          )}
                        </React.Fragment>
                      );
                    })}
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
            deliveryMethod={watchDeliveryMethod}
          />
        </Grid>
      </Grid>

      <RelayPointDialog
        open={isMapDialogOpen}
        closeDialog={toggleMapDialog}
        handleSubmit={handleRelayPoint}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default Step2;
