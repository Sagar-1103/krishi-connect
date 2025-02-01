import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')} 
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(64, 226, 104, 0.09)',
  },
  logo: {
    width: '50%',
    height: undefined,
    aspectRatio: 0.64
  },
});

export default SplashScreen;