import { Controller, useForm, type RegisterOptions, type SubmitHandler } from 'react-hook-form';
import { Alert, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button, TextInput } from '@/shared/ui';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const emailRules: RegisterOptions<RegisterFormValues, 'email'> = {
    required: 'Введите электронную почту',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Некорректный формат электронной почты',
    },
  };

  const passwordRules: RegisterOptions<RegisterFormValues, 'password'> = {
    required: 'Введите пароль',
    minLength: {
      value: 8,
      message: 'Пароль должен содержать минимум 8 символов',
    },
  };

  const confirmPasswordRules: RegisterOptions<RegisterFormValues, 'confirmPassword'> = {
    required: 'Повторите пароль',
    validate: (value) => value === getValues('password') || 'Пароли не совпадают',
  };
  const submitHandler: SubmitHandler<RegisterFormValues> = async (data) => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });

    const message =
      `Локальная проверка пройдена для ${data.email}. ` +
      'Это демонстрация: аккаунт ещё не создан.';

    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('Проверка завершена', message);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <View style={styles.form}>
        <ThemedText type="title" style={styles.title}>
          Создать аккаунт
        </ThemedText>
        <Controller
          control={control}
          name="email"
          rules={emailRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Введите почту"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email?.message}
              shakeOnError
              disabled={isSubmitting}
              containerStyle={styles.field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={(text) => {
                onChange(text);

                if (getValues('confirmPassword')) {
                  void trigger('confirmPassword');
                }
              }}
              onBlur={onBlur}
              placeholder="Введите пароль"
              keyboardType="default"
              secureTextEntry
              showPasswordToggle
              autoCapitalize="none"
              autoComplete="new-password"
              error={errors.password?.message}
              shakeOnError
              disabled={isSubmitting}
              containerStyle={styles.field}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={confirmPasswordRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Повторите пароль"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              shakeOnError
              disabled={isSubmitting}
              containerStyle={styles.field}
            />
          )}
        />
        <Button fullWidth loading={isSubmitting} onPress={() => void handleSubmit(submitHandler)()}>
          Зарегистрироваться
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 440,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  field: {
    marginBottom: 12,
  },
});
