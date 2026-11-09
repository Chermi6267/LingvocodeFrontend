import { useRef, useState } from 'react';
import { Button, View, type TextInputInstance } from 'react-native';

import { InputField } from './InputField';

export function InputFieldExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef<TextInputInstance>(null);

  return (
    <View>
      <InputField
        value={email}
        onChangeText={setEmail}
        variant="email"
        placeholder="Email"
        autoComplete="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />

      <InputField
        ref={passwordInputRef}
        value={password}
        onChangeText={setPassword}
        variant="password"
        placeholder="Пароль"
        autoComplete="current-password"
      />

      <Button title="Перейти к паролю" onPress={() => passwordInputRef.current?.focus()} />
    </View>
  );
}
