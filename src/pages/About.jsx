// src/pages/About.jsx

import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Welcome to Syncreo! We connect talented freelancers with clients seeking creative and professional services.
      </Typography>
      {/* Add more content as needed */}
    </Container>
  );
};

export default About;
