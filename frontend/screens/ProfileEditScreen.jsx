import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProfileEditScreen = () => {
    const [email, setEmail] = useState("sagar@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [pincode, setPincode] = useState("403711");
    const [address, setAddress] = useState("NIT Goa");
    const [village, setVillage] = useState("Cuncolim");
    const [state, setState] = useState("Goa");
    const [country, setCountry] = useState("India");
    const [accountNumber, setAccountNumber] = useState("204356XXXXXXX");
    const [accountHolder, setAccountHolder] = useState("Sagar Shirgaonkar");
    const [ifscCode, setIfscCode] = useState("SBIN00428");

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "rgb(239, 239, 239)", padding: 20, paddingTop: 30 }} nestedScrollEnabled={false}>
            <View style={styles.header}>
                <TouchableOpacity><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.title}>Account Details</Text>
                <TouchableOpacity><Ionicons name="settings-outline" size={24} color="black" /></TouchableOpacity>
            </View>

            <Image source={require('../assets/icon.png')} style={styles.profileImage} />

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TextInputField label="Email Address" value={email} setValue={setEmail} />
            
            {/* Password input with eye icon */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={showPassword ? password : '********'} // Show password if visible
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} // Toggle secure text entry
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons 
                            name={showPassword ? "eye-off" : "eye"} 
                            style={{marginRight: '6%'}}
                            size={24} 
                            color="black" 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.changePassword}>Change Password</Text>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Address Details</Text>
            <TextInputField label="Pincode" value={pincode} setValue={setPincode} />
            <TextInputField label="Address" value={address} setValue={setAddress} />
            <TextInputField label="Village" value={village} setValue={setVillage} />
            <TextInputField label="State" value={state} setValue={setState} />
            <TextInputField label="Country" value={country} setValue={setCountry} />

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            <TextInputField label="Bank Account Number" value={accountNumber} setValue={setAccountNumber} />
            <TextInputField label="Account Holder's Name" value={accountHolder} setValue={setAccountHolder} />
            <TextInputField label="IFSC Code" value={ifscCode} setValue={setIfscCode} />

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <View style={{padding: 30}}></View>
        </ScrollView>
    );
};

const TextInputField = ({ label, value, setValue, secureTextEntry = false }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
            style={styles.input} 
            value={value} 
            onChangeText={setValue} 
            secureTextEntry={secureTextEntry} 
        />
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: '9%'
    },
    separator: {
        height: 2,
        backgroundColor: '#ddd',
        marginVertical: '5%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "black",
        marginBottom: '6%',
    },
    inputContainer: {
        marginHorizontal: '5%',
        marginBottom: '5%',
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: "black",
        marginBottom: '2%',
    },
    input: {
        fontSize: 16,
        fontWeight: "400",
        color: "black",
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    changePassword: {
        fontSize: 14,
        fontWeight: "500",
        color: "green",
        alignSelf: 'flex-end',
        marginRight: '5%',
    },
    saveButton: {
        padding: 16,
        backgroundColor: 'green',
        marginHorizontal: '5%',
        marginTop: '7%',
        borderRadius: 12,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        textAlign: 'center',
    }
});

export default ProfileEditScreen;
