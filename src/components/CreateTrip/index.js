import React, { useContext } from 'react';
import Banner from 'components/common/tours/Banner';
import Select from 'react-select';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  FormControl,
  FormHelperText,
  Checkbox,
  useTheme,
} from '@material-ui/core';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import img from 'Assets/img/createTrip.jpg';
import { useStyles } from 'Styles/CreateTrip/FormStyles';
import {
  participants,
  type2,
  type,
  random,
  travelMonth,
  travelYear,
  desiredDuration,
  flightType,
  tripTheme,
  tripAccomodation,
  meals,
  transportOnSite,
  guideAccompained,
  timeToReachClient,
  clientCivility,
  groupType,
  reactSelectFields,
} from './DumyData';
import { CustomSelect } from 'components/FormControls';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import { makeReq, handleCatch, getMuiDateFormat } from 'Utils/constants';
import { datePickerCheck } from 'Utils/datePickerCheck';
import MuiAutoComplete from '../FormControls/MUIAutoComplete';
import CountriesAutoComplete from '../FormControls/MUICountriesAutoComplete';
import v4 from 'uuid/dist/v4';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { AuthContext } from 'Contexts/AuthContext';
import { Link } from 'react-router-dom';
import Page from 'components/common/Page';

const AddTrip = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const globalClasses = useGlobalClasses();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
  } = useForm();
  const history = useHistory();
  const methods = useForm();
  const watchFields = watch(['departureDate', 'desiredReturnOn', 'type']);

  console.log('errors', errors);
  const removeExtraFields = (data, ...fields) => {
    Object.keys(data).forEach((key) => {
      if (!!fields?.find((el) => el === key)) {
        delete data[key];
      }
    });
  };
  const getReactSelectValue = (data, ...fields) => {
    Object.keys(data).forEach((key) => {
      if (!!fields?.find((el) => el === key)) {
        data[key] = data[key].value;
      }
    });
  };

  const getCountryCode = (data, key) => {
    data[key] = data[key].phone;
  };
  const getDestinations = (data, key) => {
    data[key] = data[key].map((el) => el.label);
  };

  const getValue = (data, key) => {
    data[key] = data[key].value;
  };

  const removeEmptyNullFields = (data, ...fields) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
  };

  const GroupTypeSelect = (arr, value) => {
    switch (value) {
      case 'in-couple': {
        removeExtraFields(
          arr,
          'numOfAdults',
          'numOfAdolescants',
          'numOfChildren',
          'numOfBabies',
          'groupType'
        );
        break;
      }
      case 'in-group': {
        removeExtraFields(
          arr,
          'numOfAdults',
          'numOfAdolescants',
          'numOfChildren',
          'numOfBabies',
          'type2'
        );

        break;
      }
      case 'family':
      case 'friends': {
        removeExtraFields(arr, 'type2', 'groupType');
        break;
      }

      default: {
        removeExtraFields(
          arr,
          'numOfAdults',
          'numOfAdolescants',
          'numOfChildren',
          'numOfBabies',
          'groupType',
          'type2'
        );
      }
    }
  };

  const watchTravelDates = watch('isTravelDates', 'no');
  const watchFlexibleDates = watch('isFlexibleDates', 'no');

  const submitFormData = async (data) => {
    //? Remove null or empty fields from data
    removeEmptyNullFields(data);
    //? Remove fields based on type dropdown select
    GroupTypeSelect(data, watchFields[2]?.value);
    //? Remove fields based on travel date already select
    if (watchTravelDates === 'yes')
      removeExtraFields(data, 'departureDate', 'desiredReturnOn');
    if (watchFlexibleDates === 'no')
      removeExtraFields(data, 'year', 'month', 'duration');
    else {
      getValue(data, 'year');
      getValue(data, 'month');
      getValue(data, 'duration');
    }
    //? Destructure the fields
    getReactSelectValue(data, ...reactSelectFields);
    //? Destructure the country code field
    // getCountryCode(data, 'countryCode');
    //? Destructure the country code fields
    getDestinations(data, 'destination');

    try {
      const resData = await makeReq(
        `/trips/customTrip`,
        {
          body: { ...data, title: `Custom Trip ${v4().slice(0, 4)}` },
        },
        'POST'
      );

      toast.success('Success');
      history.push('/');
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <Page title='Create a Trip'>
      <Container className={globalClasses.MainContainer}>
        <Banner
          imageUrl={img}
          bannerTitle='I CREATE MY TRIP   '
          align='center'
        />
        <Box sx={{ fontStyle: 'italic', mt: 7 }}>
          <Typography variant='h5' color='text.secondary'>
            The heart of our know-how is to be at your disposal to imagine and
            design the trip of your dreams according to your desires and your
            principles.
          </Typography>
          <Typography variant='h5' sx={{ mt: 3 }} color='text.secondary'>
            Because understanding is above all knowing how to listen, a
            dedicated advisor will follow your request and accompany you
            throughout your trip ...
          </Typography>
        </Box>
        {!user ? (
          <Paper
            elevation={0}
            sx={{
              marginTop: 2,
              padding: '20px',
              backgroundColor: theme.palette.grey[200],
            }}
          >
            <Typography variant='h5' sx={{ marginBottom: 1 }}>
              You have to Login to Create a Trip
            </Typography>
            <Box>
              <Button
                sx={{ marginRight: 2 }}
                variant='contained'
                color='primary'
                component={Link}
                to='/auth/login?redirect=/tours/create'
              >
                Login
              </Button>
              <Button
                variant='contained'
                color='secondary'
                component={Link}
                to='/auth/signup?redirect=/tours/create'
              >
                Signup
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={0} className={classes.paper}>
            <Typography variant='subtitle1'>
              Describe to us as precisely as possible the trip you would like:
            </Typography>
            <Typography variant='subtitle1'>
              stages, desires, routes, activities, excursions, circuits, centers
              of interest etc ...
            </Typography>

            <Typography variant='subtitle1' sx={{ mt: 2 }}>
              The information you give us allows us to best respond to your
              request.
            </Typography>
            <Typography variant='subtitle1' sx={{ mt: 2 }}>
              In any case, we will deepen your project together by phone and
              email.
            </Typography>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((data) => submitFormData(data))}>
                <Grid container sx={{ mt: 6 }} spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Tell us about your project
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      name='numOfParticipants'
                      control={control}
                      message='Specify no of Participants'
                      placeholder='Participants'
                      options={participants}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomSelect
                      name='type'
                      control={control}
                      message='Specify group type'
                      placeholder='You will be'
                      options={type}
                      errors={errors}
                    />
                  </Grid>
                  {watchFields[2]?.value === 'in-couple' && (
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        name='type2'
                        control={control}
                        message='Choose occasion'
                        placeholder='Couple occasion'
                        options={type2}
                        errors={errors}
                      />
                    </Grid>
                  )}
                  {watchFields[2]?.value === 'in-group' && (
                    <Grid item xs={12} sm={6}>
                      <CustomSelect
                        name='groupType'
                        control={control}
                        message='Choose occasion'
                        placeholder=' Group occasion'
                        options={groupType}
                        errors={errors}
                      />
                    </Grid>
                  )}
                  {(watchFields[2]?.value === 'family' ||
                    watchFields[2]?.value === 'friends') && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <CustomSelect
                          name='numOfAdults'
                          control={control}
                          message='Specify no of adults'
                          placeholder='No of Adults'
                          options={random}
                          errors={errors}
                          preConfition={watchFields[2]?.value === 'friends'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomSelect
                          name='numOfAdolescents'
                          control={control}
                          message='Specify no of adolescents'
                          placeholder='Adolescents'
                          options={random}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomSelect
                          name='numOfChildren'
                          control={control}
                          message='Specify no of children'
                          placeholder='No of Children'
                          options={random}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomSelect
                          name='numOfBabies'
                          control={control}
                          message='Specify no of babies'
                          placeholder='No of Babies'
                          options={random}
                          errors={errors}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={12}>
                    {/* <FormControl fullWidth error={Boolean(errors.destinations)}>
                    <input
                      className={classes.textInput}
                      {...register('destinations', {
                        required: true,
                        maxLength: 20,
                      })}
                      placeholder='Destinations (several countries possible)'
                    />
                    {errors.destinations && (
                      <FormHelperText>
                        Write atleast one destination or more than one
                      </FormHelperText>
                    )}
                  </FormControl> */}
                    <CountriesAutoComplete control={control} />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <Typography variant='subtitle1' color='text.secondary'>
                      Have you already set the travel dates?
                    </Typography>
                    <Controller
                      name='isTravelDates'
                      control={control}
                      defaultValue='no'
                      render={({ field }) => (
                        <RadioGroup {...field} aria-label='travelDate' row>
                          <FormControlLabel
                            value='yes'
                            control={<Radio />}
                            label='Yes'
                          />
                          <FormControlLabel
                            value='no'
                            control={<Radio />}
                            label='No'
                          />
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  {watchTravelDates === 'no' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={`${
                            watchTravelDates === 'no' ||
                            (Boolean(errors.departureDate) &&
                              Boolean(datePickerCheck(watchFields[0])))
                          }`}
                          // error={false}
                        >
                          <Typography
                            variant='subtitle1'
                            color='text.secondary'
                            sx={{ mt: 2, mb: 1, mx: 0 }}
                          >
                            Desired departure on
                          </Typography>
                          <input
                            type='date'
                            className={classes.textInput}
                            {...register('departureDate', {
                              required: true,
                            })}
                          />

                          {datePickerCheck(watchFields[0]) && (
                            <FormHelperText>
                              Please select today date or any future date
                            </FormHelperText>
                          )}
                          {errors.departureDate && (
                            <FormHelperText>
                              Select desired departure date
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={`${
                            watchTravelDates === 'no' ||
                            (Boolean(errors.desiredReturnOn) &&
                              Boolean(datePickerCheck(watchFields[1])))
                          }`}
                        >
                          <Typography
                            variant='subtitle1'
                            color='text.secondary'
                            sx={{ mt: 2, mb: 1, mx: 0 }}
                          >
                            Desired return on
                          </Typography>
                          <input
                            type='date'
                            className={classes.textInput}
                            {...register('desiredReturnOn', {
                              required: true,
                            })}
                          />
                          {datePickerCheck(watchFields[1]) && (
                            <FormHelperText>
                              Please select any future date
                            </FormHelperText>
                          )}
                          {errors.desiredReturnOn && (
                            <FormHelperText>
                              Select desired return date
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Flexible Dates
                    </Typography>

                    <Controller
                      name='isFlexibleDates'
                      control={control}
                      defaultValue='yes'
                      render={({ field }) => (
                        <RadioGroup {...field} aria-label='isFlexibleDates' row>
                          <FormControlLabel
                            value='yes'
                            control={<Radio />}
                            label='Yes'
                          />
                          <FormControlLabel
                            value='no'
                            control={<Radio />}
                            label='No'
                          />
                        </RadioGroup>
                      )}
                    />
                  </Grid>

                  {watchFlexibleDates === 'yes' && (
                    <>
                      <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                        <Typography
                          variant='subtitle1'
                          color='text.secondary'
                          sx={{ mb: 1 }}
                        >
                          Which year would you like to travel?
                        </Typography>

                        <Controller
                          name='year'
                          control={control}
                          defaultValue={travelYear[0]}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              placeholder='Travel Year'
                              options={travelYear}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                        <Typography
                          variant='subtitle1'
                          color='text.secondary'
                          sx={{ mb: 1 }}
                        >
                          Which month would you like to travel?
                        </Typography>
                        <Controller
                          name='month'
                          control={control}
                          defaultValue={travelMonth[0]}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              placeholder='Travel Month'
                              options={travelMonth}
                            />
                          )}
                        />
                      </Grid>{' '}
                      <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                        <Typography
                          variant='subtitle1'
                          color='text.secondary'
                          sx={{ mb: 1 }}
                        >
                          The desired duration?
                        </Typography>

                        <Controller
                          name='duration'
                          control={control}
                          defaultValue={desiredDuration[0]}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              placeholder='Desired Duration'
                              options={desiredDuration}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      What type of flight would you like?
                    </Typography>
                    <Controller
                      name='flightsType'
                      control={control}
                      defaultValue={flightType[0].value}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          placeholder='Type Of Flight'
                          options={flightType}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      What theme and / or type of trip would you like? (several
                      choices possible)
                    </Typography>

                    <Controller
                      name='tripType'
                      control={control}
                      defaultValue={tripTheme[0].value}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <Grid container spacing={1}>
                            {tripTheme.map((theme, idx) => (
                              <Grid item xs={12} sm={6} key={theme.value}>
                                <FormControlLabel
                                  value={theme.value}
                                  control={<Radio />}
                                  label={theme.label}
                                  key={idx}
                                />
                              </Grid>
                            ))}
                            <Grid item>
                              <FormControlLabel
                                value='otherTheme'
                                control={<Radio />}
                                label='Other'
                              />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                              <input
                                className={classes.textInput}
                                placeholder='(specify)'
                                type='text'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      What type of accommodation would you like? (several
                      choices possible)
                    </Typography>

                    <Controller
                      name='accomodationType'
                      control={control}
                      defaultValue={tripAccomodation[0].value}
                      render={({ field: { onChange, value } }) => (
                        <RadioGroup
                          defaultChecked={tripAccomodation[0].value}
                          value={value}
                          onChange={onChange}
                          row
                        >
                          <Grid container spacing={1}>
                            {tripAccomodation.map((accomodation) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                key={accomodation.value}
                              >
                                <FormControlLabel
                                  value={accomodation.value}
                                  control={<Radio />}
                                  label={accomodation.label}
                                />
                              </Grid>
                            ))}
                            <Grid item>
                              <FormControlLabel
                                value='otherTheme'
                                control={<Radio />}
                                label='Other'
                              />
                            </Grid>
                            <Grid item xs={8} sm={8}>
                              <input
                                className={classes.textInput}
                                placeholder='(specify)'
                                type='text'
                              />
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      For meals would you like?
                    </Typography>

                    <Controller
                      name='meals'
                      control={control}
                      defaultValue={meals[0]}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          placeholder='Type Of Meals'
                          options={meals}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Transport on site?
                    </Typography>
                    <Controller
                      name='transportOnSite'
                      control={control}
                      defaultValue={transportOnSite[0].value}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          placeholder='Transport on Site'
                          options={transportOnSite}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Would you like to be accompanied by a guide during your
                      trip?
                    </Typography>
                    <Controller
                      name='guideAccompany'
                      control={control}
                      defaultValue={guideAccompained[0]}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          placeholder='Guide'
                          options={guideAccompained}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.budgetPerPerson)}
                    >
                      <Typography
                        variant='subtitle1'
                        color='text.secondary'
                        sx={{ mb: 1 }}
                      >
                        Global budget in euros per person for this trip? (about)
                      </Typography>
                      <input
                        className={classes.textInput}
                        type='number'
                        {...register('budgetPerPerson', {
                          required: true,
                          maxLength: 15,
                        })}
                        placeholder='specify'
                      />
                      {errors.budgetPerPerson && (
                        <FormHelperText>
                          Specify the global budget per person for this trip
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{
                      mt: 4,
                      '& textarea': {
                        resize: 'vertical',
                      },
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Your desires
                    </Typography>

                    <textarea
                      rows='15'
                      className={classes.textInput}
                      // name='clientDesires'
                      {...register('desires')}
                      placeholder='Describe to us as precisely as possible the trip you would like: stages, desires, itineraries, activities, excursions, circuits, centers of interest etc ...'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 6 }}>
                    <hr />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      When is the best time to reach you by phone?
                    </Typography>
                    <Controller
                      name='phoneTime'
                      control={control}
                      defaultValue={timeToReachClient[0].value}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          aria-label='timeToReachClient'
                          row
                        >
                          {timeToReachClient.map((time) => (
                            <FormControlLabel
                              key={time.value}
                              value={time.value}
                              control={<Radio />}
                              label={time.label}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                    <Typography
                      variant='subtitle1'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      Your Contact Details
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Controller
                          name='pronoun'
                          control={control}
                          // defaultValue={user.pronoun}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable={false}
                              placeholder='Civility'
                              options={clientCivility}
                              isDisabled
                              value={user.pronoun}
                              // disabled
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.firstName && !user.firstName)}
                        >
                          <input
                            className={classes.textInput}
                            {...register('firstName', {
                              required: !user.firstName ? true : false,
                              maxLength: 50,
                            })}
                            placeholder=' First Name'
                            value={user.firstName}
                            disabled
                          />
                          {errors.firstName && !user.firstName && (
                            <FormHelperText>
                              Specify your first name
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.lastName && !user.lastName)}
                        >
                          <input
                            className={classes.textInput}
                            {...register('lastName', {
                              required: !user.lastName ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='Last Name'
                            value={user.lastName}
                            disabled
                          />
                          {errors.lastName && !user.lastName && (
                            <FormHelperText>
                              Specify your last name
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(
                            errors.dateOfBirth && !user.dateOfBirth
                          )}
                        >
                          <input
                            type='date'
                            className={classes.textInput}
                            {...register('dateOfBirth', {
                              required: !user.dateOfBirth ? true : false,
                            })}
                            value={getMuiDateFormat(user.dateOfBirth)}
                            disabled
                          />
                          {errors.dateOfBirth && !user.dateOfBirth && (
                            <FormHelperText>
                              Specify your date of birth
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={8}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.address) && !user.address}
                        >
                          <input
                            className={classes.textInput}
                            {...register('address', {
                              required: !user.address ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='Address'
                            value={user.address}
                            disabled
                          />
                          {errors.address && !user.address && (
                            <FormHelperText>
                              Specify your address
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.postalCode) && !user.postalCode}
                        >
                          <input
                            className={classes.textInput}
                            type='number'
                            {...register('postalCode', {
                              required: !user.postalCode ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='Zip Code'
                            value={user.postalCode}
                            disabled
                          />
                          {errors.postalCode && !user.postalCode && (
                            <FormHelperText>Specify zip code</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.city) && !user.city}
                        >
                          <input
                            className={classes.textInput}
                            type='text'
                            {...register('city', {
                              required: !user.city ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='City'
                            value={user.city}
                            disabled
                          />
                          {errors.city && !user.city && (
                            <FormHelperText>Specify city</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.country) && !user.country}
                        >
                          <input
                            className={classes.textInput}
                            type='text'
                            {...register('country', {
                              required: !user.country ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='Country'
                            value={user.country}
                            disabled
                          />
                          {errors.country && !user.country && (
                            <FormHelperText>Specify country</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={6} sm={5}>
                        <FormControl
                          fullWidth
                          error={Boolean(errors.email) && !user.email}
                        >
                          <input
                            className={classes.textInput}
                            type='email'
                            {...register('email', {
                              required: !user.email ? true : false,
                              maxLength: 50,
                            })}
                            placeholder='Email'
                            value={user.email}
                            disabled
                          />
                          {errors.email && !user.email && (
                            <FormHelperText>Specify email</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      {/* <Grid item xs={4} sm={3}>
                        {/* <Controller
                      name='numberCode'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          value={numberCode[1]}
                          placeholder='Code'
                          options={numberCode}
                        />
                      )}
                    /> 

                        <MuiAutoComplete control={control} />
                      </Grid> */}
                      <Grid item xs={6} sm={4}>
                        <FormControl
                          fullWidth
                          error={
                            Boolean(errors.telephoneNumber) &&
                            !user.telephoneNumber
                          }
                        >
                          <input
                            className={classes.textInput}
                            type='number'
                            {...register('telephoneNumber', {
                              required: !user.telephoneNumber ? true : false,
                              maxLength: 12,
                            })}
                            placeholder='Phone no'
                            value={user.telephoneNumber}
                            disabled
                          />
                          {errors.telephoneNumber && !user.telephoneNumber && (
                            <FormHelperText>
                              Specify your phone no
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label='I would like to receive the GOODFLY newsletter'
                      {...register('subscribeNewsLetter')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant='contained' color='primary' type='submit'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </Paper>
        )}
      </Container>
    </Page>
  );
};

export default AddTrip;
