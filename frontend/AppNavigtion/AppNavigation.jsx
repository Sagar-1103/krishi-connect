import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelector from '../screens/LanguageSelector';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import { useLogin } from '../context/LoginProvider';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  const {user,setAccessToken,setUser,setRefreshToken} = useLogin();

  if(!user){
    return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="LanguageSelector" >
      <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
  }

  return (
    <TabNavigation/>
  );

    
};

export default AppNavigation;
