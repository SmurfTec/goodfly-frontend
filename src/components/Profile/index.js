import React, { useContext } from 'react';

// --------- MUI ----------- //
import { Box, Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Person as PersonIcon } from '@material-ui/icons';
// ------------------------ //

import Page from 'components/common/Page';
import ProfileTabs from './ProfileTabs';
import { AuthContext } from 'Contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Page title={t('Profile')} description='Profile Page of User'>
      <Container mb={5} mt={10} display='flex' alignItems='center'>
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
          {user?.loyaltyPoints} Points
        </Typography>
        <ProfileTabs user={user} />
      </Container>
    </Page>
  );
};

export default Index;
