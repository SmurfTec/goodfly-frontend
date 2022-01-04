import React, { useContext } from 'react';

// * ----- MUI STUFF------ //
import { Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import FlashOnIcon from '@material-ui/icons/FlashOn';
// * ------------ //

import useStyles from './styles';
import ProductsCarousel from './ProductsCarousel';
import ProductCard from './ProductCard';
import { StoreContext } from 'Contexts/StoreContext';
import Page from 'components/common/Page';
import StoreSubNav from './StoreSubNav';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import SearchBar from 'components/common/Search';
import StoreProducts from './StoreProducts';

const Index = () => {
  const classes = useStyles();
  const { products, productCategories } = useContext(StoreContext);
  const globalClasses = useGlobalClasses();

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e) => {
    let newVal = e.target.value;
    setSearch(newVal);
  };

  return (
    <Page title='GoodFly |  Store'>
      <div>
        <Box className={classes.root}>
          <Box className={classes.mainFeaturedPost}>
            <section className={classes.title}>
              <Typography variant='h3'>
                GOODFLY STORE
                <FlashOnIcon sx={{ marginLeft: 2 }} />
              </Typography>
              <SearchBar
                search={search}
                handleSearchChange={handleSearchChange}
              />
            </section>

            <section className={classes.description}>
              <Typography variant='h3'>Discover our range</Typography>
              <Typography variant='h3'>Ethical Products</Typography>
            </section>
          </Box>
        </Box>
        <Container>
          <StoreSubNav />

          {products ? (
            !search && (
              <ProductsCarousel products={products} classes={classes} />
            )
          ) : (
            <div className='loader'></div>
          )}
          <Box marginTop={5}></Box>
          <StoreProducts
            productCategories={productCategories}
            products={products}
            searchVal={search}
          />
          <div className={globalClasses.spaceSection}>
            <Typography variant='h5'>PUB SPACE</Typography>
          </div>
          <Grid container spacing={4}>
            {products?.slice(0, 4).map((product) => (
              <Grid item xs={6} sm={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Page>
  );
};

export default Index;
