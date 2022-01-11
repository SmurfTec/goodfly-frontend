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
import v4 from 'uuid/dist/v4';
import { useTranslation } from 'react-i18next';

const StepOne = ({ handleChange, submitForm, data, sendErrors }) => {
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
      type: data.type,
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

  const watchType = watch('type', 'selfReserve');
  const watchTravlers = watch('travelers', 2);
  const { t } = useTranslation();

  useEffect(() => {
    console.log(`errors`, errors);

    // * If errors = {} , then we have to consider its not error
    sendErrors(Object.keys(errors).length > 0 && watchType === 'selfReserve');
  });

  useEffect(() => {
    const subscriptions = watch((value) => {
      handleChange(value.travelers.value);
    });
    return () => subscriptions.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTravlers]);
  useEffect(() => {
    // console.log(`watchType`, watchType);
    if (watchType === 'selfReserve') {
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
  }, [watchType]);

  return (
    <>
      <form id='form1' onSubmit={handleSubmit(submitForm)}>
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              aria-label='type'
              sx={{
                justifyContent: 'center',
                mb: 3,
                alignItems: 'start',
              }}
            >
              <FormControlLabel
                value='selfReserve'
                control={<Radio />}
                label={t('I reserve for me')}
              />

              <FormControlLabel
                value='reserveForAnother'
                control={<Radio />}
                label={t('I reserve for another person')}
              />
            </RadioGroup>
          )}
        />
        <Paper elevation={0} sx={{ px: 4, py: 4, backgroundColor: '#fafafa' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='firstName'
                disabled={watchType === 'selfReserve'}
                label={t('First Name')}
                control={control}
                type='text'
                // customValue={customValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='lastName'
                disabled={watchType === 'selfReserve'}
                label={t('Last Name')}
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='address'
                disabled={watchType === 'selfReserve'}
                label={t('Address')}
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='additionalAddress'
                disabled={watchType === 'selfReserve'}
                label={t('Additional Address')}
                control={control}
                type='text'
                noRequire
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='postalcode'
                disabled={watchType === 'selfReserve'}
                label={t('Postal Code')}
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='city'
                disabled={watchType === 'selfReserve'}
                label={t('City')}
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='country'
                disabled={watchType === 'selfReserve'}
                label={t('Country')}
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='phone'
                disabled={watchType === 'selfReserve'}
                label={t('Mobile phone')}
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='email'
                disabled={watchType === 'selfReserve'}
                label={t('Email')}
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
                {t('Additional Travellers')}
              </Typography>

              <Controller
                name='travelers'
                // disabled={watchType === 'selfReserve'}
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
                    placeholder={t('Travellers')}
                    value={getValues('travelers')}
                    options={[
                      { key: v4(), value: 0, label: '0' },
                      { key: v4(), value: 1, label: '1' },
                      { key: v4(), value: 2, label: '2' },
                      { key: v4(), value: 3, label: '3' },
                      { key: v4(), value: 4, label: '4' },
                      { key: v4(), value: 5, label: '5' },
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
                  {t('Date Of Birth')}
                </Typography>
                <input
                  type='date'
                  className={useStyles().textInput}
                  {...register('dateOfBirth', {
                    required: true,
                    validate: dateBeforeToday,
                  })}
                  disabled={watchType === 'selfReserve'}
                />
                {errors.dateOfBirth?.type === 'required' && (
                  <FormHelperText>
                    {t('Specify your date of birth')}
                  </FormHelperText>
                )}
                {errors.dateOfBirth?.type === 'validate' && (
                  <FormHelperText>
                    {t('Date of birth must be before today')}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='passportNumber'
                disabled={watchType === 'selfReserve'}
                label={t('Passport Number')}
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
