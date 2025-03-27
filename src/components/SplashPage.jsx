import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Tooltip, styled, useTheme } from '@mui/material';
import {
  Storage as DataModelIcon,
  Description as ContractIcon,
  MenuBook as DictionaryIcon,
  VerifiedUser as VerifiedIcon,
  AccountCircle as BronzeIcon,
  AccountCircle as SilverIcon,
  AccountCircle as GoldIcon,
} from '@mui/icons-material';
import { colors } from '../theme';

// Import logos for different modes
import DarkLogo from '../pics/logo-dark.png';  // Replace with your dark mode logo path
import LightLogo from '../pics/logo-light.png'; // Replace with your light mode logo path

import wideimg from '../pics/bckg3.jpg'; // Ensure correct image path

// Import the image
import ModelTriangle from '../pics/model-triangle.png'; // Ensure correct path

// Import Medallion Architecture SVGs
import BronzeIconSVG from '../pics/bronze.svg';
import SilverIconSVG from '../pics/silver.svg';
import GoldIconSVG from '../pics/gold.svg';

const SplashPage = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getColor = (path) => {
    const [category, subcategory, type] = path.split('.');
    if (!colors[category] || !colors[category][subcategory] || !colors[category][subcategory][type]) {
      console.warn(`Invalid color path: ${path}`);
      return '#000000'; // Fallback color
    }
    return colors[category][subcategory][type][isDarkMode ? 'dark' : 'light'];
  };

  const chalkTextStyles = {
    fontFamily: "'Lato', sans-serif",
    color: 'white',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
    letterSpacing: '0.5px',
  };

  return (
    <Box sx={{ 
      backgroundColor: getColor('background.default'), 
      minHeight: '200vh', 
      width: '100vw', 
      overflowX: 'hidden' 
    }}>
      {/* Hero Section with Bull Nose Curve */}
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: isDarkMode ? colors.background.hero.dark : colors.background.hero.light,
          overflow: 'hidden',
        }}
      >
        {/* Bull Nose Curve Background Element */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '80%',
            height: '80%',
            backgroundColor: isDarkMode ? colors.background.hero.dark : colors.background.hero.light,
            borderRadius: '100% 0 0 0',
            transform: 'translate(40%, 40%)',
            boxShadow: colors.shadows.text[isDarkMode ? 'dark' : 'light'],
          }}
        />

        {/* Logo */}
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 2,
            width: '150px', // Adjust based on your logo size
            height: 'auto',
          }}
        >
          <img
            src={isDarkMode ? DarkLogo : LightLogo}
            alt="Logo"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Hero Content */}
        <Box 
          sx={{ 
            maxWidth: '800px', 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            padding: '0 20px',
          }}
        >
          <Typography 
            variant="h2" 
            fontWeight="bold" 
            sx={{ 
              fontFamily: "'Lato', sans-serif",
              color: getColor('text.hero.title'),
              marginBottom: '15px',
              textShadow: colors.shadows.text[isDarkMode ? 'dark' : 'light'],
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
            }}
          >
            Data Catalog
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: "'Lato', sans-serif",
              color: getColor('text.hero.subtitle'),
              marginBottom: '25px',
              textShadow: colors.shadows.text[isDarkMode ? 'dark' : 'light'],
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            }}
          >
            A modern platform designed to present structured data models, datasets, and contracts. 🚀
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "'Lato', sans-serif",
              color: getColor('text.hero.body'),
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}
          >
            Discover, understand, and manage your data assets with our comprehensive catalog solution.
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        backgroundColor: isDarkMode ? colors.background.dark : colors.background.light,
        padding: '50px 10vw', 
        maxWidth: '100vw', 
        overflowX: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          sx={{ 
            fontFamily: "'Lato', sans-serif", 
            color: isDarkMode ? colors.text.primary.dark : colors.text.primary.light,
            textAlign: 'center' 
          }}
        >
          Explore Our Data Platform
        </Typography>

        {/* SVG Section */}
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/data-dictionary')}>
            <DataModelIcon sx={{ ...iconStyle, color: isDarkMode ? colors.icons.primary.dark : colors.icons.primary.light }} />
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              Explore structured <b>Data Models</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/data-contract')}>
            <ContractIcon sx={{ ...iconStyle, color: isDarkMode ? colors.icons.primary.dark : colors.icons.primary.light }} />
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              Define and review <b>Contracts</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/data-dictionary')}>
            <DictionaryIcon sx={{ ...iconStyle, color: isDarkMode ? colors.icons.primary.dark : colors.icons.primary.light }} />
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              Explore the <b>Data Dictionary</b>
            </Typography>
          </Grid>
        </Grid>

        {/* Wide Image Section with Rounded Edges */}
        <Box sx={imageContainerStyle}>
          <img src={ModelTriangle} alt="Data Model Triangle" style={imageStyle} />
        </Box>

        {/* Medallion Architecture Section */}
        <Box sx={{ textAlign: 'center', marginTop: '60px' }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ 
              fontFamily: "'Lato', sans-serif", 
              color: isDarkMode ? colors.text.primary.dark : colors.text.primary.light
            }}
          >
            Medallion Architecture
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "'Lato', sans-serif", 
              color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light,
              maxWidth: '800px', 
              margin: 'auto', 
              marginTop: '10px' 
            }}
          >
            The Medallion Architecture organizes data into Bronze (Raw), Silver (Cleaned), and Gold (Refined) layers for better quality and analytics.
          </Typography>
        </Box>

        {/* Medallion Icons with Custom Tooltips */}
        <Grid container spacing={5} justifyContent="center" sx={{ marginTop: '30px' }}>
          <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Raw JSON logs, CSV files, or unprocessed IoT data" arrow placement="top">
              <BronzeIcon sx={{ ...medallionIconStyle, color: isDarkMode ? colors.icons.medallion.bronze.dark : colors.icons.medallion.bronze.light }} />
            </CustomTooltip>
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              <b>Bronze Layer:</b> Raw, unprocessed data.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Filtered data with structured fields, cleaned for analysis" arrow placement="top">
              <SilverIcon sx={{ ...medallionIconStyle, color: isDarkMode ? colors.icons.medallion.silver.dark : colors.icons.medallion.silver.light }} />
            </CustomTooltip>
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              <b>Silver Layer:</b> Cleaned, structured data.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Aggregated reports, KPIs, or ML-ready datasets" arrow placement="top">
              <GoldIcon sx={{ ...medallionIconStyle, color: isDarkMode ? colors.icons.medallion.gold.dark : colors.icons.medallion.gold.light }} />
            </CustomTooltip>
            <Typography variant="body1" sx={{ ...svgTextStyle, color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light }}>
              <b>Gold Layer:</b> Aggregated, high-value data.
            </Typography>
          </Grid>
        </Grid>

        {/* Verified Account Section */}
        <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ marginTop: '60px' }}>
          <Grid item xs={12} sm={1}>
            <VerifiedIcon sx={{ ...verifiedIconStyle, color: isDarkMode ? colors.icons.verified.dark : colors.icons.verified.light }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                color: isDarkMode ? colors.text.primary.dark : colors.text.primary.light
              }}
            >
              How to Get a Verified Account
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                color: isDarkMode ? colors.text.secondary.dark : colors.text.secondary.light,
                marginTop: '10px' 
              }}
            >
              Verification enhances trust and authenticity. To become verified:
              <ul>
                <li>Ensure your profile is fully completed with accurate details.</li>
                <li>Use an official email or link your account to a verified website.</li>
                <li>Engage actively in the platform by contributing high-quality data.</li>
                <li>Submit a verification request through the platform's settings.</li>
              </ul>
              Once submitted, our team will review your request. If approved, you'll receive a verified badge next to your name.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Updated styles for icons
const iconStyle = {
  width: '80px',
  height: '80px',
  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
};

const medallionIconStyle = {
  width: '90px',
  height: '90px',
  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
};

const verifiedIconStyle = {
  width: '100px',
  height: '100px',
  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
};

const svgContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover .MuiSvgIcon-root': { transform: 'scale(1.1)' },
};

const svgTextStyle = { 
  fontFamily: "'Lato', sans-serif", 
  marginTop: '10px', 
  fontSize: '1rem' 
};

// Custom Styled Tooltip
const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff',
      color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#000000',
      fontSize: '0.95rem',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    [`& .MuiTooltip-arrow`]: {
      color: theme.palette.mode === 'dark' ? '#2d2d2d' : '#ffffff',
    },
  }));

const imageContainerStyle = { display: 'flex', justifyContent: 'center', marginTop: '50px' };
const imageStyle = { width: '100%', maxWidth: '1200px', borderRadius: '20px' };

export default SplashPage;
