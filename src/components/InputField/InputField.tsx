import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputInstance,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';

import { ShowPasswordButton } from './ShowPassButt';

type InputFieldProps = Omit<TextInputProps, 'value' | 'onChangeText' | 'secureTextEntry'> & {
  value: string;
  onChangeText: (text: string) => void;
  type: 'email' | 'password';
  error?: string;
  disabled?: boolean;
};

export const InputField = forwardRef<TextInputInstance, InputFieldProps>(
  (
    { value, onChangeText, type, error, disabled = false, editable = true, style, ...rest },
    ref,
  ) => {
    const theme = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = type === 'password';
    const isDisabled = disabled || !editable;

    function togglePasswordVisibility() {
      setIsPasswordVisible((currentValue) => !currentValue);
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            {...rest}
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            editable={!isDisabled}
            placeholderTextColor={theme.textSecondary}
            keyboardType={isPassword ? 'default' : 'email-address'}
            secureTextEntry={isPassword && !isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              styles.input,
              { color: theme.text },
              isPassword && styles.passwordInput,
              style,
              !!error && styles.inputError,
              isDisabled && styles.disabledInput,
            ]}
          />

          {isPassword && (
            <View style={styles.showPasswordButton}>
              <ShowPasswordButton
                isPasswordVisible={isPasswordVisible}
                onPress={togglePasswordVisibility}
                disabled={isDisabled}
              />
            </View>
          )}
        </View>

        {!!error && (
          <Text style={styles.errorText} accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    );
  },
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 96,
  },
  inputError: {
    borderColor: '#FF4B4B',
  },
  disabledInput: {
    opacity: 0.6,
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 14,
    marginTop: 6,
  },
  showPasswordButton: {
    position: 'absolute',
    top: 0,
    right: 8,
    height: 52,
    justifyContent: 'center',
  },
});
