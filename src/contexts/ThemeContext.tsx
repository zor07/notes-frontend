import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export type DarkPalette = {
    background: string;
    surface: string;
    surfaceElevated: string;
    border: string;
    textPrimary: string;
    textMuted: string;
    textDisabled: string;
    accent: string;
    accentContrast: string;
    selection: string;
    selectionStrong: string;
    shadowStrong: string;
    buttonPrimaryBg: string;
    buttonPrimaryText: string;
    editorText: string;
};

interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
    darkPalette: DarkPalette;
    updateDarkPalette: (updates: Partial<DarkPalette>) => void;
    resetDarkPalette: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';
const DARK_PALETTE_STORAGE_KEY = 'app-dark-palette';

const DEFAULT_DARK_PALETTE: DarkPalette = {
    background: '#141414',
    surface: '#1f1f1f',
    surfaceElevated: '#262626',
    border: '#434343',
    textPrimary: 'rgba(255, 255, 255, 0.85)',
    textMuted: 'rgba(255, 255, 255, 0.45)',
    textDisabled: 'rgba(255, 255, 255, 0.25)',
    accent: '#1890ff',
    accentContrast: '#ffffff',
    selection: '#262626',
    selectionStrong: '#111b26',
    shadowStrong: 'rgba(0, 0, 0, 0.3)',
    buttonPrimaryBg: '#1890ff',
    buttonPrimaryText: '#ffffff',
    editorText: 'rgba(255, 255, 255, 0.85)',
};

const applyPaletteToDocument = (palette: DarkPalette) => {
    const root = document.documentElement;
    Object.entries(palette).forEach(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--dark-${kebabKey}`, value);
        // Оставляем camelCase вариант для обратной совместимости
        root.style.setProperty(`--dark-${key}`, value);
    });
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    const [darkPalette, setDarkPalette] = useState<DarkPalette>(() => {
        const savedPalette = localStorage.getItem(DARK_PALETTE_STORAGE_KEY);
        if (savedPalette) {
            try {
                return { ...DEFAULT_DARK_PALETTE, ...JSON.parse(savedPalette) };
            } catch {
                return DEFAULT_DARK_PALETTE;
            }
        }
        return DEFAULT_DARK_PALETTE;
    });

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        
        if (theme === 'dark') {
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-light');
        } else {
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem(DARK_PALETTE_STORAGE_KEY, JSON.stringify(darkPalette));
        applyPaletteToDocument(darkPalette);
    }, [darkPalette]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const updateDarkPalette = (updates: Partial<DarkPalette>) => {
        setDarkPalette(prev => ({ ...prev, ...updates }));
    };

    const resetDarkPalette = () => {
        setDarkPalette(DEFAULT_DARK_PALETTE);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, darkPalette, updateDarkPalette, resetDarkPalette }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
