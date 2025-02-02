import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Updated import for icons
import { Calendar } from "react-native-calendars";
import { useLogin } from '../context/LoginProvider';
import axios from 'axios';
import RazorpayCheckout from "react-native-razorpay";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CheckoutScreen = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const pricePerDay = 2500;
  const {tempProduct,user} = useLogin();
  const [totalDays,setTotalDays] = useState(0);
  const [tempTotalPrice,setTempTotalPrice] = useState(0);

  const navigation = useNavigation();
  
  const [listings, setListings] = useState([]);

  useEffect(()=>{
    get();
  },[])
  
  const get = async()=>{
    try {
      const response = await axios.get(`https://krishi-connect-product-service-nine.vercel.app/products/${tempProduct.authorId}`);
      const res = await response.data;
      setListings(res.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handlePay = async()=>{
    try {
      const response = await axios.post("https://krishi-connect-product-service-nine.vercel.app/products/purchase", {
        startDate,
        endDate,
        numDays:totalDays,
        totalPrice:tempTotalPrice,
        buyerId:user._id,
        productId:tempProduct._id
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.data;
      const amount = tempTotalPrice;
      if (!amount || isNaN(amount) || amount < 1) {
        Alert.alert("Invalid Amount", "Please enter a valid amount.");
        return;
      }
      console.log(tempTotalPrice);
      
      const { data } = await axios.post("https://0026-152-58-237-132.ngrok-free.app/pay/create-order", {amount:tempTotalPrice,buyerId:user._id});
      

    const options = {
      key: "rzp_test_OkdluyPOL24cvN",
      amount: tempTotalPrice*100,
      currency: "INR",
      name: "Krishi Connect",
      description: "Purchase Description",
      order_id: data.data.id,
      prefill: {
        name: "Sagar Shirgaonkar",
        email: "sagar@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    RazorpayCheckout.open(options)
      .then(async (response) => {
        const verifyRes = await axios.post("https://0026-152-58-237-132.ngrok-free.app/pay/verify-payment", response);
        Alert.alert("Payment Success", verifyRes.data.message);
      })
      .catch((error) => {
        navigation.navigate("TabNavigation");
      });
      
      
    } catch (error) {
      // console.log("Error : ",error);
      navigation.navigate("TabNavigation");
    }
  }

  // Function to handle date selection
  const handleDateSelect = async(date) => {
    if (isSelectingStartDate) {
      setStartDate(date.dateString);
      setIsSelectingStartDate(false);
      if (endDate && date.dateString > endDate) {
        setEndDate("");
      }
    } else {
      if (date.dateString >= startDate) {
        setEndDate(date.dateString);
        setIsSelectingStartDate(true);

        console.log("Start Date:", startDate);
        console.log("End Date:", date.dateString);

        const start = new Date(startDate);
        const end = new Date(date.dateString);
        const timeDiff = end - start;
        const numDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        console.log("Total Days:", numDays);

        const totalPrice = numDays * pricePerDay;
        console.log("Total Price: ₹", totalPrice);
        setTotalDays(numDays);
        setTempTotalPrice(totalPrice);

        console.log(startDate,date.dateString,numDays,totalPrice);
      }
    }
  };

  // Function to get marked dates object for calendar
  const getMarkedDates = () => {
    const marked = {};
    
    if (startDate && endDate) {
      let currentDate = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      while (currentDate <= endDateObj) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString === startDate) {
          marked[dateString] = { 
            startingDay: true, 
            color: '#2c9c69', // Green color
            textColor: 'white'
          };
        } else if (dateString === endDate) {
          marked[dateString] = {
            endingDay: true, 
            color: '#2c9c69', // Green color
            textColor: 'white'
          };
        } else {
          marked[dateString] = {
            color: '#70d28e', // Light green for in-between dates
            textColor: 'white'
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (startDate) {
      marked[startDate] = {
        selected: true,
        color: '#2c9c69', // Green color
        textColor: 'white'
      };
    }
    
    return marked;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listingCard}>
        <Image source={{ uri: item.image.imageUrl }} style={styles.listingImage} />
        <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>{item.title}</Text>
            <Text style={styles.listingDate}><Ionicons name="calendar-outline" size={16} /> {item.from}</Text>
            <Text style={styles.listingPrice}>₹{item.price} / day</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="black" style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity><Ionicons name="arrow-back" size={24} color="black" /></TouchableOpacity>
            <Image source={require('../assets/krishiConnectLogo.png')} style={styles.logo} />
            <TouchableOpacity><Ionicons name="settings-outline" size={0} color="black" /></TouchableOpacity>
        </View>
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        

        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: '6%', marginHorizontal: '6%', color: "black" }}>
            Rent Now
        </Text>

        <TouchableOpacity style={styles.listingCard}>
            <Image source={{ uri: tempProduct.image.imageUrl }} style={styles.listingImage} />
            <View style={styles.listingDetails}>
                <Text style={styles.listingTitle}>{tempProduct.title}</Text>
                <Text style={styles.listingDate}><Ionicons name="calendar-outline" size={16} />{tempProduct.from}</Text>
                <Text style={styles.listingPrice}>{`₹ ${tempProduct.price} / day`}</Text>
            </View>
            {/* <Ionicons name="chevron-forward" size={20} color="black" style={styles.chevron} /> */}
        </TouchableOpacity>

        <View style={styles.separator} />

        <Text style={{ fontSize: 18, fontWeight: "400", marginTop: '-2%', marginBottom: '3%', marginHorizontal: '6%', color: "green" }}>
            Choose your dates
        </Text>

        <View style={styles.modalContent}>
            <Calendar
              markedDates={getMarkedDates()}
              onDayPress={handleDateSelect}
              markingType="period"
              minDate={isSelectingStartDate ? undefined : startDate}
            />
        </View>

        <View style={styles.separator} />

        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: '3%', marginHorizontal: '6%', color: "black" }}>
            Order Payment Details
        </Text>

        <View style={styles.orderAmountContainer}>
            <Text style={styles.orderText}>Order Amount</Text>
            <Text style={styles.orderText}>₹ {startDate && endDate ? `${pricePerDay} x ${(new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1}` : "0"}</Text>
        </View>

        <View style={styles.orderAmountContainer}>
            <Text style={styles.orderText}>Total Amount</Text>
            <Text style={styles.orderText}>
                ₹ {startDate && endDate ? pricePerDay * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) : "0"}
            </Text>
        </View>

        <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Previous Rentals</Text>
            {listings.length === 0 ? (
                <View style={{ height: 80 }}>
                <Text style={styles.noListingsText}>No previous listings</Text>
                </View>
            ) : (
                <FlatList
                    data={listings}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    nestedScrollEnabled={false}
                    style={{ height: 300 }} 
                />

            )}

    </ScrollView>
    <TouchableOpacity onPress={handlePay} style={styles.continueButton}>
            <Text style={styles.continueText}>Payment</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
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
        marginLeft: '-4%',
        resizeMode: 'contain',
    },
    listingCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '3%',
        marginBottom: '3%',
        marginHorizontal: '3%',
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
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 10,
      width: "100%",
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: "#2c9c69",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
        orderAmountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '6%',
        marginTop: '2%',
    },
    orderText: {
        fontSize: 16,
        fontWeight: '400',
        color: "black",
    },
    sectionTitle: {
        fontSize: 16,
        color: "#000",
        fontWeight: '600',
        marginHorizontal: '6%',
        marginBottom: '6%'
    },
    noListingsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        // marginTop: '5%',
    },
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: '5%',
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
    })

export default CheckoutScreen;
