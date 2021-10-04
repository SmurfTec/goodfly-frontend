import {
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Button,
} from '@material-ui/core';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomInputField } from 'components/FormControls';
import { Box } from '@material-ui/system';

const StepThree = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();
  const watchFields = watch();

  return (
    <>
      <Typography variant='subtitle2' sx={{ mb: 4, mt: 2, pl: 2 }}>
        Choose your payment method
      </Typography>
      <Paper
        elevation={0}
        sx={{ px: 4, py: 4, backgroundColor: '#fafafa' }}
      >
        <Controller
          name='paymentMethod'
          control={control}
          defaultValue='paypal'
          render={({ field }) => (
            <RadioGroup {...field} row>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    value='paypal'
                    control={<Radio />}
                    label='Paypal'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    value='fidelityPoints'
                    control={<Radio />}
                    label='Pay with your GOODFLY Fidelity points'
                  />

                  {watchFields?.['paymentMethod'] !== 'paypal' && (
                    <Grid
                      container
                      sx={{
                        mt: 4,
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <CustomInputField
                          name='couponCode'
                          label='Coupon Code'
                          type='text'
                          register={register}
                          errors={errors}
                          errorMessage='Spacify your coupon code to get exclusive discount'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Button
                            variant='outlined'
                            color='secondary'
                          >
                            Apply Coupon
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </RadioGroup>
          )}
        />
      </Paper>
    </>
  );
};

export default StepThree;
