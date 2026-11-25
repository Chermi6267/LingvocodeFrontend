import { sharedAccentPalette, sharedFeedbackRoles, sharedThemeColors } from '../palette';
import { sharedTokens } from '../tokens';
import type { ThemeDefinition } from '../types';

export const lightTheme = {
  name: 'light',
  colorScheme: 'light',
  tokens: {
    ...sharedTokens,
    colors: {
      ...sharedThemeColors,

      bgCanvas: '#FFFFFF',
      bgSurface: '#F7F7F7',
      bgElevated: '#FFFFFF',
      borderDefault: '#E5E5E5',
      borderLip: '#E5E5E5',
      textPrimary: '#4B4B4B',
      textSecondary: '#777777',
      bgDisabled: '#E5E5E5',
      textDisabled: '#AFAFAF',

      choiceCardSelected: {
        background: '#DDF4FF',
        border: '#84D8FF',
        lip: sharedAccentPalette.secondary.lip,
        text: sharedAccentPalette.secondary.lip,
      },

      feedback: {
        success: {
          background: sharedAccentPalette.primary.tint,
          ...sharedFeedbackRoles.success,
        },
        error: {
          background: sharedAccentPalette.danger.tint,
          ...sharedFeedbackRoles.error,
        },
      },
    },
  },
} satisfies ThemeDefinition;
