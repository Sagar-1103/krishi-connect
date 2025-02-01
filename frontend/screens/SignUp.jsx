import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const SignUpScreen = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
      
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
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry={!confirmPasswordVisible} />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={width * 0.05} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.termsText}>
        By continuing, you agree with our <Text style={styles.termsLink}>terms and conditions</Text>.
      </Text>
      
      <TouchableOpacity style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create Account</Text>
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
          <Ionicons name="logo-facebook" size={width * 0.06} color="black" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.loginText}>
        I Already Have an Account <TouchableOpacity onPress={()=>navigation.navigate("Login")} ><Text style={styles.loginLink}>Login</Text></TouchableOpacity> 
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
    justifyContent: "center",
  },
  header: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: "5%",
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
  },
  termsText: {
    color: "gray",
    marginBottom: "3%",
  },
  termsLink: {
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
    borderColor: "gray",
    borderColor: "green",
    backgroundColor: 'rgba(0, 150, 0, 0.15)',
  },
  loginText: {
    textAlign: "center",
    marginTop: "5%",
  },
  loginLink: {
    color: "green",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
