"use client";

import React, { createContext, useContext } from 'react';

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

// Forest theme configuration
const forestTheme: ThemeConfig = {
  name: 'Forest',
  colors: {
    primary: '#3CB371', // MediumSeaGreen
    secondary: '#20B2AA', // LightSeaGreen
    accent: '#FFD700', // Gold
    background: '#0A1A0A',
    surface: '#1A2A1A',
    text: '#E0E0E0',
    textSecondary: '#A0A0A0',
    border: '#334A33',
  }
};

interface ThemeContextType {
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ themeConfig: forestTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
