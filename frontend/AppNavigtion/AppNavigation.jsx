import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelector from '../screens/LanguageSelector';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import { useLogin } from '../context/LoginProvider';
import TabNavigation from './TabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { GOOGLE_CLIENT_ID } from '@env';
import ProductDetailsScreen from '../screens/SellProductDetails';

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  const {user,setAccessToken,setUser,setRefreshToken} = useLogin();

  GoogleSignin.configure({
    webClientId: GOOGLE_CLIENT_ID,
  });
    
    useEffect(()=>{
      getFromStorage();
    },[]);

    const getFromStorage = async()=>{
      try {
      const tempUser = await AsyncStorage.getItem('user');
      const tempRefreshToken = await AsyncStorage.getItem('refreshToken');
      const tempAccessToken = await AsyncStorage.getItem('accessToken');

      setUser(JSON.parse(tempUser));
      setAccessToken(tempAccessToken);
      setRefreshToken(tempRefreshToken);
      } catch (error) {
        console.log("Error : ",error);
      }
    }

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
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="TabNavigation" >
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );

    
};

export default AppNavigation;
