import { sharedTokens } from '../tokens';
import type { ThemeDefinition } from '../types';

export const lightTheme = {
  name: 'light',
  colorScheme: 'light',
  tokens: {
    ...sharedTokens,
    colors: {
      primary: {
        base: '#58CC02',
        lip: '#58A700',
        tint: '#D7FFB8',
      },
      secondary: {
        base: '#1CB0F6',
        lip: '#1899D6',
        tint: '#DDF4FF',
      },
      danger: {
        base: '#FF4B4B',
        lip: '#EA2B2B',
        tint: '#FFDFE0',
      },
      warning: {
        base: '#FFC800',
        lip: '#E5A400',
        tint: '#FFF5CC',
      },
      streak: {
        base: '#FF9600',
        lip: '#CC7800',
        tint: '#FFE7C2',
      },
      legendary: {
        base: '#CE82FF',
        lip: '#A560E8',
        tint: '#F3E5FF',
      },

      bgCanvas: '#FFFFFF',
      bgSurface: '#F7F7F7',
      bgElevated: '#FFFFFF',
      borderDefault: '#E5E5E5',
      borderLip: '#E5E5E5',
      textPrimary: '#4B4B4B',
      textSecondary: '#777777',
      bgDisabled: '#E5E5E5',
      textDisabled: '#AFAFAF',

      primaryHover: '#61E002',
      textOnAccent: '#FFFFFF',
      progressHighlight: 'rgba(255, 255, 255, 0.25)',

      choiceCardSelected: {
        background: '#DDF4FF',
        border: '#84D8FF',
        lip: '#1899D6',
        text: '#1899D6',
      },

      feedback: {
        success: {
          background: '#D7FFB8',
          heading: '#58A700',
          icon: '#58CC02',
        },
        error: {
          background: '#FFDFE0',
          heading: '#EA2B2B',
          icon: '#FF4B4B',
        },
      },
    },
  },
} satisfies ThemeDefinition;
