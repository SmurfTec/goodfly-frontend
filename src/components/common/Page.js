import React from 'react';
import { Helmet } from 'react-helmet';
import { Container } from '@material-ui/core';

const Page = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
      </Helmet>
      {children}
    </>
  );
};

export default Page;
