import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Link } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import lotusIcon from '../pics/lotus.svg'; // Ensure correct path to the lotus SVG

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 50); // Elevates navbar when scrolling
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResourcesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setAnchorEl(null);
  };

  // Badge component for reuse
  const BetaBadge = () => (
    <Box
      sx={{
        backgroundColor: '#ff5252',
        color: 'white',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '5px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginLeft: 1,
      }}
    >
      Beta
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: elevated ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(8px)', // Subtle glassmorphism effect
        transition: 'all 0.3s ease',
        boxShadow: elevated ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: elevated ? '1px solid #ddd' : 'none',
        borderRadius: '0px 0px 10px 10px', // Soft rounded bottom edges
        minHeight: '45px', // Reduced height for a sleek navbar
      }}
    >
      <Toolbar
        sx={{
          maxWidth: '1100px',
          margin: 'auto',
          width: '100%',
          minHeight: '45px', // Ensuring reduced navbar height
          padding: '5px 15px', // Compact padding
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Logo and Title wrapped in a link */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link 
            href="/" 
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img src={lotusIcon} alt="Lotus Logo" style={{ height: '60px', width: 'auto' }} />
            <Typography
              variant="h6"
              sx={{
                color: '#222',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
                marginLeft: 1,
              }}
            >
              Data Catalog
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links aligned to the right */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {['Models', 'Contracts', 'Dictionary','Explorer'].map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="h6" sx={navItemStyle}>
                {item}
              </Typography>
            </Box>
          ))}

          {/* Dropdown for Resources */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={handleResourcesClick}
          >
            <Typography variant="body2" sx={navItemStyle}>
              Resources
            </Typography>
            <ArrowDropDownIcon sx={{ color: '#444' }} />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleResourcesClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
          >
            <MenuItem onClick={handleResourcesClose}>
              MetroMap
              <BetaBadge />
            </MenuItem>
            <MenuItem onClick={handleResourcesClose}>
              Catalog
              <BetaBadge />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styles for navigation links
const navItemStyle = {
  color: '#444',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '1.0rem', // Modern, smaller font size
  fontWeight: 500,
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '0%',
    height: '2px',
    background: '#444',
    transition: 'width 0.3s ease',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': { width: '100%' },
};

export default Navbar;
