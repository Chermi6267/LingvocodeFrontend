import type { ThemeDefinition } from '../types';
import { darkTheme } from './dark';
import { lightTheme } from './light';

/**
 * Central theme registry.
 *
 * To add a theme: create a token object in this directory and add one entry here.
 * Provider, hook and consumers stay untouched because the key type is derived
 * from this registry.
 */
export const themeRegistry = {
  light: lightTheme,
  dark: darkTheme,
} as const satisfies Record<string, ThemeDefinition>;

export type ThemeName = keyof typeof themeRegistry;

export const themeNames = Object.keys(themeRegistry) as readonly ThemeName[];

export const defaultThemeName: ThemeName = 'light';

export const systemThemeByColorScheme = {
  light: 'light',
  dark: 'dark',
} as const satisfies Record<'light' | 'dark', ThemeName>;
