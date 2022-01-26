import React, { useContext } from 'react';

// * ----- MUI STUFF------ //
import { Container, Grid, Skeleton, Typography } from '@material-ui/core';
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
import { useTranslation } from 'react-i18next';

const Index = () => {
  const classes = useStyles();
  const { products, productCategories } = useContext(StoreContext);
  const globalClasses = useGlobalClasses();
  const { t } = useTranslation();

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e) => {
    let newVal = e.target.value;
    setSearch(newVal);
  };

  return (
    <Page title={`GoodFly |  ${t('Store')}`}>
      <div>
        <Box className={classes.root}>
          <Box className={classes.mainFeaturedPost}>
            <section className={classes.title}>
              <Typography variant='h3'>
                {/* {`GOODFLY ${t('Store').toUpperCase()}`} */}
                GOODFLY STORE
                <FlashOnIcon sx={{ marginLeft: 2 }} />
              </Typography>
              <SearchBar
                search={search}
                handleSearchChange={handleSearchChange}
              />
            </section>

            <section className={classes.description}>
              <Typography variant='h3'>{t('Discover our range')}</Typography>
              <Typography variant='h3'>{t('Ethical Products')}</Typography>
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
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Skeleton variant='rect' height={300} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant='rect' height={300} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Skeleton variant='rect' height={300} />
              </Grid>
            </Grid>
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
