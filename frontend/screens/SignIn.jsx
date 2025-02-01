import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { getLanguage } from "../i18n.js";
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { useLogin } from "../context/LoginProvider.jsx";

const { width, height } = Dimensions.get("window");

const SignInScreen = ({navigation}) => {
  const [tempEmail,setTempEmail] = useState("");
  const [tempPassword,setTempPassword] = useState("");
  const {setUser,setRefreshToken,setAccessToken} = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getLanguage();
      i18n.changeLanguage(savedLanguage);
    };
    loadLanguage();
  }, []);

  const handleLogin = async()=>{
    if (!tempEmail || !tempPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      const user = await auth().signInWithEmailAndPassword(tempEmail, tempPassword);
      const {displayName, email} = user.user;
      const url = `${BACKEND_URL}/users/login`;
      const response = await axios.post(
        url,
        {email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.data;
      const data = res.data;

      await AsyncStorage.setItem('user',JSON.stringify(data.user));
      await AsyncStorage.setItem('refreshToken',data.refreshToken);
      await AsyncStorage.setItem('accessToken',data.accessToken);

      setUser(data.user);
      setRefreshToken(data.refreshToken);
      setAccessToken(data.accessToken);
      setTempEmail("");
      setTempPassword("");
    } catch (error) {
      console.log("Error : ",error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('welcome')}</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput value={tempEmail} autoCapitalize="none" onChangeText={setTempEmail} placeholderTextColor={"gray"} placeholder="Username or Email" style={styles.input} />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput value={tempPassword} onChangeText={setTempPassword} placeholder="Password" placeholderTextColor={"gray"} style={styles.input} secureTextEntry={!passwordVisible} />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={width * 0.05} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.termsText}>
        <Text style={styles.passLink}>Forgot Password ?</Text>
      </Text>
      
      <TouchableOpacity onPress={handleLogin} style={styles.createAccountButton}>
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
        Create An Account <Text onPress={()=>navigation.navigate("Signup")} style={styles.SignUpLink}>Sign Up</Text>
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
    fontSize: 18,
    color:"black"
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
    color:"gray"
  },
  SignUpLink: {
    color: "green",
    fontWeight: "bold",
  },
});

export default SignInScreen;