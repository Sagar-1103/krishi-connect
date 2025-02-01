import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1, 
      friction: 4, 
      tension: 60, 
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Logo.png")}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(64, 226, 104, 0.09)",
  },
  logo: {
    width: "50%",
    height: undefined,
    aspectRatio: 0.64,
  },
});

export default SplashScreen;
