import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import lotusIcon from '../pics/lotus.svg'; // Ensure correct path to the lotus SVG

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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

  // Navigation items with their routes
  const navItems = [
    { label: 'Data Dictionary', path: '/data-dictionary' },
    { label: 'Data Contract', path: '/data-contract' },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: elevated 
          ? isDarkMode 
            ? 'rgba(18, 18, 18, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)'
          : isDarkMode
            ? 'rgba(18, 18, 18, 1)'
            : 'rgba(255, 255, 255, 1)',
        backdropFilter: 'blur(8px)', // Subtle glassmorphism effect
        transition: 'all 0.3s ease',
        boxShadow: elevated ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: elevated ? `1px solid ${isDarkMode ? '#333' : '#ddd'}` : 'none',
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
          <RouterLink 
            to="/" 
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img src={lotusIcon} alt="Lotus Logo" style={{ height: '60px', width: 'auto' }} />
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? '#ffffff' : '#222',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
                marginLeft: 1,
              }}
            >
              Data Catalog
            </Typography>
          </RouterLink>
        </Box>

        {/* Navigation Links aligned to the right */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
          {navItems.map((item) => (
            <RouterLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant="h6"
                sx={{
                  ...navItemStyle,
                  color: location.pathname === item.path 
                    ? isDarkMode ? '#ffffff' : '#000'
                    : isDarkMode ? '#b3b3b3' : '#444',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              >
                {item.label}
              </Typography>
            </RouterLink>
          ))}

          {/* Theme Toggle Button */}
          <IconButton
            onClick={() => {
              const newMode = isDarkMode ? 'light' : 'dark';
              localStorage.setItem('themeMode', newMode);
              window.location.reload();
            }}
            sx={{
              color: isDarkMode ? '#ffffff' : '#444',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

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
            <Typography 
              variant="body2" 
              sx={{
                ...navItemStyle,
                color: isDarkMode ? '#b3b3b3' : '#444',
              }}
            >
              Resources
            </Typography>
            <ArrowDropDownIcon sx={{ color: isDarkMode ? '#b3b3b3' : '#444' }} />
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
            PaperProps={{
              sx: {
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#222222',
              }
            }}
          >
            <MenuItem 
              component={RouterLink} 
              to="/metro-map"
              onClick={handleResourcesClose}
              sx={{
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              MetroMap
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
    transition: 'width 0.3s ease',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': { width: '100%' },
};

export default Navbar;
