import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';

import { AuthScreenLayout } from '@/components/AuthScreenLayout/AuthScreenLayout';
import { InputField } from '@/components/InputField/InputField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { Spacing } from '@/constants/theme';

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
          <InputField
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите почту"
            variant="email"
            autoComplete="email"
            error={error?.message}
            disabled={isSubmitting}
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
          <InputField
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Введите пароль"
            variant="password"
            autoComplete="current-password"
            error={error?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <View style={styles.submitButton}>
        <SubmitButton
          buttonText="Войти"
          onPress={handleSubmit(submitHandler)}
          isLoading={isSubmitting}
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: Spacing.two,
  },
});
