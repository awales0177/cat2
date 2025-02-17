import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Tooltip, styled } from '@mui/material';

import wideimg from '../pics/bckg3.jpg'; // Ensure correct image path

// Import your SVGs
import DataModelIcon from '../pics/datamodel.svg';
import DataSetIcon from '../pics/dataset.svg';
import ContractIcon from '../pics/contract.svg';
import DictionaryIcon from '../pics/dictionary.svg';


// Import the image
import ModelTriangle from '../pics/model-triangle.png'; // Ensure correct path

// Import Medallion Architecture SVGs
import BronzeIcon from '../pics/bronze.svg';
import SilverIcon from '../pics/silver.svg';
import GoldIcon from '../pics/gold.svg';

// Import Verified Account SVG
import VerifiedIcon from '../pics/verified.svg';

const chalkTextStyles = {
  fontFamily: "'Lato', sans-serif",
  color: 'white',
  textShadow: '2px 2px 6px rgba(255, 255, 255, 0.3)',
  letterSpacing: '0.5px',
};

const SplashPage = () => {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '200vh', width: '100vw', overflowX: 'hidden' }}>
      {/* Hero Section with Background Image & Left-Aligned Text */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '10%',
          backgroundImage: `url(${wideimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        <Box sx={{ maxWidth: '500px', textAlign: 'left' }}>
          <Typography variant="h3" fontWeight="bold" sx={chalkTextStyles}>
            Data Catalog
          </Typography>
          <Typography variant="h6" sx={{ ...chalkTextStyles, marginBottom: '20px' }}>
            A modern platform designed to present structured data models, datasets, and contracts. 🚀
          </Typography>
        </Box>
      </Box>

      {/* Main Content - White Background */}
      <Box sx={{ backgroundColor: 'white', padding: '50px 10vw', maxWidth: '100vw', overflowX: 'hidden' }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          sx={{ fontFamily: "'Lato', sans-serif", color: '#333', textAlign: 'center' }}
        >
          Explore Our Data Platform
        </Typography>

        {/* SVG Section */}
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/data-models')}>
            <img src={DataModelIcon} alt="Data Models" style={svgStyle} />
            <Typography variant="body1" sx={svgTextStyle}>
              Explore structured <b>Data Models</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/contracts')}>
            <img src={ContractIcon} alt="Contracts" style={svgStyle} />
            <Typography variant="body1" sx={svgTextStyle}>
              Define and review <b>Contracts</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} sx={svgContainerStyle} onClick={() => (window.location.href = '/contracts')}>
            <img src={DictionaryIcon} alt="Dict" style={svgStyle} />
            <Typography variant="body1" sx={svgTextStyle}>
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
          <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "'Lato', sans-serif", color: '#333' }}>
            Medallion Architecture
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "'Lato', sans-serif", color: '#555', maxWidth: '800px', margin: 'auto', marginTop: '10px' }}>
            The Medallion Architecture organizes data into **Bronze (Raw), Silver (Cleaned), and Gold (Refined) layers** for better quality and analytics.
          </Typography>
        </Box>

        {/* Medallion SVGs with Custom Tooltips */}
        <Grid container spacing={5} justifyContent="center" sx={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Raw JSON logs, CSV files, or unprocessed IoT data" arrow placement="top">
            <img src={BronzeIcon} alt="Bronze Layer" style={medallionStyle} />
            </CustomTooltip>
            <Typography variant="body1" sx={svgTextStyle}>
            <b>Bronze Layer:</b> Raw, unprocessed data.
            </Typography>
        </Grid>

        <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Filtered data with structured fields, cleaned for analysis" arrow placement="top">
            <img src={SilverIcon} alt="Silver Layer" style={medallionStyle} />
            </CustomTooltip>
            <Typography variant="body1" sx={svgTextStyle}>
            <b>Silver Layer:</b> Cleaned, structured data.
            </Typography>
        </Grid>

        <Grid item xs={12} sm={4} sx={svgContainerStyle}>
            <CustomTooltip title="Example: Aggregated reports, KPIs, or ML-ready datasets" arrow placement="top">
            <img src={GoldIcon} alt="Gold Layer" style={medallionStyle} />
            </CustomTooltip>
            <Typography variant="body1" sx={svgTextStyle}>
            <b>Gold Layer:</b> Aggregated, high-value data.
            </Typography>
        </Grid>
</Grid>

        {/* Verified Account Section */}
<Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ marginTop: '60px' }}>
  <Grid item xs={12} sm={1}>
    <img src={VerifiedIcon} alt="Verified Account" style={verifiedStyle} />
  </Grid>
  <Grid item xs={12} sm={6}>
    <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "'Lato', sans-serif", color: '#333' }}>
      How to Get a Verified Account
    </Typography>
    <Typography variant="body1" sx={{ fontFamily: "'Lato', sans-serif", color: '#555', marginTop: '10px' }}>
      Verification enhances trust and authenticity. To become verified:
      <ul>
        <li>Ensure your profile is fully completed with accurate details.</li>
        <li>Use an official email or link your account to a verified website.</li>
        <li>Engage actively in the platform by contributing high-quality data.</li>
        <li>Submit a verification request through the platform’s settings.</li>
      </ul>
      Once submitted, our team will review your request. If approved, you'll receive a **verified badge** next to your name.
    </Typography>
  </Grid>
</Grid>

      </Box>
    </Box>
  );
};

// ✅ Fix: **Defined missing styles**
const verifiedStyle = { width: '100px', height: '100px' };
const svgStyle = { width: '80px', height: '80px', transition: 'transform 0.3s ease-in-out' };
const medallionStyle = { width: '90px', height: '90px' };

const svgContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover img': { transform: 'scale(1.1)' },
};

const svgTextStyle = { fontFamily: "'Lato', sans-serif", color: '#444', marginTop: '10px', fontSize: '1rem' };

// Custom Styled Tooltip
const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: '#333', // Dark background
      color: '#fff', // White text
      fontSize: '0.95rem',
      padding: '10px 15px', // More spacing
      borderRadius: '8px', // Smooth edges
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Soft shadow
    },
    [`& .MuiTooltip-arrow`]: {
      color: '#333', // Match tooltip background
    },
  }));

const imageContainerStyle = { display: 'flex', justifyContent: 'center', marginTop: '50px' };
const imageStyle = { width: '100%', maxWidth: '1200px', borderRadius: '20px' };

export default SplashPage;
