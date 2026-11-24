import { sharedTokens } from '../tokens';
import type { ThemeDefinition } from '../types';

export const darkTheme = {
  name: 'dark',
  colorScheme: 'dark',
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

      bgCanvas: '#131F24',
      bgSurface: '#1A2B32',
      bgElevated: '#202F36',
      borderDefault: '#37464F',
      borderLip: '#37464F',
      textPrimary: '#F1F7FB',
      textSecondary: '#8FA6B2',
      bgDisabled: '#37464F',
      textDisabled: '#52656D',

      primaryHover: '#61E002',
      textOnAccent: '#FFFFFF',
      progressHighlight: 'rgba(255, 255, 255, 0.25)',

      choiceCardSelected: {
        background: '#183544',
        border: '#1CB0F6',
        lip: '#1899D6',
        text: '#49C0F8',
      },

      feedback: {
        success: {
          background: '#1B3318',
          heading: '#58A700',
          icon: '#58CC02',
        },
        error: {
          background: '#3B181A',
          heading: '#EA2B2B',
          icon: '#FF4B4B',
        },
      },
    },
  },
} satisfies ThemeDefinition;
