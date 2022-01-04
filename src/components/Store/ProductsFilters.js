import React, { useState, useEffect } from 'react';
import v4 from 'uuid/dist/v4';

// * ----- MUI STUFF------ //
import {
  Grid,
  Typography,
  Slider,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
  Box,
} from '@material-ui/core';
// * ------------ //
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  PriceSlider: {
    '&.MuiSlider-root': {
      color: `#ccc !important`,
    },
  },
  Input: {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
    '& .MuiRadio-root': {
      color: theme.palette.text.secondary,
      borderColor: theme.palette.text.secondary,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.text.secondary,
      borderColor: theme.palette.text.secondary,
    },
  },
}));

const ProductsFilters = React.memo(
  ({ productCategories, setFilteredProducts, products }) => {
    const [priceFilter, setPriceFilter] = useState([0, 1000]);

    const [productSort, setProductSort] = useState(1);
    const [productCategory, setProductCategory] = useState(1);

    const classes = useStyles();

    const handlePriceSort = (event) => {
      let newProducts = products;
      const newValue = event.target.value * 1;
      setProductSort(newValue);
      // * Sort Price
      newProducts = newProducts.sort((a, b) =>
        a.price >= b.price ? newValue : -newValue
      );
      setFilteredProducts(newProducts);
    };

    const handlePriceCategory = (event) => {
      let newProducts = products;
      console.log(`newProducts`, newProducts);
      setProductCategory(event.target.value);
      // * Make Temp products

      // * Filter by Category
      if (event.target.value !== 'all')
        newProducts = newProducts.filter(
          (product) => product.category._id === event.target.value
        );
      console.log(`newProducts1`, newProducts);

      setFilteredProducts(newProducts);
    };

    const handlePriceFilterChange = (event, newValue) => {
      setPriceFilter(newValue);
    };
    const valuetext = (value) => `${value} $`;

    const applyFilter = () => {
      // * Make Temp products
      let newProducts = products;

      // * Filter Price by Value
      newProducts = newProducts.filter(
        (product) =>
          product.price >= priceFilter[0] && product.price <= priceFilter[1]
      );

      console.log(`newProducts`, newProducts);
      setFilteredProducts(newProducts);
    };

    useEffect(() => {
      console.log('component rerendered');
    });

    return (
      <Grid item xs={6} sm={3}>
        <Box>
          <Typography id='range-slider' gutterBottom>
            Filter by Price
          </Typography>
          <Slider
            value={priceFilter}
            onChange={handlePriceFilterChange}
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            getAriaValueText={valuetext}
            min={0}
            max={1000}
            step={10}
            className={classes.PriceSlider}
          />
          <Box
            display='flex'
            flexDirection='row'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='h5' color='textSecondary'>
              {`${priceFilter[0]}$ - ${priceFilter[1]} $`}
            </Typography>
            <Button
              variant='outlined'
              className={classes.Input}
              onClick={applyFilter}
            >
              FILTER
            </Button>
          </Box>
        </Box>
        <Box marginTop={5}>
          <FormControl component='fieldset' className={classes.Input}>
            <Typography variant='h5'>Sort By Price</Typography>
            <RadioGroup
              aria-label='sort'
              name='sortPrice'
              value={productSort}
              onChange={handlePriceSort}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label='Ascending'
              />
              <FormControlLabel
                value={-1}
                control={<Radio />}
                label='Descending'
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box marginTop={5}>
          <FormControl component='fieldset' className={classes.Input}>
            <Typography variant='h5'>Sort By Category</Typography>
            <RadioGroup
              aria-label='sort'
              name='sortCategory'
              value={productCategory}
              onChange={handlePriceCategory}
            >
              <FormControlLabel value='all' control={<Radio />} label='All' />
              {productCategories
                ? productCategories.map((cat) => (
                    <FormControlLabel
                      key={cat._id}
                      value={cat._id}
                      control={<Radio />}
                      label={cat.name}
                    />
                  ))
                : Array(15)
                    .fill()
                    .map(() => (
                      <Skeleton
                        key={v4()}
                        variant='rect'
                        width={200}
                        height={20}
                        style={{
                          marginBottom: '1rem',
                        }}
                      />
                    ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
    );
  }
);

export default ProductsFilters;
