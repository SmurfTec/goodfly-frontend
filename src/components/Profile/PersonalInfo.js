import React, { useContext, useEffect, useState } from 'react';

// --------- MUI ----------- //
import {
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  CheckCircleOutlineOutlined as CheckCircleOutlineOutlinedIcon,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  Save,
} from '@material-ui/icons';
import { AuthContext } from 'Contexts/AuthContext';
import Attachments from './Attachments';
import useArray from 'Hooks/useArray';
import { getMuiDateFormat } from 'Utils/constants';
// ------------------------ //

const useStyles = makeStyles((theme) => ({
  FormControl: {
    '& .MuiButtonBase-root': {
      color: `${theme.palette.common.grey2} !important`,
    },
    '& legend': {
      color: `${theme.palette.common.grey2} !important`,
    },
  },
}));

const PersonalInfo = () => {
  const classes = useStyles();
  const [
    attachments,
    setAttachments,
    pushAttachment,
    ,
    updateAttachment,
    removeAttachment,
    ,
  ] = useArray([], '_id');
  const { user, updateMe } = useContext(AuthContext);

  const [state, setState] = useState({
    civility: '',
    birthName: '',
    spouseName: '',
    isVerified: '',
    telephoneNumber: '',
    name: '',
    telephoneLineNumber: '',
    address: '',
    additionalAddress: '',
    dateOfBirth: '2021-10-01',
    postalCode: '',
    city: '',
    country: '',
    nationality: '',
    passportNumber: '',
    passportDateOfIssue: '2021-10-01',
    passportPlaceOfIssue: '',
    attatchments: '',
    socialLogin: '',
    facebookProfile: '',
    instagramProfile: '',
    twitterProfile: '',
    snapChatProfile: '',
  });

  useEffect(() => {
    setAttachments(user?.attachments || []);
    setState({
      ...user,
      dateOfBirth: getMuiDateFormat(user.dateOfBirth),
      passportDateOfIssue: getMuiDateFormat(user.passportDateOfIssue),
    });
  }, [user]);

  const handleChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateMe({ ...state, attachments });
  };

  return (
    <Container>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <FormControl
          component='fieldset'
          size='small'
          className={classes.FormControl}
        >
          <FormLabel component='legend'>Civility</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='pronoun'
            value={state.pronoun}
            onChange={handleChange}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              value='Mr'
              control={<Radio size='small' />}
              label='Mr'
            />
            <FormControlLabel
              value='Mrs'
              control={<Radio size='small' />}
              label='Mrs'
            />
            <FormControlLabel
              value='Ms'
              control={<Radio size='small' />}
              label='Miss'
            />
          </RadioGroup>
        </FormControl>
        <Typography
          variant='p'
          fontWeight='bold'
          style={{ display: 'flex', alignItems: 'center' }}
          size='small'
        >
          Validate <CheckCircleOutlineOutlinedIcon />
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
      >
        <TextField
          name='firstName'
          value={state.firstName}
          onChange={handleChange}
          id='standard-basic'
          label='First Name'
          variant='standard'
        />
        <TextField
          name='lastName'
          value={state.lastName}
          onChange={handleChange}
          id='standard-basic'
          label='Last Name'
          variant='standard'
        />
        <TextField
          name='spouseName'
          value={state.spouseName}
          onChange={handleChange}
          id='standard-basic'
          label='Spouse Name'
          variant='standard'
        />
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
        mt={3}
        mb={5}
      >
        <TextField
          name='email'
          value={state.email}
          onChange={handleChange}
          id='standard-basic'
          label='Email'
          variant='standard'
        />{' '}
        <TextField
          name='telephoneNumber'
          value={state.telephoneNumber}
          onChange={handleChange}
          id='standard-basic'
          label='Telephone Number'
          variant='standard'
          type='number'
        />
        <TextField
          name='telephoneLineNumber'
          value={state.telephoneLineNumber}
          onChange={handleChange}
          id='standard-basic'
          label='Landline Telephone'
          variant='standard'
          type='number'
        />
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
      >
        <Box flexBasis='40%'>
          <TextField
            name='address'
            value={state.address}
            onChange={handleChange}
            id='standard-basic'
            label='Address'
            variant='standard'
            fullWidth
          />
        </Box>
        <Box flexBasis='40%'>
          <TextField
            name='additionalAddress'
            value={state.additionalAddress}
            onChange={handleChange}
            id='standard-basic'
            label='Additional Address'
            variant='standard'
            fullWidth
          />
        </Box>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
        mt={5}
      >
        <Box flexBasis='50%'>
          <TextField
            name='postalCode'
            value={state.postalCode}
            onChange={handleChange}
            id='standard-basic'
            label='Postal Code'
            variant='standard'
            type='number'
            style={{ marginRight: 50 }}
          />
          <TextField
            name='city'
            value={state.city}
            onChange={handleChange}
            id='standard-basic'
            label='City'
            variant='standard'
          />
        </Box>
        <Box flexBasis='40%'>
          <TextField
            name='country'
            value={state.country}
            onChange={handleChange}
            id='standard-basic'
            label='Country'
            variant='standard'
            fullWidth
          />
        </Box>
      </Box>

      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
        mt={5}
      >
        <Box flexBasis='50%'>
          <TextField
            name='dateOfBirth'
            value={state.dateOfBirth}
            onChange={handleChange}
            id='standard-basic'
            label='Date of Birth'
            variant='standard'
            style={{ marginRight: 50 }}
            type='date'
          />
          <TextField
            name='nationality'
            value={state.nationality}
            onChange={handleChange}
            id='standard-basic'
            label='Nationality'
            variant='standard'
          />
        </Box>
        <Box flexBasis='40%'></Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWra='wrap'
        mt={5}
      >
        <Box flexBasis='50%'>
          <TextField
            name='passportNumber'
            value={state.passportNumber}
            onChange={handleChange}
            id='standard-basic'
            label='Passport Number'
            variant='standard'
            style={{ marginRight: 50 }}
          />
          <TextField
            name='passportDateOfIssue'
            value={state.passportDateOfIssue}
            onChange={handleChange}
            id='standard-basic'
            label='Passport Date Of Issue'
            variant='standard'
            type='date'
          />
        </Box>
        <Box flexBasis='40%'>
          <TextField
            name='passportPlaceOfIssue'
            value={state.passportPlaceOfIssue}
            onChange={handleChange}
            id='standard-basic'
            label='Passport Place Of Issue'
            variant='standard'
          />
        </Box>
      </Box>
      <Box
        mt={5}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        flexWrap='wrap'
      >
        <Box display='flex' flexDirection='column'>
          <Facebook />
          <TextField
            name='facebookProfile'
            value={state.facebookProfile}
            onChange={handleChange}
            id='standard-basic'
            label='Facebook'
            variant='standard'
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Instagram />
          <TextField
            name='instagramProfile'
            value={state.instagramProfile}
            onChange={handleChange}
            id='standard-basic'
            label='Instagram'
            variant='standard'
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Twitter />
          <TextField
            name='twitterProfile'
            value={state.twitterProfile}
            onChange={handleChange}
            id='standard-basic'
            label='Twitter'
            variant='standard'
          />
        </Box>
        <Box display='flex' flexDirection='column'>
          <LinkedIn />
          <TextField
            name='snapChatProfile'
            value={state.snapChatProfile}
            onChange={handleChange}
            id='standard-basic'
            label='Snapchat'
            variant='standard'
          />
        </Box>
      </Box>

      <Attachments
        user={user}
        attachments={attachments}
        classes={classes}
        pushAttachment={pushAttachment}
        removeAttachment={removeAttachment}
      />

      <Button
        startIcon={<Save />}
        variant='contained'
        color='primary'
        style={{
          marginTop: '1rem',
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Container>
  );
};

export default PersonalInfo;
