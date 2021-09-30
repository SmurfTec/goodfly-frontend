import React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@material-ui/core';

const Page = ({ title, description, children }) => {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      {children}
    </Container>
  );
};

export default Page;
