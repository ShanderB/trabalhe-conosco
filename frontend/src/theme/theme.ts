export const theme = {
  colors: {
    primary: '#2f6f4f',
    primaryDark: '#1f4d37',
    primaryLight: '#e6f1ea',
    secondary: '#8bc34a',
    background: '#f5f7f5',
    surface: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#5f6b62',
    border: '#dfe5e0',
    danger: '#d4380d',
    warning: '#d48806',
    success: '#389e0d',
  },
  spacing: (multiplier: number): string => `${multiplier * 8}px`,
  radius: '8px',
  shadow: '0 1px 3px rgba(16, 24, 20, 0.08)',
  fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
} as const;

export type AppTheme = typeof theme;
