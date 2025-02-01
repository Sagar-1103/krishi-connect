import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const SignInScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput placeholder="Username or Email" style={styles.input} />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry={!passwordVisible} />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={width * 0.05} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.termsText}>
        <Text style={styles.passLink}>Forgot Password ?</Text>
      </Text>
      
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>- OR Continue with -</Text>
      
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={width * 0.06} color="blue" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.loginText}>
        Create An Account <Text style={styles.SignUpLink}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "10%",
    backgroundColor: "white",
  },
  header: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: "5%",
    marginTop: "25%",
    color: "#000",
    width: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: "3%",
    marginBottom: "3%",
  },
  icon: {
    marginRight: "3%",
  },
  input: {
    flex: 1,
    fontSize: 18
  },
  termsText: {
    color: "gray",
    marginBottom: "3%",
  },
  passLink: {
    color: "red",
  },
  createAccountButton: {
    backgroundColor: "green",
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountText: {
    color: "white",
    fontSize: width * 0.04,
  },
  orText: {
    textAlign: "center",
    marginVertical: "5%",
    color: "gray",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: width * 0.05,
  },
  socialButton: {
    padding: "3%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: 'rgba(0,150,0,0.15)',
  },
  loginText: {
    textAlign: "center",
    marginTop: "5%",
  },
  SignUpLink: {
    color: "green",
    fontWeight: "bold",
  },
});

export default SignInScreen;