import { Controller, useForm, type RegisterOptions, type SubmitHandler } from 'react-hook-form';
import { Platform, StyleSheet, View } from 'react-native';

import { InputField } from '@/components/InputField/InputField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

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
    if (Platform.OS === 'web') {
      window.alert(`Локальная проверка пройдена для ${data.email}`);
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
            <InputField
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Введите почту"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputField
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
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={confirmPasswordRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputField
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Повторите пароль"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={isSubmitting}
            />
          )}
        />
        <SubmitButton
          buttonText="Зарегистрироваться"
          onPress={handleSubmit(submitHandler)}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
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
});
