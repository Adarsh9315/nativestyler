import React, { createContext, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: object;
}

export const ThemeContext = createContext<object>({});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = {} }) => {
  const [theme, setTheme] = useState<object>(initialTheme);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
