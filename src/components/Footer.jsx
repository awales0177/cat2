import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2">© 2025 My Info App. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
