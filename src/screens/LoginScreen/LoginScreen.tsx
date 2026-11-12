import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InputField } from '@/components/InputField/InputField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type LoginFormValues = {
  email: string;
  password: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <ThemedText type="subtitle" style={styles.title}>
                С возвращением!
              </ThemedText>

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
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Введите почту"
                    variant="email"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Введите пароль',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Введите пароль"
                    variant="password"
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.five,
  },
  submitButton: {
    marginTop: Spacing.two,
  },
});
