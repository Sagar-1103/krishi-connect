import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLogin } from '../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import axios from 'axios';

const Logout = () => {
    const {setUser,setAccessToken,setRefreshToken} = useLogin();

    const handleLogout = async()=>{
        try {
            const url = `${BACKEND_URL}/users/logout`;
            const response = await axios.post(url,{},
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );
            const res = await response.data;
            const data = res.data;
            console.log(data);
            await AsyncStorage.clear();
            setUser(null);
            setAccessToken(null);
            setRefreshToken(null);
        } catch (error) {
            console.log("Error : ",error);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout} style={{backgroundColor:"powderblue",paddingVertical:10,paddingHorizontal:30,borderRadius:25}} >
                <Text style={{color:"black",fontWeight:600}} >Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default Logout;
