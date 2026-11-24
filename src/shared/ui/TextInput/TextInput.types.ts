import type {
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

/**
 * Themed text field. Controlled and uncontrolled usage are both supported:
 * pass `value` + `onChangeText`, or `defaultValue` instead.
 */
export interface TextInputProps extends Omit<RNTextInputProps, 'placeholderTextColor' | 'style'> {
  /** Non-interactive state. Maps to `editable={false}` on the native input. */
  readonly disabled?: boolean;
  /** Validation message. A non-empty value switches the field to the error palette. */
  readonly error?: string;
  /** Opt-in shake when a new error appears (respects reduced-motion settings). */
  readonly shakeOnError?: boolean;
  /** Change this to replay the shake for an unchanged error (e.g. a repeated submit). */
  readonly shakeKey?: number | string;
  /** Renders an in-field visibility toggle for `secureTextEntry` fields. */
  readonly showPasswordToggle?: boolean;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly inputStyle?: StyleProp<TextStyle>;
}
