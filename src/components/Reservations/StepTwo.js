import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import {
  CustomDatePicker,
  CustomInputField,
  CustomRadioGroup,
} from 'components/FormControls';
import { dateBeforeToday } from 'Utils/formValidations';
import { useTranslation } from 'react-i18next';

const StepTwo = ({ data, submitForm, defaultStep2Values }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: defaultStep2Values && defaultStep2Values,
  });

  const watchAllFields = watch();
  const { t } = useTranslation();
  // console.log('All Fields :', watchAllFields?.['emailRadio-1']);

  // useEffect(() => {
  //   if (data.numOfTravellers === 0) submitForm(data);
  // }, [data]);

  return (
    <form id='formTravellers' onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={1}>
        {[...Array(data.numOfTravellers)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6}>
            <Paper
              elevation={0}
              sx={{ backgroundColor: '#fafafa', px: 2, py: 5 }}
            >
              <Typography variant='h5' sx={{ mb: 3, mt: 0 }}>
                {t('Traveller')} {i + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    key={i}
                    name={`firstName-${i + 1}`}
                    label={t('First Name')}
                    type='text'
                    register={register}
                    errors={errors}
                    errorMessage={`${t('Specify first name of traveller')} ${
                      i + 1
                    }`}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    key={i}
                    name={`lastName-${i + 1}`}
                    label={t('Last Name')}
                    type='text'
                    register={register}
                    errors={errors}
                    errorMessage={`${t('Specify last name of traveller')} ${
                      i + 1
                    }`}
                  />
                </Grid>
                <Grid item xs={12} sm={7} sx={{ mt: 1 }}>
                  <CustomDatePicker
                    type='date'
                    label={t('Date Of Birth')}
                    name={`dateOfBirth-${i + 1}`}
                    errors={errors}
                    errorMessage={t('Specify Date of birth')}
                    register={register}
                    validation={dateBeforeToday}
                    validationMessage={t('Date of birth must be before today')}
                  />
                </Grid>
                <Grid item xs={12} sm={5} sx={{ mt: 1 }}>
                  <CustomInputField
                    key={i}
                    name={`passportNumber-${i + 1}`}
                    label={t('Passport No')}
                    type='text'
                    register={register}
                    errors={errors}
                    errorMessage={`${t('Specify passport no of traveller')} ${
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
                        label: t('I have same email'),
                        value: 'same',
                      },
                      {
                        key: `traveller-${i + 1}-different`,
                        label: t('I have different mail'),
                        value: 'different',
                      },
                    ]}
                  />
                </Grid>
                {watchAllFields?.[`emailRadio-${i + 1}`] === 'different' && (
                  <Grid item xs={12} sm={12}>
                    <CustomInputField
                      key={i}
                      name={`email-${i + 1}`}
                      label={t('Email')}
                      type='email'
                      register={register}
                      errors={errors}
                      errorMessage={`${t('Specify email of traveller')} ${
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
          <Button variant='contained' sx={{ width: 150 }} type='submit'>
            {t('Validate')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StepTwo;
