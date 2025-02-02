import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from "./AppNavigtion/AppNavigation"
import LoginProvider from './context/LoginProvider';import ChatListScreen from './screens/ChatList';
import ForumDiscussionList from './screens/ForumList';
import CreateDiscussionScreen from './screens/CreateDiscussion';
import ForumDiscussionScreen from './screens/ForumDiscussion';
import FullScreenImageScreen from './screens/GetStarted';


const App = () => {

  return (
    // <NavigationContainer>
    //   <LoginProvider>
    //     <AppNavigation/>
    //   </LoginProvider>
    // </NavigationContainer>
    <FullScreenImageScreen/>
  );
};

export default App;
