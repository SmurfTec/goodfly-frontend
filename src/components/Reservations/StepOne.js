import {
  Paper,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomTextField } from 'components/FormControls';
import Select from 'react-select';
import { useStyles } from 'Styles/Form/FormStyles';
import { dateBeforeToday } from 'Utils/formValidations';
import { AuthContext } from 'Contexts/AuthContext';
import { getMuiDateFormat } from 'Utils/constants';

const StepOne = ({ handleChange, submitForm, data }) => {
  const { user } = useContext(AuthContext);
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      reservationType: data.reservationType,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      additionalAddress: data.additionalAddress,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      phone: data.phone,
      email: data.email,
      travelers: {
        value: data.numOfTravellers,
        label: '' + data.numOfTravellers,
      },
      passportNumber: data.passportNumber,
      dateOfBirth: data.dateOfBirth,
    },
  });

  const watchReservationType = watch('reservationType', 'selfReserve');
  const watchTravlers = watch('travelers', 2);

  useEffect(() => {
    const subscriptions = watch((value) => {
      handleChange(value.travelers.value);
    });
    return () => subscriptions.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTravlers]);
  useEffect(() => {
    // console.log(`watchReservationType`, watchReservationType);
    if (watchReservationType === 'selfReserve') {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('address', user.address);
      setValue('additionalAddress', user.additionalAddress);
      setValue('dateOfBirth', getMuiDateFormat(user.dateOfBirth));
      setValue('postalcode', user.postalCode);
      setValue('city', user.city);
      setValue('country', user.country);
      setValue('email', user.email);
      setValue('passportNumber', user.passportNumber);
      setValue('phone', user.telephoneNumber);
    } else {
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('address', '');
      setValue('additionalAddress', '');
      setValue('dateOfBirth', '');
      setValue('postalcode', '');
      setValue('city', '');
      setValue('country', '');
      setValue('email', '');
      setValue('passportNumber', '');
      setValue('phone', '');
      setValue('passportNumber', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchReservationType]);

  return (
    <>
      <form id='form1' onSubmit={handleSubmit(submitForm)}>
        <Controller
          name='reservationType'
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              aria-label='reservationType'
              sx={{
                justifyContent: 'center',
                mb: 3,
                alignItems: 'start',
              }}
            >
              <FormControlLabel
                value='selfReserve'
                control={<Radio />}
                label='I reserve for me'
              />

              <FormControlLabel
                value='reserveForAnother'
                control={<Radio />}
                label='I reserve for another person'
              />
            </RadioGroup>
          )}
        />
        <Paper elevation={0} sx={{ px: 4, py: 4, backgroundColor: '#fafafa' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='firstName'
                disabled={watchReservationType === 'selfReserve'}
                label='First Name'
                control={control}
                type='text'
                // customValue={customValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='lastName'
                disabled={watchReservationType === 'selfReserve'}
                label='Last Name'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='address'
                disabled={watchReservationType === 'selfReserve'}
                label='Address'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='additionalAddress'
                disabled={watchReservationType === 'selfReserve'}
                label='Additional Address'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='postalcode'
                disabled={watchReservationType === 'selfReserve'}
                label='Postal Code'
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='city'
                disabled={watchReservationType === 'selfReserve'}
                label='City'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='country'
                disabled={watchReservationType === 'selfReserve'}
                label='Country'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='phone'
                disabled={watchReservationType === 'selfReserve'}
                label='Mobile phone'
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='email'
                disabled={watchReservationType === 'selfReserve'}
                label='Email'
                control={control}
                type='email'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 2, mb: 1 }}
              >
                Addtional Travellers
              </Typography>

              <Controller
                name='travelers'
                // disabled={watchReservationType === 'selfReserve'}
                control={control}
                // defaultValue={{
                //   value: 5,
                //   label: '' + 5,
                //   // value: data.numOfTravellers,
                //   // label: '' + data.numOfTravellers,
                // }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={false}
                    placeholder='Travellers'
                    value={getValues('travelers')}
                    options={[
                      { key: 11, value: 1, label: '1' },
                      { key: 12, value: 2, label: '2' },
                      { key: 13, value: 3, label: '3' },
                      { key: 14, value: 4, label: '4' },
                      { key: 15, value: 5, label: '5' },
                    ]}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.dateOfBirth)}>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mt: 2, mb: 1 }}
                >
                  Date Of Birth
                </Typography>
                <input
                  type='date'
                  className={useStyles().textInput}
                  {...register('dateOfBirth', {
                    required: true,
                    validate: dateBeforeToday,
                  })}
                  disabled={watchReservationType === 'selfReserve'}
                />
                {errors.dateOfBirth?.type === 'required' && (
                  <FormHelperText>Specify date of birth</FormHelperText>
                )}
                {errors.dateOfBirth?.type === 'validate' && (
                  <FormHelperText>
                    Date of birth must be before today
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='passportNumber'
                disabled={watchReservationType === 'selfReserve'}
                label='Passport Number'
                control={control}
                type='text'
              />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default StepOne;
