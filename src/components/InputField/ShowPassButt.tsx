import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ShowPasswordButtonProps = {
  isPasswordVisible: boolean;
  onPress: () => void;
};

export function ShowPasswordButton({ isPasswordVisible, onPress }: ShowPasswordButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
      onPress={onPress}
      style={styles.button}>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        {isPasswordVisible ? 'Скрыть' : 'Показать'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
  },
});
