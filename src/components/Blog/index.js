import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/system';
import TextIcon from '@material-ui/icons/Textsms';

import BlogCard from './BlogCard';
import BannerImg from 'Assets/img/airbaloon.jpg';
import LoyaltyImg from 'Assets/img/loyaltyCard.jpg';
import SkingImg from 'Assets/img/skyingFrance.jpg';
import JakartaImg from 'Assets/img/jakarta.jpg';
import MalaysianBeachesImg from 'Assets/img/malaysiaBeaches.jpg';
import TravelBagImg from 'Assets/img/travelBag.jpg';

import styles from 'Styles/Blog';
import { makeReq, handleCatch } from 'Utils/constants';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';

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
        <Card sx={{ boxShadow: 'none' }}>
          <CardMedia
            sx={{ height: 250, position: 'relative' }}
            image={BannerImg}
          >
            <Typography
              variant='h3'
              className={classes.title}
              align='center'
              sx={{ mb: 1 }}
            >
              <TextIcon /> THE BLOG
            </Typography>
          </CardMedia>
        </Card>
        <Box mt={10}>
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
                blogs.slice(5, blogs.length).map((blog, i) => (
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
