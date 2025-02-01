import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LanguageSelector from './screens/LanguageSelector';

const App = () => {
  return (
    // <NavigationContainer>
    //   <AppNavigation/>
    // </NavigationContainer>
    <LanguageSelector/>
  );
};

export default App;
