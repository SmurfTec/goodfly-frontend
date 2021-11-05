import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from 'Styles/Blog';
import { Box } from '@material-ui/system';

const BlogCard = ({ blog, handleClick }) => {
  const classes = styles();
  const { _id, keywords, createdAt, images, title } = blog;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick} data-blogid={_id}>
        <CardMedia
          sx={{ height: 330, position: 'relative' }}
          image={images[0]}
          title={title}
        >
          <span className={classes.overlay} />
          <Box className={classes.cardDate}>
            <Typography variant='subtitle2'>
              {new Date(createdAt).toDateString()}
            </Typography>
          </Box>
          <Typography
            variant='h5'
            className={`${classes.title} ${classes.tag}`}
          ></Typography>
          <Box className={classes.title}>
            <Typography variant='h5' sx={{ fontStyle: 'italic' }}>
              {keywords.map((keyword) => `${keyword}{' '}`)}
            </Typography>
            <Typography variant='h4'>{title}</Typography>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
