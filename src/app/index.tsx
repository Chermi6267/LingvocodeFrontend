import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { InputField } from '@/components/InputField';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ThemedView style={styles.container}>
      <InputField
        currentState={email}
        setCurrentState={setEmail}
        placeholder="Email"
        onChange={() => {}}
        type="email"
      />

      <InputField
        currentState={password}
        setCurrentState={setPassword}
        placeholder="Пароль"
        onChange={() => {}}
        type="password"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
});
