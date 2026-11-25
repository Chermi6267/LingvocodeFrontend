import { resolveStatusPalette, type ThemeColor, type ThemeTokens } from '@/shared/config/theme';
import { createStyles } from '@/shared/lib/styles';

import type { CardStatus } from './Card.types';

export interface CardPalette {
  readonly face: ThemeColor;
  readonly lip: ThemeColor;
  readonly border: ThemeColor;
  readonly content: ThemeColor;
  readonly badgeBackground: ThemeColor;
  readonly badgeBorder: ThemeColor;
  readonly hoverFace: ThemeColor;
  readonly showLip: boolean;
}

export interface ResolveCardPaletteOptions {
  readonly selected: boolean;
  readonly status: CardStatus | undefined;
  readonly disabled: boolean;
  readonly interactive: boolean;
}

/**
 * Resolves the card surface from semantic theme tokens only.
 *
 * Priority: disabled → correct/wrong → selected → default. Every branch keeps
 * the same border/lip geometry, so switching states cannot shift layout.
 */
export function resolveCardPalette(
  tokens: ThemeTokens,
  { selected, status, disabled, interactive }: ResolveCardPaletteOptions,
): CardPalette {
  const colors = tokens.colors;

  if (disabled) {
    return {
      face: colors.bgSurface,
      lip: colors.borderLip,
      border: colors.borderDefault,
      content: colors.textDisabled,
      badgeBackground: colors.bgDisabled,
      badgeBorder: colors.borderDefault,
      hoverFace: colors.bgSurface,
      showLip: false,
    };
  }

  if (status === 'correct' || status === 'wrong') {
    const semantic = status === 'correct' ? 'success' : 'error';
    const feedback = resolveStatusPalette(tokens, semantic);

    return {
      face: feedback.background,
      lip: feedback.lip,
      border: feedback.border,
      content: feedback.heading,
      badgeBackground: colors.bgElevated,
      badgeBorder: feedback.border,
      hoverFace: feedback.background,
      showLip: true,
    };
  }

  if (selected) {
    return {
      face: colors.choiceCardSelected.background,
      lip: colors.choiceCardSelected.lip,
      border: colors.choiceCardSelected.border,
      content: colors.choiceCardSelected.text,
      badgeBackground: colors.bgElevated,
      badgeBorder: colors.choiceCardSelected.border,
      hoverFace: colors.choiceCardSelected.background,
      showLip: true,
    };
  }

  return {
    face: interactive ? colors.bgCanvas : colors.bgElevated,
    lip: colors.borderLip,
    border: colors.borderDefault,
    content: colors.textPrimary,
    badgeBackground: colors.bgSurface,
    badgeBorder: colors.borderDefault,
    hoverFace: colors.bgSurface,
    showLip: true,
  };
}

export const useCardStyles = createStyles((tokens) => ({
  root: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
  badge: {
    width: tokens.components.choiceCard.hotkeySize,
    height: tokens.components.choiceCard.hotkeySize,
    borderRadius: tokens.components.choiceCard.hotkeyRadius,
    borderWidth: tokens.borderWidths.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  face: {
    padding: tokens.components.choiceCard.padding,
  },
}));
