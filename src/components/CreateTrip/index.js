import React from 'react';
import Banner from 'components/common/Banner';
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
  Tooltip,
  Checkbox,
} from '@material-ui/core';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import img from 'Assets/img/createTrip.jpg';
import { useStyles } from 'Styles/CreateTrip/FormStyles';
import {
  participants,
  occasion,
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
  numberCode,
} from './DumyData';
import { CustomSelect } from 'components/FormControls';

function AddTrip() {
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm();

  const methods = useForm();
  const submitFormData = (data) => {
    console.log('Form Data :', data);
  };

  return (
    <Container>
      <Banner
        imageUrl={img}
        bannerTitle='I CREATE MY TRIP   '
        align='center'
      />

      <Box sx={{ fontStyle: 'italic', mt: 7 }}>
        <Typography variant='h5' color='text.secondary'>
          The heart of our know-how is to be at your disposal to
          imagine and design the trip of your dreams according to your
          desires and your principles.
        </Typography>
        <Typography
          variant='h5'
          sx={{ mt: 3 }}
          color='text.secondary'
        >
          Because understanding is above all knowing how to listen, a
          dedicated advisor will follow your request and accompany you
          throughout your trip ...
        </Typography>
      </Box>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant='subtitle1'>
          Describe to us as precisely as possible the trip you would
          like:
        </Typography>
        <Typography variant='subtitle1'>
          stages, desires, routes, activities, excursions, circuits,
          centers of interest etc ...
        </Typography>

        <Typography variant='subtitle1' sx={{ mt: 2 }}>
          The information you give us allows us to best respond to
          your request.
        </Typography>
        <Typography variant='subtitle1' sx={{ mt: 2 }}>
          In any case, we will deepen your project together by phone
          and email.
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit((data) => submitFormData(data))}
          >
            <Grid container sx={{ mt: 6 }} spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                >
                  Tell us about your project
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='participant'
                  control={control}
                  message='Specify no of Participants'
                  placeholder='Participants'
                  options={participants}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='occasion'
                  control={control}
                  message='Choose occasion'
                  placeholder='Occasion'
                  options={occasion}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='groupType'
                  control={control}
                  message='Specify group type'
                  placeholder='Group Type'
                  options={occasion}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='adults'
                  control={control}
                  message='Specify no of adults'
                  placeholder='No of Adults'
                  options={random}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='adolescents'
                  control={control}
                  message='Specify no of adolescents'
                  placeholder='Adolescents'
                  options={random}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='children'
                  control={control}
                  message='Specify no of children'
                  placeholder='No of Children'
                  options={random}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomSelect
                  name='babies'
                  control={control}
                  message='Specify no of babies'
                  placeholder='No of Babies'
                  options={random}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.destinations)}
                >
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
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                >
                  Have you already set the travel dates?
                </Typography>
                <Controller
                  name='travelDateAlreadySet'
                  control={control}
                  defaultValue='yes'
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      aria-label='travelDate'
                      row
                    >
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
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.desiredDeparture)}
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
                    {...register('desiredDeparture', {
                      required: true,
                    })}
                  />
                  {errors.desiredDeparture && (
                    <FormHelperText>
                      Select desired departure date
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.desiredReturn)}
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
                    {...register('desiredReturn', {
                      required: true,
                    })}
                  />
                  {errors.desiredReturn && (
                    <FormHelperText>
                      Select desired return date
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Flexible Dates
                </Typography>

                {/* //* Change this */}
                <Controller
                  name='flexibleDates'
                  control={control}
                  defaultValue='yes'
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      aria-label='flexibleDates'
                      row
                    >
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
                {/* //* end */}
              </Grid>

              <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Number
                </Typography>

                <Controller
                  name='number'
                  control={control}
                  defaultValue={random[1]}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isSearchable={false}
                      placeholder='Number'
                      options={random.slice(1)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Period
                </Typography>
                <CustomSelect
                  name='period'
                  control={control}
                  message='Choose the period'
                  placeholder='Week'
                  options={random.slice(1)}
                  errors={errors}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  Which year would you like to travel?
                </Typography>

                <Controller
                  name='travelYear'
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
                  name='travelMonth'
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
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  The desired duration?
                </Typography>

                <Controller
                  name='desiredDuration'
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

              <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  What type of flight would you like?
                </Typography>
                <Controller
                  name='typeOfFlight'
                  control={control}
                  defaultValue={flightType[0]}
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
                  What theme and / or type of trip would you like?
                  (several choices possible)
                </Typography>

                <Controller
                  name='tripTheme'
                  control={control}
                  defaultValue={tripTheme[0].value}
                  render={({ field }) => (
                    <RadioGroup {...field} aria-label='tripTheme' row>
                      <Grid container spacing={1}>
                        {tripTheme.map((theme) => (
                          <Grid item xs={12} sm={6} key={theme.value}>
                            <FormControlLabel
                              value={theme.value}
                              control={<Radio />}
                              label={theme.label}
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
                  name='tripAccomodation'
                  control={control}
                  defaultValue={tripAccomodation[0].value}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      aria-label='tripAccomodation'
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
                  name='typeMeals'
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
                  defaultValue={transportOnSite[0]}
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
                  Would you like to be accompanied by a guide during
                  your trip?
                </Typography>
                <Controller
                  name='guideAccompained'
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
                  error={Boolean(errors.globalBudget)}
                >
                  <Typography
                    variant='subtitle1'
                    color='text.secondary'
                    sx={{ mb: 1 }}
                  >
                    Global budget in euros per person for this trip?
                    (about)
                  </Typography>
                  <input
                    className={classes.textInput}
                    type='number'
                    {...register('globalBudget', {
                      required: true,
                      maxLength: 15,
                    })}
                    placeholder='specify'
                  />
                  {errors.globalBudget && (
                    <FormHelperText>
                      Specify the global budget per person for this
                      trip
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
                  name='clientDesires'
                  {...register('clientDesires')}
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
                  name='timeToReachClient'
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
                      name='clientCivility'
                      control={control}
                      defaultValue={clientCivility[0]}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isSearchable={false}
                          placeholder='Civility'
                          options={clientCivility}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientName)}
                    >
                      <input
                        className={classes.textInput}
                        {...register('clientName', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='Name'
                      />
                      {errors.clientName && (
                        <FormHelperText>
                          Specify your name
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientFirstName)}
                    >
                      <input
                        className={classes.textInput}
                        {...register('clientFirstName', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='First Name'
                      />
                      {errors.clientFirstName && (
                        <FormHelperText>
                          Specify your first name
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.dateOfBirth)}
                    >
                      <Tooltip title='Date Of Birth'>
                        <input
                          type='date'
                          className={classes.textInput}
                          {...register('dateOfBirth', {
                            required: true,
                          })}
                        />
                      </Tooltip>
                      {errors.dateOfBirth && (
                        <FormHelperText>
                          Specify your date of birth
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientAddress)}
                    >
                      <input
                        className={classes.textInput}
                        {...register('clientAddress', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='Address'
                      />
                      {errors.clientAddress && (
                        <FormHelperText>
                          Specify your address
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientPostalCode)}
                    >
                      <input
                        className={classes.textInput}
                        type='number'
                        {...register('clientPostalCode', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='Postal Code'
                      />
                      {errors.clientPostalCode && (
                        <FormHelperText>
                          Specify postal code
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientCity)}
                    >
                      <input
                        className={classes.textInput}
                        type='text'
                        {...register('clientCity', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='City'
                      />
                      {errors.clientCity && (
                        <FormHelperText>Specify city</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientCountry)}
                    >
                      <input
                        className={classes.textInput}
                        type='text'
                        {...register('clientCountry', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='Country'
                      />
                      {errors.clientCountry && (
                        <FormHelperText>
                          Specify country
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientEmail)}
                    >
                      <input
                        className={classes.textInput}
                        type='email'
                        {...register('clientEmail', {
                          required: true,
                          maxLength: 50,
                        })}
                        placeholder='Email'
                      />
                      {errors.clientEmail && (
                        <FormHelperText>Specify email</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={4} sm={3}>
                    <Controller
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
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.clientPhone)}
                    >
                      <input
                        className={classes.textInput}
                        type='number'
                        {...register('clientPhone', {
                          required: true,
                          maxLength: 12,
                        })}
                        placeholder='Phone no'
                      />
                      {errors.clientPhone && (
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
                  {...register('subscribe')}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                  Submit
                </Button>
              </Grid>
              {/* //* End */}
            </Grid>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
}

export default AddTrip;
