import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LoginProvider from './context/LoginProvider';
import ProductDetailsScreen from './screens/SellProductDetails';

const App = () => {

  return (
    <NavigationContainer>
      <LoginProvider>
        <AppNavigation/>
      </LoginProvider>
    </NavigationContainer>
    // <ProductDetailsScreen/>
  );
};

export default App;
