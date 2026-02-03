import React, { createContext, useContext, useState } from 'react';
import { lightColors, darkColors } from './colors';

type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
    mode: ThemeType;
    colors: typeof lightColors;
    toggleTheme: () => void;
    setMode: (mode: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeType>('light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value: ThemeContextValue = {
        mode,
        colors: mode === 'light' ? lightColors : darkColors,
        toggleTheme,
        setMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}