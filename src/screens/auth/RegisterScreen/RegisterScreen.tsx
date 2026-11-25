import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm, useWatch, type SubmitHandler } from 'react-hook-form';

import type { ThemeColorLike } from '@/shared/config/theme';
import {
  BottomSheet,
  Button,
  Checkbox,
  HStack,
  ProgressBar,
  Text,
  TextInput,
  VStack,
} from '@/shared/ui';
import { AuthScreenLayout } from '@/widgets/AuthScreenLayout';

import { EMAIL_PATTERN } from '../constants';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type PasswordStrength = {
  readonly score: number;
  readonly label: string;
  readonly color: ThemeColorLike;
};

function resolvePasswordStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score <= 1) {
    return { score, label: 'Слабый', color: 'danger.base' };
  }

  if (score === 2) {
    return { score, label: 'Средний', color: 'warning.base' };
  }

  return { score, label: 'Надёжный', color: 'primary.base' };
}

export default function RegisterScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { isSubmitting, submitCount },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const password = useWatch({ control, name: 'password', defaultValue: '' });
  const passwordStrength = resolvePasswordStrength(password);

  const submitHandler: SubmitHandler<RegisterFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedEmail(data.email);
    setFeedbackVisible(true);
  };

  return (
    <AuthScreenLayout
      title="Создать аккаунт"
      subtitle="Несколько шагов — и вы уже на пути к новому языку."
      footer={
        <VStack gap="sm" align="center">
          <Text variant="bodySmall" tone="secondary">
            Уже есть аккаунт?
          </Text>
          <Button variant="secondary" fullWidth onPress={() => router.push('/auth/login')}>
            Войти
          </Button>
        </VStack>
      }>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Введите имя',
          minLength: {
            value: 2,
            message: 'Имя должно содержать минимум 2 символа',
          },
        }}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Как вас зовут?"
            autoCapitalize="words"
            autoComplete="name"
            error={error?.message}
            shakeOnError
            shakeKey={submitCount}
            disabled={isSubmitting}
          />
        )}
      />

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
            shakeKey={submitCount}
            disabled={isSubmitting}
          />
        )}
      />

      {password.length > 0 ? (
        <VStack gap="xs">
          <ProgressBar
            value={passwordStrength.score}
            max={4}
            color={passwordStrength.color}
            accessibilityLabel={`Надёжность пароля: ${passwordStrength.label}`}
          />
          <HStack justify="between" align="center">
            <Text variant="caption" tone="secondary">
              Надёжность пароля
            </Text>
            <Text variant="caption" color={passwordStrength.color}>
              {passwordStrength.label}
            </Text>
          </HStack>
        </VStack>
      ) : null}

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
            shakeKey={submitCount}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        control={control}
        name="acceptTerms"
        rules={{
          validate: (value) => value || 'Подтвердите согласие с условиями',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <VStack gap="xs">
            <Checkbox
              checked={value}
              onValueChange={onChange}
              disabled={isSubmitting}
              label="Я принимаю условия использования и политику конфиденциальности"
            />
            {error ? (
              <Text variant="caption" color="danger.base">
                {error.message}
              </Text>
            ) : null}
          </VStack>
        )}
      />

      <Button fullWidth loading={isSubmitting} onPress={() => void handleSubmit(submitHandler)()}>
        Зарегистрироваться
      </Button>

      <BottomSheet
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
        variant="success"
        heading="Регистрация"
        message={`Локальная проверка пройдена для ${submittedEmail}`}
        actionLabel="Готово"
        onAction={() => setFeedbackVisible(false)}
      />
    </AuthScreenLayout>
  );
}
