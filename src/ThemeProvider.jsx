// ThemeProvider.jsx

import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

// Create a context to manage the theme
const ThemeContext = createContext();

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// Component to manage the theme state and provide the context
export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Define dark and light themes
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    // Toggle between dark and light themes
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    // Select the active theme based on the darkMode state
    const activeTheme = darkMode ? darkTheme : lightTheme;

    return (
        <MuiThemeProvider theme={activeTheme}>
            <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
};
