import {
  Paper,
  Typography,
  RadioGroup,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CustomInputField } from 'components/FormControls';
import TotalBill from './TotalBill';
import BankTransferOption from './paymentStep/paymentOptions/BankTransferOption';
import PaypalOption from './paymentStep/paymentOptions/PaypalOption';
import LoyaltyPointsOption from './paymentStep/paymentOptions/LoyaltyPoints';
import { handleCatch, makeReq } from 'Utils/constants';
import { useTranslation } from 'react-i18next';

const Step3 = ({ validateStep, cart, deliveryMethod, loyaltyPoints }) => {
  const { handleSubmit, control, watch, register, errors } = useForm();
  const [dialog, setDialog] = React.useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const { t } = useTranslation();

  const values = ['card', 'bank', 'paypal', 'points'];

  const [postalAddress, setpostalAddress] = React.useState(
    'Lyon Librairie la bonne paye 50 rue delabarre 69008'
  );
  const watchPaymentOptions = watch('paymentMethod');
  const [submitting, setSubmitting] = useState(false);

  const [couponVal, setCoupon] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const handleDialogOpen = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const postalCodeValidate = (data) => {
    handleDialogClose();
    setpostalAddress(data?.postalAddress);
  };

  const travellersForm = (data) => {
    validateStep({
      ...data,
      promoCode: couponVal && promoDiscount > 0 ? couponVal : undefined,
    });
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
    <>
      <Grid container sx={{ mt: 5 }} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Typography variant='subtitle1' color='textSecondary'>
            {t('Choose the payment method')}
          </Typography>

          <Paper
            sx={{
              mt: 3,
              px: 3,
              py: 5,
              backgroundColor: '#fafafa',
              mb: 4,
            }}
          >
            <form id='formDelivery' onSubmit={handleSubmit(travellersForm)}>
              <Controller
                name='paymentMethod'
                control={control}
                defaultValue={values[0]}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <BankTransferOption value={values[1]} />
                    <PaypalOption value={values[2]} />
                    {/* <LoyaltyPointsOption value={values[3]} /> */}

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
                        label={t('use your GOODFLY Fidelity points')}
                      />
                    </FormGroup>

                    <Divider sx={{ my: 3, width: '100%' }} />
                  </RadioGroup>
                )}
              />
            </form>

            <Box display='flex' alignItems='center' gap='20px'>
              <Box item xs={12} sm={6}>
                <form>
                  <TextField
                    name='loyalty-points'
                    label={t('Coupon Code')}
                    type='text'
                    errorMessage={t(
                      'Specify your coupon code to get exclusive discount'
                    )}
                    value={couponVal}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={promoDiscount > 0}
                  />
                </form>
              </Box>
              <Box
                item
                xs={12}
                sm={6}
                style={{
                  alignItems: 'center',
                }}
              >
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={handleCoupon}
                >
                  {promoDiscount > 0 ? t('Remove Coupon') : t('Apply Coupon')}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} sx={{ mt: -9 }}>
          <TotalBill
            formName='formDelivery'
            cart={cart}
            paymentOption={watchPaymentOptions}
            loyaltyPoints={loyaltyPoints}
            deliveryMethod={deliveryMethod}
            promoDiscount={promoDiscount || 0}
            usePoints={usePoints}
          />
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth='md'
        // maxWidth='sm'
        open={dialog}
        onClose={handleDialogClose}
        aria-labelledby='form-dialog-title'
        sx={{
          '& form': {
            backgroundColor: '#f2f2f2',
          },
        }}
      >
        <form onSubmit={handleSubmit(postalCodeValidate)}>
          <DialogContent>
            <DialogContentText>
              Enter your postal code to find a relay point near you
            </DialogContentText>

            <Box
              sx={{
                mt: 3,
                '& p': {
                  display: 'none',
                },
              }}
            >
              <CustomInputField
                name='postalCode'
                label='Postal code'
                type='number'
                register={register}
                errors={errors}
                errorMessage='Specify the postal code'
                placeholder='Postal Code'
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color='primary'>
              Close
            </Button>
            <Button color='primary' type='submit'>
              Modify
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Step3;
