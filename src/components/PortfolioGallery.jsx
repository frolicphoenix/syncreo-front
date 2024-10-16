// src/components/PortfolioGallery.jsx

import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const portfolioItems = [
  {
    image: 'https://via.placeholder.com/300',
    title: 'Artwork 1',
    description: 'Description of Artwork 1',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Artwork 2',
    description: 'Description of Artwork 2',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Artwork 3',
    description: 'Description of Artwork 3',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Artwork 4',
    description: 'Description of Artwork 4',
  },
  // Add more items as needed
];

const PortfolioGallery = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Portfolio
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {portfolioItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PortfolioGallery;
