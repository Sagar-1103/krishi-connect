import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
    const [listings, setListings] = useState([    //dummy data
        {
            id: 1,
            title: 'Harvester / Thrasher',
            date: '19 March 2024',
            price: 2500,
            image: 'https://picsum.photos/500',
        },
        {
            id: 2,
            title: 'Tractor Plough Only',
            date: '25 March 2024',
            price: 600,
            image: 'https://picsum.photos/500',
        },
    ]);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await fetch('');
            const data = await response.json();
            setListings(data);
        } catch (error) {
            console.error('Error fetching listings:', error);
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

            <TouchableOpacity style={styles.newListingButton}>
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
        backgroundColor: '#f5f5f5',
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

export default HomeScreen;
