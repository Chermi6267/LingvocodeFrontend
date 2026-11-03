import { StyleSheet, TextInput } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type InputFieldProps = {
  currentState: string;
  setCurrentState: (text: string) => void;
  placeholder: string;
  onChange: (text: string) => void;
  type: 'email' | 'password';
};

export function InputField({
  currentState,
  setCurrentState,
  placeholder,
  onChange,
  type,
}: InputFieldProps) {
  const theme = useTheme();

  function handleChange(text: string) {
    setCurrentState(text);
    onChange(text);
  }

  return (
    <TextInput
      value={currentState}
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor={theme.textSecondary}
      keyboardType={type === 'email' ? 'email-address' : 'default'}
      secureTextEntry={type === 'password'}
      autoCapitalize="none"
      style={[styles.input, { color: theme.text }]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
  },
});
