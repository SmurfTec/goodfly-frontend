import React, { useContext } from 'react';

// --------- MUI ----------- //
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Person as PersonIcon } from '@material-ui/icons';
// ------------------------ //

import Page from 'components/common/Page';
import ProfileTabs from './ProfileTabs';
import { AuthContext } from 'Contexts/AuthContext';

const Index = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <Page title='Profile' description='Profile Page of User'>
      <Box mb={5} mt={10} display='flex' alignItems='center'>
        <Typography
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
            marginRight: 20,
            color: theme.palette.common.grey1,
          }}
          variant='h4'
        >
          <PersonIcon />
          My Profile
        </Typography>
        <Typography
          variant='h5'
          style={{
            border: '1px solid #ccc',
            width: 'fit-content',
            paddingInline: 20,
            color: theme.palette.common.grey1,
          }}
        >
          {user.loyaltyPoints} Points
        </Typography>
      </Box>
      <ProfileTabs user={user} />
    </Page>
  );
};

export default Index;
