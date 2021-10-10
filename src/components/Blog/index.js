import React from 'react';
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

import { styles } from 'Styles/Blog';

export const data = [
  {
    id: 34234523453452,
    image: LoyaltyImg,
    tag: 'News',
    date: '12 March 2021',
    title: 'Something new, with the loyalty card!',
    content:
      'To put down economic hardships. For the feasibility, the bow or the time range, the lion is the financing of the free, it needs time itself but not the vehicle. Curabitur at enim at lacus porta viverra. Curabitur sed auctor leo. The mass of the bow, the element of the sauce layer and, the layer of the chemical lakes. Even any mass agency, from the entrance to the airport. Now great now, as the author of the football players, the Bureau of Performance.',
  },
  {
    id: 34234523453454,
    image: SkingImg,
    tag: 'Trendy activity',
    date: '12 May 2021',
    title: 'Skiing in France',
    content:
      'To put down economic hardships. For the feasibility, the bow or the time range, the lion is the financing of the free, it needs time itself but not the vehicle. Curabitur at enim at lacus porta viverra. Curabitur sed auctor leo. The mass of the bow, the element of the sauce layer and, the layer of the chemical lakes. Even any mass agency, from the entrance to the airport. Now great now, as the author of the football players, the Bureau of Performance.',
  },
  {
    id: 34234523453456,
    image: JakartaImg,
    tag: 'Meet',
    date: '12 May 2021',
    title: 'Presentation of the GOODFLY guide in Indonesia',
    content:
      'To put down economic hardships. For the feasibility, the bow or the time range, the lion is the financing of the free, it needs time itself but not the vehicle. Curabitur at enim at lacus porta viverra. Curabitur sed auctor leo. The mass of the bow, the element of the sauce layer and, the layer of the chemical lakes. Even any mass agency, from the entrance to the airport. Now great now, as the author of the football players, the Bureau of Performance.',
  },
  {
    id: 34234523453458,
    image: MalaysianBeachesImg,
    tag: 'Discovery',
    date: '12 May 2021',
    title: 'Top 10 Best Beaches in Malaysia',
    content:
      'To put down economic hardships. For the feasibility, the bow or the time range, the lion is the financing of the free, it needs time itself but not the vehicle. Curabitur at enim at lacus porta viverra. Curabitur sed auctor leo. The mass of the bow, the element of the sauce layer and, the layer of the chemical lakes. Even any mass agency, from the entrance to the airport. Now great now, as the author of the football players, the Bureau of Performance.',
  },
  {
    id: 34234523453459,
    image: TravelBagImg,
    tag: 'Youtube',
    date: '12 May 2021',
    title: 'New video online on the Youtube channel!',
    content:
      'To put down economic hardships. For the feasibility, the bow or the time range, the lion is the financing of the free, it needs time itself but not the vehicle. Curabitur at enim at lacus porta viverra. Curabitur sed auctor leo. The mass of the bow, the element of the sauce layer and, the layer of the chemical lakes. Even any mass agency, from the entrance to the airport. Now great now, as the author of the football players, the Bureau of Performance.',
  },
];

const ClientBlog = () => {
  const classes = styles();
  const history = useHistory();

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
            {data.map((e, i) => (
              <Grid key={e.id} item xs={12} sm={i === 3 ? 8 : 4}>
                <BlogCard
                  id={e.id}
                  image={e.image}
                  tag={e.tag}
                  date={e.date}
                  title={e.title}
                  handleClick={blogClick}
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
              <Grid key={e.id} item xs={12} sm={i === 3 ? 8 : 4}>
                <BlogCard
                  id={e.id}
                  image={e.image}
                  tag={e.tag}
                  date={e.date}
                  title={e.title}
                  handleClick={blogClick}
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
