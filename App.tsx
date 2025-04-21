import React from 'react';

import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import CreateNewAccountScreen from './components/CreateNewAccountScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';


export type RootStackParamList = {
  Login: {registeredEmail?: string} | undefined;
  CreateAccount: undefined;
  ForgotPassword: {userId?: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* Khai báo các màn hình trong Stack */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateNewAccountScreen}
            options={{title: 'Create New Account'}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{title: 'Reset Password'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};


export default App;