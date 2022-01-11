import React, { useState } from 'react';
import {
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import usestyles from 'Styles/Home/TabStyles';
import {
  CustomInputField,
  CustomDatePicker,
  CustomSelect,
} from 'components/FormControls';
import { useTranslation } from 'react-i18next';

const TabItem = () => {
  const classes = usestyles();
  const { t } = useTranslation();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm();
  const [tripOption, setTripOption] = useState(0);

  //? State for direct flight checkbox
  const [directFlight, setdirectFlight] = React.useState(false);

  //? Set the selected trip option, one way or round trip
  const setSelectedOption = (e) => {
    const { option } = e.currentTarget.dataset;
    if (option === 'roundTrip') setTripOption(0);
    else setTripOption(1);
  };

  //? Direct flight checkox
  const directFlightChk = (e) => {
    setdirectFlight(!directFlight);
  };

  const flightForm = (data) => {
    // console.log('Flight Data :', data);
  };

  return (
    <>
      <section className={classes.tabItemOptions}>
        <Typography
          variant='body1'
          data-option='roundTrip'
          className={classes.tabItem}
          onClick={setSelectedOption}
          sx={{ marginRight: 3 }}
        >
          {t('Round Trip')}
          <span
            className={`${classes.slider} ${
              tripOption === 0 && classes.selectedOption
            }`}
          ></span>
        </Typography>
        <Typography
          variant='body1'
          data-option='oneway'
          className={classes.tabItem}
          onClick={setSelectedOption}
        >
          {t('One Way Ticket')}
          <span
            className={`${classes.slider} ${
              tripOption === 1 && classes.selectedOption
            }`}
          ></span>
        </Typography>
      </section>
      <form onSubmit={handleSubmit(flightForm)}>
        <Grid container sx={{ marginTop: 3 }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomInputField
              name='departure'
              label={t('Departure')}
              type='text'
              placeholder={t('Departure').toLowerCase()}
              register={register}
              errors={errors}
              errorMessage={`${t('Where are we going from')}?`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomInputField
              name='destination'
              label={t('Destination')}
              placeholder={t('Destination').toLowerCase()}
              type='text'
              register={register}
              errors={errors}
              errorMessage={`${t('Where are we going')}?`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomDatePicker
              type='date'
              label={t('To Go')}
              name='togoDate'
              errors={errors}
              errorMessage={t('Specify the date on which you want to go')}
              register={register}
            />
          </Grid>
          {tripOption === 0 && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={Boolean(errors.returnDate)}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  {t('Return')}
                </Typography>
                <input
                  type='date'
                  style={{ marginBottom: 0 }}
                  className={classes.textInput}
                  {...register('returnDate', {
                    required: tripOption === 0,
                  })}
                />

                {errors.returnDate && (
                  <FormHelperText>
                    {t('Specify your return date')}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <label className={classes.label}>{t('Passengers')}</label>
            <CustomSelect
              name='noOfPassengers'
              control={control}
              message={t('Specify no of Passengers')}
              placeholder={t('Passengers')}
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
              ]}
              errors={errors}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: 'flex', alignItems: 'center', mt: 3 }}
          >
            <Controller
              name='Checkbox'
              control={control}
              render={({ field: onChange, value }) => (
                <Checkbox
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
            <label>{t('Direct flights only')}</label>
          </Grid>
          <Grid item sx={{ marginTop: 2 }} sm={12}>
            <Button variant='contained' color='primary' type='submit'>
              {t('Start a Research')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default TabItem;
