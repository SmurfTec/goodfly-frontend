import {
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Button,
  Container,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomInputField } from 'components/FormControls';
import { Box } from '@material-ui/system';
import { TravelDetails } from './TravelDetails';
import { removeKeyIncludingString } from 'Utils/objectMethods';
import { handleCatch, makeReq } from 'Utils/constants';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import { AuthContext } from 'Contexts/AuthContext';

const StepThree = ({ tour, travelers, data }) => {
  const { updateMe } = useContext(AuthContext);
  const history = useHistory();
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    watch,
  } = useForm();
  const watchFields = watch();

  const handeSubmitForm = async (formData) => {
    // console.log(`formData`, formData);
    data = { ...data, ...formData, trip: tour._id };
    // console.log(`data`, data);
    removeKeyIncludingString(data, '-');
    removeKeyIncludingString(data, 'numOfTravellers');
    // console.log(`data`, data);

    try {
      const resData = await makeReq(
        `/purchases`,
        { body: { ...data, tripId: tour._id } },
        'POST'
      );
      // console.log(`resData`, resData);
      toast.info(
        'Your Reservation Request is send , Goodfly agent will contact you soon !'
      );

      updateMe(resData.user, true);

      history.push('/tours/ethical');
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <form id='paymentChoice' onSubmit={handleSubmit(handeSubmitForm)}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography variant='subtitle2' sx={{ mb: 4, mt: 2, pl: 2 }}>
              Choose your payment method
            </Typography>
            <Paper
              elevation={0}
              sx={{ px: 4, py: 4, backgroundColor: '#fafafa' }}
            >
              <Controller
                name='paymentType'
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

                        {watchFields?.['paymentType'] !== 'paypal' && (
                          <Grid
                            container
                            sx={{
                              mt: 4,
                            }}
                          >
                            <Grid item xs={12} sm={6}>
                              <CustomInputField
                                name='loyalty-points'
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
                                <Button variant='outlined' color='secondary'>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TravelDetails tour={tour} travelers={travelers} />
            <Button
              form='paymentChoice'
              variant='contained'
              color='primary'
              type='submit'
              sx={{ mt: 3 }}
              fullWidth
            >
              Finish Reservation
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default StepThree;
