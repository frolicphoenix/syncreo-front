// src/pages/Proposals.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Proposals = () => {
  useContext(AuthContext);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProposals = async () => {
    try {
      const res = await axios.get('/api/proposals'); // Ensure this endpoint exists
      setProposals(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

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
          Failed to load proposals. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Your Proposals
      </Typography>
      {proposals.length === 0 ? (
        <Typography variant="body1" align="center" mt={5}>
          You haven't submitted any proposals yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {proposals.map((proposal) => (
            <Grid item xs={12} sm={6} md={4} key={proposal._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {proposal.job.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Budget: ${proposal.job.budget}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {proposal.coverLetter.substring(0, 100)}...
                  </Typography>
                  <Box mt={2}>
                    <Chip
                      label={proposal.status}
                      color={
                        proposal.status === 'Accepted'
                          ? 'success'
                          : proposal.status === 'Rejected'
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Proposals;
