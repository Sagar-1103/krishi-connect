import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider';
import { BACKEND_URL } from '@env';

const { width, height } = Dimensions.get("window");

const SignUpScreen = ({navigation}) => {
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [tempConfirmPassword, setTempConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {setUser,setRefreshToken,setAccessToken} = useLogin();

  const handleSignup = async () => {
    if (!tempEmail || !tempPassword || !tempConfirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    if (tempPassword !== tempConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        tempEmail,
        tempPassword,
      );
      const user = userCredential.user;
      console.log(user);

      const url = `${BACKEND_URL}/users/signup`;
      const response = await axios.post(
        url,
        {email: user?.email, name: user?.email.split('@')[0]},
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
      setTempConfirmPassword("");

    } catch (error) {
      console.log('Error : ', error);
      Alert.alert(
        'Signup Error',
        error.response?.data?.message || error.message,
      );
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();
      idToken = signInResult.data?.idToken;
      if (!idToken) {
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        signInResult.data.idToken,
      );
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const {displayName, email, photoURL, uid} = userCredential.user;
      console.log('User Details:', {displayName, email, photoURL, uid});
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput value={tempEmail} onChangeText={setTempEmail} placeholderTextColor={"gray"} placeholder="Username or Email" style={styles.input} />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput value={tempPassword} onChangeText={setTempPassword} placeholderTextColor={"gray"} placeholder="Password" style={styles.input} secureTextEntry={!passwordVisible} />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={width * 0.05} color="gray" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={width * 0.05} color="gray" style={styles.icon} />
        <TextInput value={tempConfirmPassword} onChangeText={setTempConfirmPassword} placeholderTextColor={"gray"} placeholder="Confirm Password" style={styles.input} secureTextEntry={!confirmPasswordVisible} />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={width * 0.05} color="gray" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.termsText}>
        By continuing, you agree with our <Text style={styles.termsLink}>terms and conditions</Text>.
      </Text>
      
      <TouchableOpacity onPress={handleSignup} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>- OR Continue with -</Text>
      
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity onPress={onGoogleButtonPress} style={styles.socialButton}>
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
        I Already Have an Account <Text onPress={()=>navigation.navigate("Login")} style={styles.loginLink}>Login</Text>
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
    color:"black"
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
    color:"gray"
  },
  loginLink: {
    color: "green",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
