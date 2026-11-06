import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import SubmitButton from '../components/SubmitButton';

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Успешно!', 'Кнопка работает правильно!');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SubmitButton</Text>

        <Text style={styles.description}>Проверка универсального компонента кнопки</Text>

        <SubmitButton buttonText="Зарегистрироваться" onPress={handlePress} isLoading={isLoading} />

        <View style={styles.secondButton}>
          <SubmitButton
            buttonText="Войти"
            onPress={() => Alert.alert('Вход', 'Кнопка работает!')}
          />
        </View>

        <View style={styles.secondButton}>
          <SubmitButton buttonText="Недоступно" onPress={() => {}} disabled={true} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#3C3C3C',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777777',
    marginBottom: 40,
  },
  secondButton: {
    marginTop: 20,
  },
});
