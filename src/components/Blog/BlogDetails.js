import React, { useContext, useEffect, useState } from 'react';
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
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Comment from './Comment';
import { useStyles as styles } from 'Styles/CreateTrip/FormStyles';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import BlogCard from './BlogCard';
import useStyles from 'Styles/Blog';
import { handleCatch, makeReq } from 'Utils/constants';
import useGlobalClasses from 'Hooks/useGlobalClasses';
import Page from 'components/common/Page';
import { AuthContext } from 'Contexts/AuthContext';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const BlogDetails = ({ match, history, location }) => {
  const { t } = useTranslation();
  const globalClasses = useGlobalClasses();
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const formClasses = styles();

  const [blog, setBlog] = useState();
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

  const { id } = match.params;

  useEffect(() => {
    (async () => {
      try {
        const resData = await makeReq(`/blogs/${id}`);
        // console.log(`resData`, resData);
        setBlog(resData.blog);
        window.scrollTo(0, 0);
      } catch (err) {
        handleCatch(err);
        setTimeout(() => {
          history.push('/blogs');
        }, 1500);
      }
    })();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const submitFormData = async (data) => {
    // console.log('Form Data :', data);

    //  * If User is NOT Logged In , redirect to login
    if (!user) {
      history.push(`/auth/login?redirect=${location.pathname}`);
      return;
    }

    try {
      const resData = await makeReq(
        `/blogs/${id}/comment`,
        {
          body: { text: data.commentTextArea },
        },
        'POST'
      );

      toast.info('Your Comment will be shown once validated by our Goodfly Te');
      // setBlog((st) => ({
      //   ...st,
      //   comments: [...st.comments, newComment],
      // }));

      reset();
    } catch (err) {}
  };

  const blogClick = (e) => {
    const { blogid } = e.currentTarget.dataset;
    history.push(`/blogs/${blogid}`);
  };

  return (
    <>
      {blog ? (
        <Page title={`Blog | ${blog.title}`}>
          <Box sx={{ mt: 3 }}>
            <Box
              className={classes.bannerImg}
              sx={{
                backgroundImage: `url(${blog?.images[0]})`,
              }}
            >
              <Box className={classes.bannerOverlay} />
              <Box className={classes.bannerContent}>
                <Box className={classes.blogBannerDate}>
                  <Typography variant='subtitle2'>
                    {new Date(blog?.createdAt).toDateString()}
                  </Typography>
                </Box>
                <Box sx={{ maxWidth: 620, margin: '0 auto' }}>
                  <Typography
                    variant='h2'
                    sx={{
                      color: '#fff ',
                      mt: 2,
                      fontStyle: 'normal',
                    }}
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
          <Container sx={{ mt: 8 }} className={globalClasses.MainContainer}>
            {parse(blog.content)}
            <Paper
              elevation={0}
              sx={{ backgroundColor: '#fafafa', p: 4, mt: 8 }}
            >
              <Typography
                variant='subtitle1'
                color='text.primary'
                align='center'
              >
                {t('Comments')} {blog.comments.length}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                sx={{ mt: 3 }}
              >
                {blog.comments.length} {t('comments for this article')}
              </Typography>
              <Box sx={{ mt: 4 }}>
                {blog.comments.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
                <br />
                <Divider sx={{ mt: 1 }} />
              </Box>

              <Box sx={{ mt: 6 }}>
                <Typography variant='subtitle2'>Add a comment</Typography>
                <Typography variant='subtitle1' sx={{ mt: 4 }}>
                  {t('Your comment')}
                </Typography>
                <form
                  id='formComment'
                  onSubmit={handleSubmit((data) => submitFormData(data))}
                >
                  <Paper elevation={3} sx={{ px: 2, py: 3, mt: 1 }}>
                    <FormControl
                      fullWidth
                      error={Boolean(errors.commentTextArea)}
                    >
                      <textarea
                        rows='15'
                        className={`${formClasses.textInput} ${classes.textArea}`}
                        {...register('commentTextArea', {
                          required: 'Write your comment to submit',
                        })}
                        placeholder={t(
                          'Write something about the blog post...'
                        )}
                      />
                      {errors?.commentTextArea?.type === 'required' && (
                        <FormHelperText>
                          {t(errors?.commentTextArea?.message)}
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
                    {t('SEND')}
                  </Button>
                </form>
              </Box>
            </Paper>
            <Box sx={{ mt: 17 }}>
              <Typography variant='h4' fullWidth align='center' sx={{ my: 6 }}>
                {t('Latest Articles Online')}
              </Typography>
              <CarouselLayout>
                {blogs ? (
                  blogs.map((blog) => (
                    <div key={blog._id} className={classes.carouselCard}>
                      <BlogCard blog={blog} handleClick={blogClick} />
                    </div>
                  ))
                ) : (
                  <div className='loader'></div>
                )}
              </CarouselLayout>
            </Box>
          </Container>
        </Page>
      ) : (
        <div className='loader'></div>
      )}
    </>
  );
};

export default withRouter(BlogDetails);
