import React, { useEffect, useState } from 'react';

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
import BuyProductDetails from '../screens/BuyProductDetails';
import SplashScreen from '../screens/SplashScreen';
import ChatScreen from '../screens/ChatScreen';
import ListedItemScreen from '../screens/ListedItemScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import ChatListScreen from '../screens/ChatList';

const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  const {user,setAccessToken,setUser,setRefreshToken} = useLogin();
  const [loading,setLoading] = useState(true);

  GoogleSignin.configure({
    webClientId: GOOGLE_CLIENT_ID,
  });

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        getFromStorage();
      }, 2000);
    }, []);

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
      finally {
        setLoading(false);
      }
    }

    if(loading){
      return <SplashScreen/>
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
      <Stack.Screen name="BuyProductDetails" component={BuyProductDetails} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ListedItemScreen" component={ListedItemScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    </Stack.Navigator>
  );

    
};

export default AppNavigation;
