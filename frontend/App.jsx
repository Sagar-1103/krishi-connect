import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LoginProvider from './context/LoginProvider';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/Home';
import SplashScreen from './screens/SplashScreen';

const App = () => {

  return (
    // <NavigationContainer>
    //   <LoginProvider>
    //     <AppNavigation/>
    //   </LoginProvider>
    // </NavigationContainer>
    <SplashScreen/>
  );
};

export default App;
