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

const ClientBlog = () => {
  const classes = styles();
  const history = useHistory();

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
    <>
      <Container sx={{ mt: 4 }}>
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
      </Container>
      <Container sx={{ mt: 13 }}>
        <Box>
          <Grid container spacing={3}>
            {blogs ? (
              blogs.length > 0 ? (
                blogs.map((blog, i) => (
                  <Grid
                    key={blog._id}
                    item
                    xs={12}
                    sm={i === 3 ? 8 : 4}
                  >
                    <BlogCard blog={blog} handleClick={blogClick} />
                  </Grid>
                ))
              ) : (
                <Typography variant='h5'>
                  No Blogs Available
                </Typography>
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
      </Container>
    </>
  );
};

export default ClientBlog;
