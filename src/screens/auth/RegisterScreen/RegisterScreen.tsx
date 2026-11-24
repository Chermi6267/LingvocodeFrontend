import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/components/AuthScreenLayout/AuthScreenLayout';
import { Spacing } from '@/constants/theme';
import { Button, TextInput } from '@/shared/ui';

import { EMAIL_PATTERN } from '../constants';

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
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const submitHandler: SubmitHandler<RegisterFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    Alert.alert('Регистрация', `Локальная проверка пройдена для ${data.email}`);
  };

  return (
    <AuthScreenLayout title="Создать аккаунт">
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Введите электронную почту',
          pattern: {
            value: EMAIL_PATTERN,
            message: 'Некорректный формат электронной почты',
          },
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите почту"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={error?.message}
            shakeOnError
            disabled={isSubmitting}
            containerStyle={styles.field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Введите пароль',
          minLength: {
            value: 8,
            message: 'Пароль должен содержать минимум 8 символов',
          },
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
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
            error={error?.message}
            shakeOnError
            disabled={isSubmitting}
            containerStyle={styles.field}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Повторите пароль',
          validate: (value) => value === getValues('password') || 'Пароли не совпадают',
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
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
            error={error?.message}
            shakeOnError
            disabled={isSubmitting}
            containerStyle={styles.field}
          />
        )}
      />

      <Button fullWidth loading={isSubmitting} onPress={() => void handleSubmit(submitHandler)()}>
        Зарегистрироваться
      </Button>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: Spacing.two,
  },
});
