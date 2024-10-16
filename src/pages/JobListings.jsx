// src/pages/JobListings.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs'); // Ensure this endpoint exists in your backend
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const applyToJob = async (jobId) => {
    try {
      const res = await axios.post(`/api/jobs/${jobId}/apply`); // Ensure this endpoint exists
      alert('Successfully applied to the job!');
    } catch (err) {
      console.error('Error applying to job:', err);
      alert('Failed to apply to the job.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center" mt={5}>
          Failed to load jobs. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Available Jobs
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {job.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {job.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description.substring(0, 100)}...
                </Typography>
                <Typography variant="subtitle2" mt={2}>
                  Budget: ${job.budget}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => applyToJob(job._id)}>
                  Apply
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobListings;
