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
<<<<<<< HEAD
    // <NavigationContainer>
    //   <LoginProvider>
    //     <AppNavigation/>
    //   </LoginProvider>
    // </NavigationContainer>
    <OnboardingScreen1/>
=======
    <NavigationContainer>
      <LoginProvider>
        <AppNavigation/>
      </LoginProvider>
    </NavigationContainer>
>>>>>>> 941906d63db1e3e5cfe8456625d7e35e1b95d66b
  );
};

export default App;
