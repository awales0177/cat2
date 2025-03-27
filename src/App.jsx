import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SplashPage from './components/SplashPage';
import DataDictionary from './pages/DataDictionary';
import MetroMap from './pages/MetroMap';
import DataContractPage from './pages/DataContractPage';

const App = () => {
  // Get initial theme from localStorage or default to light
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Update theme when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="/data-dictionary" element={<DataDictionary />} />
              <Route path="/data-contract" element={<DataContractPage />} />
              <Route path="/metro-map" element={<MetroMap />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
