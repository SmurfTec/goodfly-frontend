import React, { useState } from 'react';

import {
  Grid,
  Typography,
  Box,
  CardMedia,
  Button,
  Switch,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import UseToggle from 'Hooks/useToggle';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import { toast } from 'react-toastify';
import CarouselLayout from 'components/common/Carousel/CarouselLayout';
import { makeStyles } from '@material-ui/styles';
import v4 from 'uuid/dist/v4';
import { purple } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  Switch: {
    color: `${theme.palette.common.white} !important`,

    '&$checked + $track': {
      opacity: '1 !important',
      backgroundColor: `${theme.palette.success.main} !important`,
    },
  },
  checked: {
    opacity: '1 !important',
    color: `${theme.palette.common.white} !important`,
  },
  track: {
    opacity: '1 !important',
    backgroundColor: `${theme.palette.error.main} !important`,
  },
  mainBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 20,
  },
  image: {
    minHeight: 130,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `3px dashed #fff`,
    borderRadius: '10px',
    width: 200,
  },
}));

const Attachments = ({ attachments, pushAttachment, removeAttachment }) => {
  const classes = useStyles();

  const [isImageUploading, toggleImageUploading] = UseToggle(false);
  const { t } = useTranslation();
  const [uploadingText, setUploadingText] = useState('Uploading Image...');

  const handleImage = async (e) => {
    setUploadingText('Uploading Image ...');
    toggleImageUploading();
    const selectedFile = e.target.files[0];
    const fileType = ['image/'];
    console.log(`e.target.files[0].size`, e.target.files[0].size);
    try {
      console.log(`selectedFile.type`, selectedFile.type);
      if (selectedFile && selectedFile.type.includes(fileType)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async (e) => {
          console.log(`result onLoadEnd`, e.target.result);
          const file = e.target.result;

          // TODO  Delete Image from cloudinary if it exists on this user

          // // * 1 Upload Image on Cloudinary
          const formData = new FormData();
          formData.append('file', file);
          formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
          );
          const uploadedImage = res.data.url;
          console.log(`res`, res);

          setUploadingText('Updating Image ...');
          pushAttachment({ image: uploadedImage, _id: v4() });
          toggleImageUploading();
        };
      } else {
        toast.error('Only Image files are acceptable !');
        toggleImageUploading();
      }
    } catch (err) {
      toast(
        err?.response?.data?.message || err.message || 'Something Went Wrong'
      );
      toggleImageUploading();

      console.log(`err`, err);
    }
  };

  return (
    <Box className={classes.mainBox}>
      <Typography variant='h3' style={{ width: '100%' }}>
        {t('Attachments')}
      </Typography>
      <Typography variant='subtitle' style={{ width: '100%' }} component='h5'>
        {t('Max Size')} : 5MB
        <br />
        {t('Extensions')} (jpg,jpeg,png,ico)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <CarouselLayout>
            {attachments.map((attachment, i) => (
              <div key={attachment._id} className={classes.carouselCard}>
                <CardMedia
                  style={{ height: '10rem' }}
                  image={attachment.image}
                  title='Live from space album cover'
                />
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {!attachment.isVerified && (
                    <Button
                      onClick={removeAttachment.bind(this, attachment._id)}
                      style={{ color: 'red' }}
                    >
                      {t('Delete')}
                    </Button>
                  )}
                  <Switch
                    classes={{
                      switchBase: classes.Switch,
                      checked: classes.checked,
                      track: classes.track,
                    }}
                    checked={attachment.isVerified}
                    disabled
                    inputProps={{
                      'aria-label': 'controlled',
                    }}
                  />
                </Box>
              </div>
            ))}
          </CarouselLayout>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <LoadingOverlay
            active={isImageUploading}
            spinner
            text={uploadingText}
          >
            <Box
              style={{
                backgroundColor: '#808080',
                borderRadius: '10px',
              }}
            >
              <Box style={{ padding: '0.2rem' }}>
                <Box>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    onChange={handleImage}
                    type='file'
                    name='photo'
                  />
                  <label
                    htmlFor='contained-button-file'
                    style={{ cursor: 'pointer' }}
                  >
                    <Box className={classes.image}>
                      <Box>
                        <Add style={{ color: '#fff' }} />
                      </Box>
                      <Box style={{ textAlign: 'center' }}>
                        <Typography style={{ color: '#fff' }}>
                          {t('Upload Document')}
                        </Typography>
                      </Box>
                    </Box>
                  </label>{' '}
                </Box>
              </Box>
            </Box>
          </LoadingOverlay>{' '}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Attachments;
