// src/components/Testimonials.jsx

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';

const testimonials = [
  {
    name: 'Client A',
    feedback: 'Syncreo connected us with amazing freelancers who delivered exceptional work on time.',
    avatar: 'https://via.placeholder.com/100',
  },
  {
    name: 'Freelancer B',
    feedback: 'Working with clients through Syncreo has been a seamless and rewarding experience.',
    avatar: 'https://via.placeholder.com/100',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#FFFFFF' }}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Users Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  "{testimonial.feedback}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
