import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';

import { AuthScreenLayout } from '@/components/AuthScreenLayout/AuthScreenLayout';
import { InputField } from '@/components/InputField/InputField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { Spacing } from '@/constants/theme';

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
          minLength: {
            value: 8,
            message: 'Пароль должен содержать минимум 8 символов',
          },
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
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
            variant="password"
            autoComplete="new-password"
            error={error?.message}
            disabled={isSubmitting}
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
          <InputField
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Повторите пароль"
            variant="password"
            showPasswordButton={false}
            autoComplete="new-password"
            error={error?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <View style={styles.submitButton}>
        <SubmitButton
          buttonText="Зарегистрироваться"
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
