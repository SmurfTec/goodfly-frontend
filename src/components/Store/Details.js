import React, { useContext, useEffect, useState } from 'react';
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
import { handleCatch, makeReq } from 'Utils/constants';
import { StoreContext } from 'Contexts/StoreContext';

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
  const { addItemToCart } = useContext(StoreContext);

  const { id } = match.params;
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm();
  const [product, setProduct] = useState();
  const [relatedProjects, setRelatedProjects] = useState();

  const [noOfItem, setNoOfItem] = useState(1);
  const [quantity, setQuantity] = useState(10);

  const [tabValue, setTabValue] = React.useState(1);

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/products/${id}`);
        setProduct(resData.product);
      } catch (err) {
        setProduct(404);
        handleCatch(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    (async () => {
      try {
        const resData = await makeReq(`/products?category=${product.category}`);

        setRelatedProjects(resData.products.filter((p) => p._id !== id));
      } catch (err) {
        handleCatch(err);
      }
    })();
  }, [product]);

  const handleAddToCart = () => {
    addItemToCart(product, noOfItem);
  };

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
        {product ? (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Card sx={{ boxShadow: 'none', borderRadius: 1 }}>
                      <CardMedia
                        sx={{
                          height: 400,
                          position: 'relative',
                          backgroundSize: 'contain',
                        }}
                        image={product?.images?.[0]}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box>
                      <Grid container spacing={2}>
                        {product.images.slice(1, 4).map((image) => (
                          <Grid item xs={6} sm={3}>
                            <Card
                              sx={{
                                boxShadow: 'none',
                                borderRadius: 1,
                              }}
                            >
                              <CardMedia
                                sx={{
                                  height: 100,
                                  position: 'relative',
                                }}
                                image={image}
                              />
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ userSelect: 'none' }}>
              {product ? (
                product === 404 ? (
                  <div>404</div>
                ) : (
                  <div>
                    <Typography variant='h3'>{product.name}</Typography>
                    <Typography
                      variant='h4'
                      color='text.secondary'
                      sx={{ mt: 1 }}
                    >
                      {product.price}
                    </Typography>
                    <Typography variant='h5' sx={{ mt: 1 }}>
                      Origin : {product.region}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 3 }}>
                      {product.description.slice(0, 238)}
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
                        disabled={noOfItem >= 10}
                      >
                        <Addrounded />
                      </IconButton>
                    </Box>
                    <Button
                      variant='contained'
                      color='primary'
                      sx={{ mt: 3 }}
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </Button>
                  </div>
                )
              ) : (
                <div className='loader'></div>
              )}
            </Grid>
          </Grid>
        ) : (
          <div className='loader'></div>
        )}
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
            className={tabValue === 0 ? classes.ActiveTab : classes.InActiveTab}
          />
          <Tab
            className={tabValue === 1 ? classes.ActiveTab : classes.InActiveTab}
            label='Comments'
          />
        </Tabs>
        <TabPanel value={tabValue} index={0} dir='x'>
          {product?.description}
          {/* <StagesTab stages={stages ? stages : []} /> */}
        </TabPanel>
        <TabPanel value={tabValue} index={1} dir='x-reverse'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {product ? (
                <>
                  <Typography variant='subtitle1' sx={{ mt: 5, mb: 8 }}>
                    {product.reviews.length} reviews for this product
                  </Typography>
                  {product.reviews.map((review) => (
                    <CommentsTab {...review} />
                  ))}
                </>
              ) : (
                <div className='loader'></div>
              )}
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
                onSubmit={handleSubmit((data) => submitFormData(data))}
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
                        required: 'Write something about the product to submit',
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
        <Typography variant='h4' fullWidth align='center' sx={{ my: 6 }}>
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

          {relatedProjects ? (
            <div className={classes.carouselCard}>
              {relatedProjects.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className='loader'></div>
          )}
        </CarouselLayout>
      </Box>
    </Container>
  );
};

export default withRouter(ClientStore);
