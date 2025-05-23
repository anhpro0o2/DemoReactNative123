import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {TextInput, Button, Text, HelperText} from 'react-native-paper';
import {useNavigation, useRoute, CommonActions} from '@react-navigation/native';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/;

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const registeredEmail = route.params?.registeredEmail;

  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [registeredEmail]);

  const handleLogin = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is a required field');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is a required field');
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long');
      isValid = false;
    }

    if (isValid) {
      const isLoginSuccessful = true;

      if (isLoginSuccessful) {
        console.log('Login successful for:', email);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          }),
        );
      } else {
        console.log('Login failed for:', email);
        Alert.alert('Login Failed', 'Incorrect email or password.', [
          {text: 'OK'},
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Man_Utd_FC_.svg.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text variant="headlineMedium" style={styles.title}>
        Welcome back!
      </Text>

      <TextInput
        label="Enter email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (emailError) {
            setEmailError('');
          }
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!emailError}
        left={<TextInput.Icon icon="email" />}
      />
      <HelperText type="error" visible={!!emailError}>
        {emailError}
      </HelperText>

      <TextInput
        label="Enter password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) {
            setPasswordError('');
          }
        }}
        mode="outlined"
        style={styles.input}
        secureTextEntry={isPasswordSecure}
        error={!!passwordError}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={isPasswordSecure ? 'eye-off' : 'eye'}
            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
          />
        }
      />

      <HelperText type="error" visible={!!passwordError}>
        {passwordError}
      </HelperText>

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('CreateAccount')}>
        Create a new account?
      </Button>
      <Button onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
  },
});

export default LoginScreen;