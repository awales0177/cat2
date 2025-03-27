# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Dark Mode Implementation Guide

This guide explains how to implement dark mode in your React application using Material-UI and a custom theme system.

## Overview

The dark mode implementation consists of:
1. A centralized theme configuration
2. Theme provider setup
3. Color management system
4. Component-level theme integration

## 1. Theme Configuration

Create a `theme.js` file in your `src` directory:

```javascript
import { createTheme } from '@mui/material/styles';

// Define color palette
const colors = {
  // Background colors
  background: {
    dark: '#121212',
    light: '#ffffff',
    hero: {
      dark: '#1a1a1a',
      light: '#ffffff',
    },
    tooltip: {
      dark: '#2d2d2d',
      light: '#ffffff',
    },
  },
  // Text colors
  text: {
    primary: {
      dark: '#ffffff',
      light: '#000000',
    },
    secondary: {
      dark: '#b3b3b3',
      light: '#333333',
    },
    body: {
      dark: '#e0e0e0',
      light: '#000000',
    },
    hero: {
      title: {
        dark: '#ffffff',
        light: '#000000',
      },
      subtitle: {
        dark: '#e0e0e0',
        light: '#333333',
      },
      body: {
        dark: '#b3b3b3',
        light: '#333333',
      },
    },
  },
  // Icon colors
  icons: {
    primary: {
      dark: '#b3b3b3',
      light: '#333333',
    },
    medallion: {
      bronze: {
        dark: '#cd7f32',
        light: '#cd7f32',
      },
      silver: {
        dark: '#c0c0c0',
        light: '#c0c0c0',
      },
      gold: {
        dark: '#ffd700',
        light: '#ffd700',
      },
    },
    verified: {
      dark: '#4caf50',
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
```

## 2. Theme Provider Setup

In your `App.jsx`, set up the theme provider:

```javascript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { darkTheme, lightTheme } from './theme';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## 3. Using Theme in Components

### Accessing Theme Mode

```javascript
import { useTheme } from '@mui/material/styles';

function YourComponent() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Use isDarkMode to conditionally render styles
}
```

### Using Theme Colors

```javascript
import { colors } from '../theme';

function YourComponent() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Direct color access
  const backgroundColor = isDarkMode ? colors.background.dark : colors.background.light;
  const textColor = isDarkMode ? colors.text.primary.dark : colors.text.primary.light;

  return (
    <Box sx={{ backgroundColor, color: textColor }}>
      {/* Component content */}
    </Box>
  );
}
```

### Helper Function for Color Access

```javascript
const getColor = (path) => {
  const [category, subcategory, type] = path.split('.');
  if (!colors[category] || !colors[category][subcategory] || !colors[category][subcategory][type]) {
    console.warn(`Invalid color path: ${path}`);
    return '#000000'; // Fallback color
  }
  return colors[category][subcategory][type][isDarkMode ? 'dark' : 'light'];
};

// Usage
const textColor = getColor('text.primary');
```

## 4. Theme Toggle Implementation

Add a theme toggle button to your navigation:

```javascript
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
```

## 5. Best Practices

1. **Centralized Color Management**
   - Keep all colors in the theme file
   - Use semantic color names (e.g., 'primary', 'secondary')
   - Maintain consistent color structure

2. **Component Styling**
   - Use the theme's color system instead of hardcoded colors
   - Implement responsive design for both modes
   - Test contrast ratios for accessibility

3. **Performance**
   - Use CSS-in-JS for dynamic styles
   - Implement smooth transitions between modes
   - Cache theme preferences in localStorage

4. **Accessibility**
   - Ensure sufficient contrast ratios
   - Test with screen readers
   - Provide visual indicators for interactive elements

## 6. Testing

1. Test all components in both light and dark modes
2. Verify color contrast meets WCAG guidelines
3. Check for any hardcoded colors
4. Test theme persistence across page reloads
5. Verify smooth transitions between modes

## 7. Troubleshooting

Common issues and solutions:

1. **Colors Not Updating**
   - Check if theme provider is properly set up
   - Verify color paths in getColor function
   - Ensure components are using theme colors

2. **Inconsistent Styling**
   - Review component-specific styles
   - Check for conflicting CSS rules
   - Verify theme inheritance

3. **Performance Issues**
   - Optimize theme switching
   - Reduce unnecessary re-renders
   - Use proper CSS selectors
