// src/components/Footer.jsx

import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © {new Date().getFullYear()} SYNCREO. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Built with '}
          <Link color="inherit" href="https://reactjs.org/">
            React
          </Link>
          {', '}
          <Link color="inherit" href="https://mui.com/">
            Material-UI
          </Link>
          {', and '}
          <Link color="inherit" href="https://www.mongodb.com/">
            MongoDB
          </Link>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
