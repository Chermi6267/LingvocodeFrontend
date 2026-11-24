import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, StyleSheet } from 'react-native';

import { AuthScreenLayout } from '@/components/AuthScreenLayout/AuthScreenLayout';
import { Spacing } from '@/constants/theme';
import { Button, TextInput } from '@/shared/ui';

import { EMAIL_PATTERN } from '../constants';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const submitHandler: SubmitHandler<LoginFormValues> = async (_data) => {
    // Временная заглушка вместо API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    Alert.alert('Вход', 'Форма прошла валидацию. Подключение API — следующий этап.');
  };

  return (
    <AuthScreenLayout title="С возвращением!">
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
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите пароль"
            keyboardType="default"
            secureTextEntry
            showPasswordToggle
            autoCapitalize="none"
            autoComplete="current-password"
            error={error?.message}
            shakeOnError
            disabled={isSubmitting}
            containerStyle={styles.field}
          />
        )}
      />

      <Button fullWidth loading={isSubmitting} onPress={() => void handleSubmit(submitHandler)()}>
        Войти
      </Button>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: Spacing.two,
  },
});
