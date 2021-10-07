import React from 'react';
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import TextIcon from '@material-ui/icons/Textsms';

import BlogCard from './BlogCard';
import BannerImg from 'Assets/img/airbaloon.jpg';
import LoyaltyImg from 'Assets/img/loyaltyCard.jpg';
import SkingImg from 'Assets/img/skyingFrance.jpg';
import JakartaImg from 'Assets/img/jakarta.jpg';
import MalaysianBeachesImg from 'Assets/img/malaysiaBeaches.jpg';
import TravelBagImg from 'Assets/img/travelBag.jpg';

import { styles } from 'Styles/Blog';

const data = [
  {
    image: LoyaltyImg,
    tag: 'News',
    date: '12 March 2021',
    title: 'Something new, with the loyalty card!',
  },
  {
    image: SkingImg,
    tag: 'Trendy activity',
    date: '12 May 2021',
    title: 'Skiing in France',
  },
  {
    image: JakartaImg,
    tag: 'Meet',
    date: '12 May 2021',
    title: 'Presentation of the GOODFLY guide in Indonesia',
  },
  {
    image: MalaysianBeachesImg,
    tag: 'Discovery',
    date: '12 May 2021',
    title: 'Top 10 Best Beaches in Malaysia',
  },
  {
    image: TravelBagImg,
    tag: 'Youtube',
    date: '12 May 2021',
    title: 'New video online on the Youtube channel!',
  },
];

const ClientBlog = () => {
  const classes = styles();
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
            {data.map((e, i) => (
              <Grid item xs={12} sm={i === 3 ? 8 : 4}>
                <BlogCard
                  image={e.image}
                  tag={e.tag}
                  date={e.date}
                  title={e.title}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Card className={classes.puclicationCard}>
          <Typography variant='h3' align='center'>
            ESPACE PUB
          </Typography>
        </Card>
        <Box sx={{ mb: 15 }}>
          <Grid container spacing={3}>
            {data.map((e, i) => (
              <Grid item xs={12} sm={i === 3 ? 8 : 4}>
                <BlogCard
                  image={e.image}
                  tag={e.tag}
                  date={e.date}
                  title={e.title}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ClientBlog;
