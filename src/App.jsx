import React from 'react';
import Navbar from './components/Navbar';
import SplashPage from './components/SplashPage';
import MetroMap from './pages/MetroMap';
import DataDictionary from './pages/DataDictionary';

import Footer from './components/Footer';
import { Container, Box } from '@mui/material';

function App() {
  return (
    <div>
      <Navbar />
        <Box my={5}>
          <DataDictionary />
        </Box>
      <Footer />
    </div>
  );
}

export default App;
