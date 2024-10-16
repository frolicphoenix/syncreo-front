// src/pages/Dashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get('/api/dashboard'); // Ensure this endpoint exists
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
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
          Failed to load dashboard. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Jobs Posted</Typography>
              <Typography variant="h4">{stats.totalJobsPosted}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {user.role === 'freelancer' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Proposals Submitted</Typography>
                  <Typography variant="h4">{stats.totalProposals}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Earnings</Typography>
                  <Typography variant="h4">${stats.totalEarnings}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        {user.role === 'client' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Active Projects</Typography>
                  <Typography variant="h4">{stats.activeProjects}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Spendings</Typography>
                  <Typography variant="h4">${stats.totalSpendings}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
