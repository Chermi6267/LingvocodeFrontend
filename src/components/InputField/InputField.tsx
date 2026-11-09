import { forwardRef, useState } from 'react';
import {
  StyleSheet,
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
  variant: 'email' | 'password';
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
    position: 'relative',
  },
  input: {
    width: '100%',
    paddingRight: 96,
    height: 52,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  showPasswordButton: {
    position: 'absolute',
    top: 0,
    right: 8,
    height: 52,
    justifyContent: 'center',
  },
});

export const InputField = forwardRef<TextInputInstance, InputFieldProps>(
  ({ value, onChangeText, variant, ...rest }, ref) => {
    const theme = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = variant === 'password';
    function togglePasswordVisibility() {
      setIsPasswordVisible((currentValue) => !currentValue);
    }

    return (
      <View style={styles.container}>
        <TextInput
          {...rest}
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.textSecondary}
          keyboardType={isPassword ? 'default' : 'email-address'}
          secureTextEntry={isPassword && !isPasswordVisible}
          autoCapitalize="none"
          style={[styles.input, { color: theme.text }]}
        />

        {isPassword && (
          <View style={styles.showPasswordButton}>
            <ShowPasswordButton
              isPasswordVisible={isPasswordVisible}
              onPress={togglePasswordVisibility}
            />
          </View>
        )}
      </View>
    );
  },
);

InputField.displayName = 'InputField';
