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
  TextField,
  FormGroup,
  Checkbox,
  x,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

  const [couponVal, setCoupon] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const handeSubmitForm = async (formData) => {
    setSubmitting(true);
    // console.log(`formData`, formData);
    data = { ...data, ...formData, trip: tour._id };
    // console.log(`data`, data);
    removeKeyIncludingString(data, '-');
    removeKeyIncludingString(data, 'numOfTravellers');
    // console.log(`data`, data);

    try {
      const resData = await makeReq(
        `/purchases`,
        {
          body: {
            ...data,
            tripId: tour._id,
            promoCode: couponVal && promoDiscount > 0 ? couponVal : undefined,
            useLoyaltyPoints: usePoints ? true : undefined,
          },
        },
        'POST'
      );
      // console.log(`resData`, resData);
      toast.info(
        'Your Reservation Request is send , Goodfly agent will contact you soon !'
      );

      updateMe(resData.user, true);

      setTimeout(() => {
        history.push('/profile');
      }, 1500);
    } catch (err) {
      handleCatch(err);
      setCoupon(0);
    } finally {
      console.log('changing submitting');
      setSubmitting(false);
    }
  };

  const handleCoupon = async () => {
    if (!couponVal) return;

    if (promoDiscount > 0) {
      setPromoDiscount(0);
      setCoupon('');
      return;
    }

    try {
      const { discount } = await makeReq(
        `/promos/apply`,
        { body: { promoCode: couponVal } },
        'POST'
      );
      setPromoDiscount(discount);
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
                          label='Pay by Paypal'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          value='card'
                          control={<Radio />}
                          label='I want to pay by Card'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                )}
              />
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={usePoints}
                        onChange={(e) => {
                          console.log('onchanges called');
                          console.log('e.target.checked', e.target.checked);
                          setUsePoints(e.target.checked);
                        }}
                      />
                    }
                    label='use your GOODFLY Fidelity points'
                  />
                </FormGroup>
                {!(tour.sale && new Date(tour.saleExpires) >= new Date()) && (
                  <Grid
                    container
                    sx={{
                      mt: 4,
                    }}
                  >
                    <Grid item xs={12} sm={6}>
                      <form>
                        <TextField
                          name='loyalty-points'
                          label='Coupon Code'
                          type='text'
                          errorMessage='Spacify your coupon code to get exclusive discount'
                          value={couponVal}
                          onChange={(e) => setCoupon(e.target.value)}
                          disabled={promoDiscount > 0}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={handleCoupon}
                        >
                          {promoDiscount > 0 ? 'Remove Coupon' : 'Apply Coupon'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TravelDetails
              tour={tour}
              travelers={travelers}
              payment={watchFields?.['paymentType']}
              usePoints={usePoints}
              promoDiscount={promoDiscount}
            />
            <Button
              form='paymentChoice'
              variant='contained'
              color='primary'
              type='submit'
              sx={{ mt: 3 }}
              fullWidth
              disabled={submitting}
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
