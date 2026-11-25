import { sharedAccentPalette, sharedFeedbackRoles, sharedThemeColors } from '../palette';
import { sharedTokens } from '../tokens';
import type { ThemeDefinition } from '../types';

export const darkTheme = {
  name: 'dark',
  colorScheme: 'dark',
  tokens: {
    ...sharedTokens,
    colors: {
      ...sharedThemeColors,

      bgCanvas: '#131F24',
      bgSurface: '#1A2B32',
      bgElevated: '#202F36',
      borderDefault: '#37464F',
      borderLip: '#37464F',
      textPrimary: '#F1F7FB',
      textSecondary: '#8FA6B2',
      bgDisabled: '#37464F',
      textDisabled: '#52656D',

      choiceCardSelected: {
        background: '#183544',
        border: sharedAccentPalette.secondary.base,
        lip: sharedAccentPalette.secondary.lip,
        text: '#49C0F8',
      },

      feedback: {
        success: {
          background: '#1B3318',
          ...sharedFeedbackRoles.success,
        },
        error: {
          background: '#3B181A',
          ...sharedFeedbackRoles.error,
        },
      },
    },
  },
} satisfies ThemeDefinition;
