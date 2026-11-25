import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import {
  BottomSheet,
  Button,
  Checkbox,
  HStack,
  Text,
  TextInput,
  useToast,
  VStack,
} from '@/shared/ui';
import { AuthScreenLayout } from '@/widgets/AuthScreenLayout';

import { EMAIL_PATTERN } from '../constants';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, submitCount },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const submitHandler: SubmitHandler<LoginFormValues> = async (_data) => {
    // Временная заглушка вместо API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setFeedbackVisible(true);
  };

  const handleForgotPassword = () => {
    showToast({
      variant: 'info',
      message: 'Восстановление пароля появится после подключения API.',
    });
  };

  return (
    <AuthScreenLayout
      title="С возвращением!"
      subtitle="Войдите, чтобы продолжить обучение с того места, где остановились."
      footer={
        <VStack gap="sm" align="center">
          <Text variant="bodySmall" tone="secondary">
            Нет аккаунта?
          </Text>
          <Button variant="secondary" fullWidth onPress={() => router.push('/auth/register')}>
            Создать аккаунт
          </Button>
        </VStack>
      }>
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
            shakeKey={submitCount}
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
            shakeKey={submitCount}
            disabled={isSubmitting}
          />
        )}
      />

      <HStack gap="sm" align="center" justify="between" wrap>
        <Checkbox
          checked={rememberMe}
          onValueChange={setRememberMe}
          label="Запомнить меня"
          disabled={isSubmitting}
        />
        <Button variant="ghost" onPress={handleForgotPassword} disabled={isSubmitting}>
          Забыли пароль?
        </Button>
      </HStack>

      <Button fullWidth loading={isSubmitting} onPress={() => void handleSubmit(submitHandler)()}>
        Войти
      </Button>

      <BottomSheet
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
        variant="success"
        heading="Вход"
        message="Форма прошла валидацию. Подключение API — следующий этап."
        actionLabel="Готово"
        onAction={() => setFeedbackVisible(false)}
      />
    </AuthScreenLayout>
  );
}
