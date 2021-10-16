import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Button,
  Tabs,
  Tab,
  Paper,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import LoyaltyImg from 'Assets/img/loyaltyCard.jpg';
import { makeStyles } from '@material-ui/styles';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Addrounded from '@material-ui/icons/AddRounded';
import RemoveRounded from '@material-ui/icons/RemoveRounded';
import CommentsTab from './Comment';
import userImg from 'Assets/img/user1.png';
import { CustomRating } from 'components/FormControls';
import { useForm } from 'react-hook-form';
import { useStyles } from 'Styles/CreateTrip/FormStyles';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import ProductCard from './ProductCard';
import StoreSubNav from './StoreSubNav';

const styles = makeStyles((theme) => ({
  root: {
    '& h1, h2, h3, h4, h5': {
      textTransform: 'capitalize',
    },
  },
  tabs: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#e6e6e6',
    '& .Mui-selected': {
      backgroundColor: '#fafafa',
    },
  },
  carouselCard: {
    display: 'block',
    padding: 10,
    height: '100%',
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    },
  },
}));

const Comments = {
  userName: 'Ahmed',
  userImage: userImg,
  createdAt: '12-10-2011',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis tortor augue. Ut interdum, nisi in bibendum faucibus, purus nibh scelerisque turpis fermentum, fringilla dolor vel, sollicitudin ',
  rating: '3',
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          p={3}
          sx={{
            backgroundColor: '#fafafa',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ClientStore = ({ match }) => {
  const classes = styles();
  const formClasses = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm();
  const [product, setProduct] = useState({
    images: [{ url: LoyaltyImg }],
    price: 200,
    countInStock: 10,
    reviews: [],
    rating: 0,
    numReviews: 0,
    _id: '615a1ab8957a8e342485d89b',
    name: 'jeans',
    category: 'men',
    description: ' pants for men ',
    __v: 0,
  });

  const [noOfItem, setNoOfItem] = useState(1);
  const [quantity, setQuantity] = useState(10);

  const [tabValue, setTabValue] = React.useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submitFormData = async (data) => {
    console.log('Form Data :', data);
    reset({ commentRating: 1 });
  };
  const productClick = (e) => {
    const { productid } = e.currentTarget.dataset;
  };

  // const { id } = match.params;

  // ! Get the product of required product id
  // useEffect(() => {}, [id]);

  const changeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const increaseNoOfItems = () => {
    setNoOfItem(noOfItem + 1);
  };
  const decreaseNoOfItems = () => {
    setNoOfItem(noOfItem - 1);
  };

  return (
    <Container sx={{ mt: 5 }} className={classes.root}>
      <StoreSubNav />

      {/* //! BreadCrumbs */}

      <Box sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Card sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <CardMedia
                      sx={{ height: 400, position: 'relative' }}
                      image={LoyaltyImg}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Card
                          sx={{ boxShadow: 'none', borderRadius: 1 }}
                        >
                          <CardMedia
                            sx={{ height: 100, position: 'relative' }}
                            image={LoyaltyImg}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card
                          sx={{ boxShadow: 'none', borderRadius: 1 }}
                        >
                          <CardMedia
                            sx={{ height: 100, position: 'relative' }}
                            image={LoyaltyImg}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card
                          sx={{ boxShadow: 'none', borderRadius: 1 }}
                        >
                          <CardMedia
                            sx={{ height: 100, position: 'relative' }}
                            image={LoyaltyImg}
                          />
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card
                          sx={{ boxShadow: 'none', borderRadius: 1 }}
                        >
                          <CardMedia
                            sx={{ height: 100, position: 'relative' }}
                            image={LoyaltyImg}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ userSelect: 'none' }}>
            <Typography variant='h3'>{product.name}</Typography>
            <Typography
              variant='h4'
              color='text.secondary'
              sx={{ mt: 1 }}
            >
              {product.price}
            </Typography>
            <Typography variant='h5' sx={{ mt: 1 }}>
              {product.description}
            </Typography>
            <Typography variant='body1' sx={{ mt: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquam quis tortor fermentum, fringilla dolor vel,
              sollicitudin augue. Ut interdum, nisi in bibendum
              faucibus, purus nibh scelerisque turpis, condimentum
              vehicula est ex quis ante.
            </Typography>

            {/* <Typography variant='subtitle1' sx={{ mt: 3 }}>
              Quantity
            </Typography>
            <Select
              id='quantity'
              value={quantity}
              label='Quantity'
              onChange={changeQuantity}
              sx={{ minWidth: 250, mt: 1 }}
            >
              <MenuItem value={10}>250g</MenuItem>
              <MenuItem value={20}>300g</MenuItem>
              <MenuItem value={30}>500g</MenuItem>
            </Select> */}

            <Box
              sx={{
                mt: 5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              <IconButton
                sx={{ border: '1px solid #9f9f9f' }}
                color='primary'
                disabled={noOfItem <= 1}
                onClick={decreaseNoOfItems}
              >
                <RemoveRounded />
              </IconButton>
              <Typography variant='h4' sx={{ userSelect: 'none' }}>
                {noOfItem}
              </Typography>
              <IconButton
                sx={{ border: '1px solid #9f9f9f' }}
                color='primary'
                onClick={increaseNoOfItems}
              >
                <Addrounded />
              </IconButton>
            </Box>
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 3 }}
            >
              ADD TO CART
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 13 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor=''
          textColor='text.primary'
          centered
          variant='fullWidth'
          className={classes.tabs}
        >
          <Tab
            label='Description'
            className={
              tabValue === 0 ? classes.ActiveTab : classes.InActiveTab
            }
          />
          <Tab
            className={
              tabValue === 1 ? classes.ActiveTab : classes.InActiveTab
            }
            label='Comments'
          />
        </Tabs>
        <TabPanel value={tabValue} index={0} dir='x'>
          Description
          {/* <StagesTab stages={stages ? stages : []} /> */}
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir='x-reverse'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1' sx={{ mt: 5, mb: 8 }}>
                {product.reviews.length} reviews for this product
              </Typography>
              <CommentsTab {...Comments} />
              <CommentsTab {...Comments} />
              <CommentsTab {...Comments} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle1' sx={{ mt: 5, mb: 3 }}>
                Add a review
              </Typography>

              <Typography variant='h5' sx={{ mb: 1 }}>
                Your Rating
              </Typography>
              <form
                id='formopinion'
                onSubmit={handleSubmit((data) =>
                  submitFormData(data)
                )}
              >
                <CustomRating
                  name='commentRating'
                  control={control}
                  options={[1, 2, 3, 4, 5]}
                />
                <Typography variant='h5' sx={{ mt: 4, mb: 1 }}>
                  Your Opinion
                </Typography>
                <Paper
                  elevation={3}
                  sx={{
                    px: 2,
                    py: 3,
                    mt: 1,
                    '& textarea': {
                      resize: 'vertical',
                    },
                  }}
                >
                  <FormControl
                    fullWidth
                    error={Boolean(errors.opinionTextArea)}
                  >
                    <textarea
                      rows='15'
                      className={`${formClasses.textInput} ${classes.textArea}`}
                      {...register('opinionTextArea', {
                        required:
                          'Write something about the product to submit',
                      })}
                      placeholder='Give your opinion about the product...'
                    />
                    {errors?.opinionTextArea?.type === 'required' && (
                      <FormHelperText>
                        {errors?.opinionTextArea?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Paper>
                <Button
                  sx={{ mt: 4, minWidth: 150 }}
                  type='submit'
                  variant='contained'
                  form='formopinion'
                  color='primary'
                >
                  SUBMIT
                </Button>
              </form>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
      <Box sx={{ mt: 17 }}>
        <Typography
          variant='h4'
          fullWidth
          align='center'
          sx={{ my: 6 }}
        >
          Related Products
        </Typography>
        <CarouselLayout>
          {/* {blogs ? (
            blogs.map((blog) => (
              <div key={blog._id} className={classes.carouselCard}>
                <BlogCard blog={blog} handleClick={blogClick} />
              </div>
            ))
          ) : (
            <div className='loader'></div>
          )} */}

          <div className={classes.carouselCard}>
            <ProductCard
              product={product}
              handleClick={productClick}
            />
          </div>
          <div className={classes.carouselCard}>
            <ProductCard
              product={product}
              handleClick={productClick}
            />
          </div>
          <div className={classes.carouselCard}>
            <ProductCard
              product={product}
              handleClick={productClick}
            />
          </div>
          <div className={classes.carouselCard}>
            <ProductCard
              product={product}
              handleClick={productClick}
            />
          </div>
        </CarouselLayout>
      </Box>
    </Container>
  );
};

export default withRouter(ClientStore);
