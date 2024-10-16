// src/pages/Profile.jsx

import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    certifications: '',
    portfolio: '',
    resume: '',
    customURL: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/auth/profile'); // Ensure this endpoint exists
      setProfileData({
        name: res.data.name || '',
        email: res.data.email || '',
        skills: res.data.skills ? res.data.skills.join(', ') : '',
        experience: res.data.experience || '',
        certifications: res.data.certifications ? res.data.certifications.join(', ') : '',
        portfolio: res.data.portfolio || '',
        resume: res.data.resume || '',
        customURL: res.data.customURL || '',
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('email', profileData.email);
    formData.append('skills', profileData.skills);
    formData.append('experience', profileData.experience);
    formData.append('certifications', profileData.certifications);
    formData.append('portfolio', profileData.portfolio);
    formData.append('resume', profileData.resume);
    formData.append('customURL', profileData.customURL);

    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      await axios.put('/api/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile updated successfully.');
      loadUser(); // Refresh user data
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response.data.message || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Profile
      </Typography>
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      {success && <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert>}
      <Box mt={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Profile Picture */}
            <Grid item xs={12} sm={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={user.profilePicUrl} // Ensure `profilePicUrl` is provided by backend
                  alt={user.name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Button variant="contained" component="label">
                  Upload Picture
                  <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
                </Button>
              </Box>
            </Grid>

            {/* Profile Details */}
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    required
                    disabled // Typically, email is not editable
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Skills (comma separated)"
                    name="skills"
                    value={profileData.skills}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Certifications (comma separated)"
                    name="certifications"
                    value={profileData.certifications}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Portfolio URL"
                    name="portfolio"
                    value={profileData.portfolio}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Resume URL"
                    name="resume"
                    value={profileData.resume}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Custom URL"
                    name="customURL"
                    value={profileData.customURL}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    helperText="Unique identifier for your profile (e.g., janesmith)"
                  />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button type="submit" variant="contained" color="primary" disabled={updating}>
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
