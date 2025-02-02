import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";

const FullScreenImageScreen = ({ navigation }) => {
  const handleCLick = async()=>{
    navigation.navigate("TabNavigation");
    await AsyncStorage.setItem('random','true');
  }
  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      <View style={styles.overlay}>
        <Image source={require("../assets/krishiConnectLogo.png")} style={styles.logo} />
        <Text style={styles.boldtext}>Buy|Rent|Share</Text>
        <Text style={styles.text}>One stop solution for all your farming tools.</Text>
        <TouchableOpacity style={styles.button} onPress={handleCLick}> 
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    top: 100,
  },
  text: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  
  boldtext: {
    fontSize:50,
    fontWeight: "bold",
    marginTop: "100%",
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width:"80%",
    borderRadius: 8,
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FullScreenImageScreen;
