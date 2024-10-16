// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F3D56', // Deep Indigo
    },
    secondary: {
      main: '#0ABAB5', // Vibrant Teal
    },
    error: {
      main: '#D7263D', // Crimson Red
    },
    warning: {
      main: '#FFC107', // Golden Yellow
    },
    info: {
      main: '#B39CD0', // Soft Lavender
    },
    success: {
      main: '#FF6F61', // Warm Coral
    },
    background: {
      default: '#F2F2F2', // Light Stone
      paper: '#FFFFFF',
    },
    text: {
      primary: '#6E7E85', // Slate Gray
      secondary: '#3F3D56', // Deep Indigo
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    // Define other heading styles similarly...
  },
  // You can add more customizations here (e.g., components, spacing)
});

export default theme;
