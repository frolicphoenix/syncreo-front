// src/pages/NotFound.jsx

import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        Sorry, the page you're looking for doesn't exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
