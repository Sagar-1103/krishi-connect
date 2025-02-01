import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "rgb(239, 239, 239)", padding: 20, paddingTop: 30, paddingHorizontal: 30 }} nestedScrollEnabled={false}>
        <View style={styles.header}>
            <TouchableOpacity><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity><Ionicons name="settings-outline" size={0} color="black" /></TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
            <TouchableOpacity><Ionicons name="person" size={30} color="black" /></TouchableOpacity>
            <Text style={styles.subTitle}>Account Details</Text>
            <TouchableOpacity><Ionicons name="arrow-forward" size={24} color="black" /></TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
            <TouchableOpacity><Ionicons name="language" size={30} color="black" /></TouchableOpacity>
            <Text style={styles.subTitle}>Language Settings</Text>
            <TouchableOpacity><Ionicons name="arrow-forward" size={24} color="black" /></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Log Out</Text>
        </TouchableOpacity>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15%'
    },
    
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
        marginRight: '5%'
    },

    subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginRight: '5%'
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10%',
        backgroundColor: '#fff',
        padding: '7%',
        borderRadius: 20
    },
    saveButton: {
        padding: 16,
        backgroundColor: 'green',
        marginHorizontal: '5%',
        marginTop: '107%',
        borderRadius: 12,
        // bottom:'100%'
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: 'center',
    }
})

export default ProfileScreen