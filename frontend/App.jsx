import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LoginProvider from './context/LoginProvider';

const App = () => {

  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigation/>
      </LoginProvider>
    </NavigationContainer>
  );
};

export default App;
