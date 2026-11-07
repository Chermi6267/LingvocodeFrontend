import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text } from 'react-native';

// Кастомные пропсы, которые мы описали сами
type CustomProps = {
  buttonText: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

// Исключаем из нативных пропсов те ключи, которые уже есть в CustomProps,
// чтобы не было конфликта типов. Остальные собираем через ...rest.
type SubmitButtonProps = CustomProps & Omit<PressableProps, keyof CustomProps>;

// Универсальный компонент SubmitButton
const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonText,
  onPress,
  disabled = false,
  isLoading = false,
  ...rest
}) => {
  // Определяем, должна ли кнопка быть заблокирована
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        styles.button,
        isDisabled && styles.disabledButton,
        pressed && !isDisabled && styles.pressedButton,
      ]}
      onPress={onPress}
      disabled={isDisabled}>
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={styles.buttonText}>{buttonText}</Text>
      )}
    </Pressable>
  );
};

// Стили кнопки в стиле Duolingo
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#58CC02',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#46A302',
    minHeight: 56,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: '#A5D97A',
    borderBottomColor: '#8DBD65',
    opacity: 0.7,
  },

  pressedButton: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 2,
  },
});

export default SubmitButton;
