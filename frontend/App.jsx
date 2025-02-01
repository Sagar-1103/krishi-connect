import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LoginProvider from './context/LoginProvider';
import ProductDetail from './screens/BuyProductDetails';
import CheckoutScreen from './screens/CheckoutScreen';
import OnboardingScreen1 from './screens/OnboardingScreen1';

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
