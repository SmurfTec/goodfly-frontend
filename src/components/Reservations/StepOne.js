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
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomTextField } from 'components/FormControls';
import Select from 'react-select';
import { useStyles } from 'Styles/Form/FormStyles';

const StepOne = ({ travellersInfo, clientForm }) => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    watch,
  } = useForm();

  React.useEffect(() => {
    const subscriptions = watch((value) =>
      travellersInfo(value.noOfTravellers)
    );
    return () => subscriptions.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      <form id='form1' onSubmit={handleSubmit(clientForm)}>
        <Controller
          name='reservationType'
          control={control}
          defaultValue='yes'
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              sx={{
                justifyContent: 'center',
                mb: 3,
                alignItems: 'start',
              }}
            >
              <FormControlLabel
                value='selfReserve'
                control={<Radio checked />}
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
        <Paper
          elevation={0}
          sx={{ px: 4, py: 4, backgroundColor: '#fafafa' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='firstName'
                label='First Name'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='name'
                label='Name'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='address'
                label='Address'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTextField
                name='addionalAddress'
                label='Additional Address'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='postalcode'
                label='Postal Code'
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='city'
                label='City'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                name='country'
                label='Country'
                control={control}
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='phone'
                label='Mobile phone'
                control={control}
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='email'
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
                name='noOfTravellers'
                control={control}
                defaultValue={{ value: 1, label: '1' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable={false}
                    placeholder='Travellers'
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
              <FormControl
                fullWidth
                error={Boolean(errors.dateOfBirth)}
              >
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
                  })}
                />
                {errors.dateOfBirth && (
                  <FormHelperText>
                    Specify date of birth
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                name='passportNumber'
                label='Passport Number'
                control={control}
                type='number'
              />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default StepOne;
