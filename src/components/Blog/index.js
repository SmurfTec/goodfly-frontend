import React, { useEffect, useState } from 'react';
import { Container, Card, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/system';

import BlogCard from './BlogCard';
import BannerImg from 'Assets/img/airbaloon.jpg';

import styles from 'Styles/Blog';
import { makeReq, handleCatch } from 'Utils/constants';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';
import Banner from 'components/common/tours/Banner';

const ClientBlog = () => {
  const classes = styles();
  const history = useHistory();
  const globalClasses = useGlobalClasses();

  const [blogs, setBlogs] = useState();

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/blogs`);
        // console.log(`resData`, resData);
        setBlogs(resData.blogs);
      } catch (err) {
        handleCatch(err);
        setBlogs([]);
      }
    })();
  }, []);

  const blogClick = (e) => {
    const { blogid } = e.currentTarget.dataset;
    history.push(`/blogs/${blogid}`);
  };

  return (
    <Page title='GoodFly | Blogs'>
      <Container className={globalClasses.MainContainer}>
        <Banner
          imageUrl={BannerImg}
          bannerTitle='Blogs'
          align='left'
          noAdvisor
        />
        <Box>
          <Grid container spacing={3}>
            {blogs ? (
              blogs.length > 0 ? (
                blogs.slice(0, 5).map((blog, i) => (
                  <Grid key={blog._id} item xs={12} sm={i === 3 ? 8 : 4}>
                    <BlogCard blog={blog} handleClick={blogClick} />
                  </Grid>
                ))
              ) : (
                <Typography variant='h5'>No Blogs Available</Typography>
              )
            ) : (
              <div className='loader'></div>
            )}
          </Grid>
        </Box>
        <Card className={classes.puclicationCard}>
          <Typography variant='h3' align='center'>
            ESPACE PUB
          </Typography>
        </Card>
        <Box mt={10}>
          <Grid container spacing={3}>
            {blogs ? (
              blogs.length > 0 ? (
                blogs.slice(5).map((blog, i) => (
                  <Grid key={blog._id} item xs={12} sm={i === 3 ? 8 : 4}>
                    <BlogCard blog={blog} handleClick={blogClick} />
                  </Grid>
                ))
              ) : (
                <Typography variant='h5'>No Blogs Available</Typography>
              )
            ) : (
              <div className='loader'></div>
            )}
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default ClientBlog;
