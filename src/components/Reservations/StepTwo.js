import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import {
  CustomDatePicker,
  CustomInputField,
  CustomRadioGroup,
} from 'components/FormControls';

const StepTwo = ({ travellers, travellersForm }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();

  const watchAllFields = watch();
  // console.log('All Fields :', watchAllFields?.['emailRadio-1']);

  return (
    <form id='formTravellers' onSubmit={handleSubmit(travellersForm)}>
      <Grid container spacing={1}>
        {[...Array(travellers)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6}>
            <Paper
              elevation={0}
              sx={{ backgroundColor: '#fafafa', px: 2, py: 5 }}
            >
              <Typography variant='h5' sx={{ mb: 3, mt: 0 }}>
                Traveller {i + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    key={i}
                    name={`firstName-${i + 1}`}
                    label='First Name'
                    type='text'
                    register={register}
                    errors={errors}
                    errorMessage={`Specify first name of traveller ${
                      i + 1
                    }`}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    key={i}
                    name={`lastName-${i + 1}`}
                    label='Last Name'
                    type='text'
                    register={register}
                    errors={errors}
                    errorMessage={`Specify last name of traveller ${
                      i + 1
                    }`}
                  />
                </Grid>
                <Grid item xs={12} sm={7} sx={{ mt: 1 }}>
                  <CustomDatePicker
                    type='date'
                    label='Date Of Birth'
                    name={`dateOfBirth-${i + 1}`}
                    errors={errors}
                    errorMessage='Specify Date of birth'
                    register={register}
                  />
                </Grid>
                <Grid item xs={12} sm={5} sx={{ mt: 1 }}>
                  <CustomInputField
                    key={i}
                    name={`passportNumber-${i + 1}`}
                    label='Passport No.'
                    type='number'
                    register={register}
                    errors={errors}
                    errorMessage={`Specify passport no of traveller ${
                      i + 1
                    }`}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <CustomRadioGroup
                    name={`emailRadio-${i + 1}`}
                    control={control}
                    options={[
                      {
                        key: `traveller-${i + 1}-same`,
                        label: 'I have same email',
                        value: 'same',
                      },
                      {
                        key: `traveller-${i + 1}-different`,
                        label: 'I have different mail',
                        value: 'different',
                      },
                    ]}
                  />
                </Grid>
                {watchAllFields?.[`emailRadio-${i + 1}`] ===
                  'different' && (
                  <Grid item xs={12} sm={12}>
                    <CustomInputField
                      key={i}
                      name={`email-${i + 1}`}
                      label='Email'
                      type='email'
                      register={register}
                      errors={errors}
                      errorMessage={`Specify email of traveller ${
                        i + 1
                      }`}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={12}></Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} sm={12} sx={{ mt: 4 }}>
          <Button
            variant='contained'
            sx={{ width: 150 }}
            type='submit'
          >
            Validate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StepTwo;
