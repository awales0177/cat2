import { createTheme } from '@mui/material/styles';

// Define color palette
const colors = {
  // Background colors
  background: {
    dark: '#121212',  // Darker background for better contrast
    light: '#ffffff',
    hero: {
      dark: '#1a1a1a',
      light: '#ffffff',  // Pure white for light mode hero
    },
    tooltip: {
      dark: '#2d2d2d',
      light: '#ffffff',  // White for light mode tooltip
    },
  },
  // Text colors
  text: {
    primary: {
      dark: '#ffffff',  // Pure white for better readability
      light: '#000000',  // Pure black for better contrast
    },
    secondary: {
      dark: '#b3b3b3',  // Lighter gray for secondary text
      light: '#333333',  // Dark gray for secondary text
    },
    body: {
      dark: '#e0e0e0',  // Light gray for body text
      light: '#000000',  // Black for body text
    },
    hero: {
      title: {
        dark: '#ffffff',
        light: '#000000',  // Black text for light mode
      },
      subtitle: {
        dark: '#e0e0e0',
        light: '#333333',  // Dark gray for light mode
      },
      body: {
        dark: '#b3b3b3',
        light: '#333333',  // Dark gray for light mode
      },
    },
  },
  // Icon colors
  icons: {
    primary: {
      dark: '#b3b3b3',
      light: '#333333',  // Dark gray for icons
    },
    medallion: {
      bronze: {
        dark: '#cd7f32',  // Bronze color
        light: '#cd7f32',
      },
      silver: {
        dark: '#c0c0c0',  // Silver color
        light: '#c0c0c0',
      },
      gold: {
        dark: '#ffd700',  // Gold color
        light: '#ffd700',
      },
    },
    verified: {
      dark: '#4caf50',  // Green for verified status
      light: '#4caf50',
    },
  },
  // Shadows
  shadows: {
    text: {
      dark: '2px 2px 4px rgba(0,0,0,0.3)',
      light: '2px 2px 4px rgba(0,0,0,0.1)',
    },
    tooltip: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
};

// Create theme components configuration
const themeComponents = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: '0.95rem',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: colors.shadows.tooltip,
      },
    },
  },
};

// Create dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.background.dark,
      paper: colors.background.dark,
    },
    text: {
      primary: colors.text.primary.dark,
      secondary: colors.text.secondary.dark,
    },
  },
  components: {
    ...themeComponents,
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...themeComponents.MuiTooltip.styleOverrides.tooltip,
          backgroundColor: colors.background.tooltip.dark,
          color: colors.text.primary.dark,
        },
        arrow: {
          color: colors.background.tooltip.dark,
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colors.background.light,
      paper: colors.background.light,
    },
    text: {
      primary: colors.text.primary.light,
      secondary: colors.text.secondary.light,
    },
  },
  components: {
    ...themeComponents,
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...themeComponents.MuiTooltip.styleOverrides.tooltip,
          backgroundColor: colors.background.tooltip.light,
          color: colors.text.primary.light,
        },
        arrow: {
          color: colors.background.tooltip.light,
        },
      },
    },
  },
});

// Export colors for direct use in components
export { colors }; 