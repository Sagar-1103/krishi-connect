import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { useLogin } from '../context/LoginProvider';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';
import axios from 'axios';
import { log } from 'console';


const { width } = Dimensions.get('window');

const SellScreen = () => {
    const {setUploadingImage,user} = useLogin();
    const [listings, setListings] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        perm();
        fetchListings();
    }, []);
    
    const perm = async () => {
        await requestCameraPermission();
      };
    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'App Camera Permission',
              message:
                'This App needs access to your camera ' +
                'so you can take pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const upload = async() => {
    ImagePicker.openCamera({
        width: 1024,
        height: 1024,
        cropperCircleOverlay: true,
        compressImageQuality: 1, 
        compressImageMaxWidth: 1024,
        compressImageMaxHeight: 1024,
        cropperToolbarTitle:"Crop Eye Image",
    })
        .then(image => {
            setUploadingImage({
                uri: image.path,
                name: image.filename || `profile_${Date.now()}.jpg`, 
                type: image.mime || "image/jpeg",
              });
            console.log(image.size);
            navigation.navigate("ProductDetailsScreen");
        })
        .catch(error => {
        console.log(error);
        });
    };

    const fetchListings = async () => {
        try {
            const url = `https://krishi-connect-product-service-nine.vercel.app/products/${user._id}`;
            const response = await axios.get(url);
            const data = await response.data;
            const res = data.data;
            
            const r = res.map((i,index)=>{
                return {
                    id:index,
                    title: i.title ,
                    date: i.from,
                    price: i.price,
                    image: i.image.imageUrl,
                }
            })
            setListings(r);
            
            
        } catch (error) {
            console.log('Error fetching listings:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listingCard}>
            <Image source={{ uri: item.image }} style={styles.listingImage} />
            <View style={styles.listingDetails}>
                <Text style={styles.listingTitle}>{item.title}</Text>
                <Text style={styles.listingDate}><Ionicons name="calendar-outline" size={16} /> {item.date}</Text>
                <Text style={styles.listingPrice}>₹{item.price} / day</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/krishiConnectLogo.png')} style={styles.logo} />
                <TouchableOpacity><Ionicons name="settings-outline" size={24} color="black" /></TouchableOpacity>
            </View>
            
            <Text style={styles.headTitle}>Rent or Sell</Text>

            <TouchableOpacity onPress={upload} style={styles.newListingButton}>
                <Ionicons name="add" size={40} color="green" />
                <Text style={styles.newListingText}>New Listing</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Previous Listings</Text>
            {listings.length === 0 ? (
                <Text style={styles.noListingsText}>No previous listings</Text>
            ) : (
                <FlatList 
                    data={listings} 
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={renderItem} 
                />
            )}
        </View>
    );
};

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
    separator: {
        height: 2,
        backgroundColor: '#ddd',
        marginVertical: '5%',
    },
    logo: {
        width: '40%',
        height: 50,
        marginLeft: '-8%',
        resizeMode: 'contain',
    },
    sectionTitle: {
        fontSize: 16,
        color: "#000"
    },
    headTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '5%',
        color: "#000"
    },
    newListingButton: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '5%',
        alignItems: 'center',
        marginTop: '5%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    newListingText: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
    },
    listingCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '3%',
        marginVertical: '2%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 6,
        elevation: 3,
    },
    listingImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
    },
    listingDetails: {
        flex: 1,
        marginLeft: '5%',
    },
    listingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    listingDate: {
        color: 'gray',
    },
    listingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    chevron: {
        marginLeft: '2%',
    },
    noListingsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: '5%',
    },
});

export default SellScreen;
