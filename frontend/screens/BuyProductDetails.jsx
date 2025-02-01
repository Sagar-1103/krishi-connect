import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';

const BuyProductDetails = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();

    const {setTempProduct} = useLogin();

    useEffect(()=>{
        setTempProduct(product)
    },[])
    

    const handleChatRedirect = async()=>{
        navigation.navigate("ChatScreen",{product});
    }
    
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
        <Image source={require('../assets/krishiConnectLogo.png')} style={styles.logo} />
        <TouchableOpacity><Ionicons name="settings-outline" size={16} color="rgba(0,0,0,0)" /></TouchableOpacity>
    </View>
    <ScrollView style={{ flex: 1,}} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 16, borderRadius: 16, shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 16,
        elevation: 6, }}>
        <Image source={{uri:product.image.imageUrl}} style={styles.mainImage}></Image>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.subCategory}>{product.subCategory}</Text>
        <Text style={styles.price}>{product.price}{" / "}{product.pricingUnit.split(" ")[1]}</Text>
        </View>
        <View style={styles.lowerHalf}>
            <Text style={styles.descriptionTitle}>Product Details</Text>
            <Text style={styles.description}>{product.description}</Text>
        </View>
         
    </ScrollView>
    <TouchableOpacity onPress={()=>navigation.navigate("CheckoutScreen",product)} style={styles.continueButton}>
            <Text style={styles.continueText}>Rent Now</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleChatRedirect} style={styles.chatBtn}>
            <Ionicons name="chatbubble" size={24} style={{marginVertical: 12}} color="#fff" />
    </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: '5%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: '40%',
        height: 50,
        marginLeft: '-4%',
        resizeMode: 'contain',
    },
    mainImage: {
        width: "100%",
        height: 400,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "left",
        color: "#000",
        marginTop: "5%",
        marginVertical: "1%",
      },
    category: {
        fontSize: 16,
        textAlign: "left",
        color: "#000",
    },
    subCategory: {
        fontSize: 16,
        textAlign: "left",
        color: "#000",
    },
    price: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "left",
        color: "green",
    },
    descriptionTitle: {
        fontSize: 16,
        textAlign: "left",
        color: "#000",
        marginLeft: "-2%",
        marginBottom: "2%"
    },
    description: {
        fontSize: 14,
        textAlign: "left",
        color: "gray",
        marginBottom: "9%"
    },
    lowerHalf: {
        marginTop: "8%",
        padding: 16,
    },
    continueButton: {
        position: "absolute",
        bottom: 20,
        right:30,
        backgroundColor: "green",
        paddingVertical: "5%",
        width: "60%",
        borderRadius: 32,
        alignItems: "center",
        zIndex: 999,
      },
      continueText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      chatBtn: {
        position: "absolute",
        bottom: 20,
        left:70,
        backgroundColor: "green",
        width: 50,
        height: 50,
        borderRadius: 32,
        alignItems: "center",
        zIndex: 999,
      },
})

export default BuyProductDetails