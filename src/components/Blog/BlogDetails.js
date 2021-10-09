import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/system';
import {
  Typography,
  Container,
  Paper,
  Divider,
  Button,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { data } from './';
import { useForm } from 'react-hook-form';
import Comment from './Comment';
import { useStyles } from 'Styles/CreateTrip/FormStyles';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import BlogCard from './BlogCard';
import { styles } from 'Styles/Blog';

const BlogDetails = () => {
  const classes = styles();
  const [blog, setBlog] = useState(null);
  let { blogId } = useParams();
  const history = useHistory();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const submitFormData = (data) => {
    console.log('Form Data :', data);
  };

  const blogClick = (e) => {
    const { blogid } = e.currentTarget.dataset;
    history.push(`/blogs/${blogid}`);
  };

  useEffect(() => {
    const getblog = data.filter((b) => b.id.toString() === blogId);
    setBlog(...getblog);
    window.scrollTo(0, 0);
  }, [blogId]);
  return (
    <>
      {console.log(errors)}
      <Box sx={{ mt: 3 }}>
        <Box
          className={classes.bannerImg}
          sx={{
            backgroundImage: `url(${blog?.image})`,
          }}
        >
          <Box className={classes.bannerOverlay} />
          <Box className={classes.bannerContent}>
            <Box className={classes.blogBannerDate}>
              <Typography variant='subtitle2'>
                {blog?.date}
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 620, margin: '0 auto' }}>
              <Typography
                variant='h2'
                sx={{ color: '#fff ', mt: 2, fontStyle: 'normal' }}
              >
                {blog?.title}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant='h5' sx={{ color: '#fff' }}>
                {blog?.tag}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Container sx={{ mt: 8 }}>
        <Typography variant='subtitle2' color='text.secondary'>
          {blog?.content}
        </Typography>

        <Paper
          elevation={0}
          sx={{ backgroundColor: '#fafafa', p: 4, mt: 8 }}
        >
          <Typography
            variant='subtitle1'
            color='text.primary'
            align='center'
          >
            Comments (3)
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            sx={{ mt: 3 }}
          >
            3 comments for this article
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Comment />
            <Comment />
            <Comment />
            <br />
            <Divider sx={{ mt: 1 }} />
          </Box>

          <Box sx={{ mt: 6 }}>
            <Typography variant='subtitle2'>Add a comment</Typography>
            <Typography variant='subtitle1' sx={{ mt: 4 }}>
              Your comment
            </Typography>
            <form
              id='formComment'
              onSubmit={handleSubmit((data) => submitFormData)}
            >
              <Paper elevation={3} sx={{ px: 2, py: 3, mt: 1 }}>
                <FormControl
                  fullWidth
                  error={Boolean(errors.commentTextArea)}
                >
                  <textarea
                    rows='15'
                    className={`${useStyles().textInput} ${
                      classes.textArea
                    }`}
                    {...register('commentTextArea', {
                      required: 'Write your comment to submit',
                    })}
                    placeholder='Write something about the blog post...'
                  />
                  {errors?.commentTextArea?.type === 'required' && (
                    <FormHelperText>
                      {errors?.commentTextArea?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Paper>
              <Button
                sx={{ mt: 4, minWidth: 150 }}
                type='submit'
                variant='contained'
                form='formComment'
                color='primary'
              >
                SEND
              </Button>
            </form>
          </Box>
        </Paper>

        <Box sx={{ mt: 17 }}>
          <Typography
            variant='h4'
            fullWidth
            align='center'
            sx={{ my: 6 }}
          >
            Latest Articles Online
          </Typography>
          <CarouselLayout>
            {data.map((blog) => (
              <div key={blog.id} className={classes.carouselCard}>
                <BlogCard
                  id={blog.id}
                  image={blog.image}
                  tag={blog.tag}
                  date={blog.date}
                  title={blog.title}
                  handleClick={blogClick}
                />
              </div>
            ))}
          </CarouselLayout>
        </Box>
      </Container>
    </>
  );
};

export default BlogDetails;
