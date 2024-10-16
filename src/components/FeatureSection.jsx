// src/components/FeatureSection.jsx

import React from 'react';
import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const features = [
  {
    title: 'Wide Range of Services',
    description: 'Access to a diverse pool of freelancers across various industries.',
  },
  {
    title: 'Secure Payments',
    description: 'Safe and reliable payment processing for all transactions.',
  },
  {
    title: 'Quality Assurance',
    description: 'Vetted freelancers ensuring top-notch quality for your projects.',
  },
  {
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock.',
  },
];

const FeatureSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#F2F2F2' }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <CheckCircle color="secondary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureSection;
