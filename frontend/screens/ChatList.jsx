import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

const chats = [
  { id: "1", userName: "User Name", productName: "Product Name" },
  { id: "2", userName: "User Name", productName: "Product Name" },
  { id: "3", userName: "User Name", productName: "Product Name" },
  { id: "4", userName: "User Name", productName: "Product Name" },
  { id: "5", userName: "User Name", productName: "Product Name" },
  { id: "6", userName: "User Name", productName: "Product Name" },
  { id: "7", userName: "User Name", productName: "Product Name" },
  { id: "8", userName: "User Name", productName: "Product Name" },
  { id: "9", userName: "User Name", productName: "Product Name" },
  { id: "10", userName: "User Name", productName: "Product Name" },
  { id: "11", userName: "User Name", productName: "Product Name" },
  { id: "12", userName: "User Name", productName: "Product Name" },
  { id: "13", userName: "User Name", productName: "Product Name" },
];

const ChatListScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
            <Image source={require('../assets/krishiConnectLogo.png')} style={styles.logo} />
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
  
        <Text style={styles.title}>Chats</Text>
  
        
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatItem}>
              <View>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.productName}>{item.productName}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9",
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 15,
      backgroundColor: "white",
    },
    logo: {
      width: 200,
      height: 50,
      resizeMode: "contain",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#000"
    },
    chatItem: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    productName: {
      fontSize: 14,
      color: "gray",
    },
  });
  
  export default ChatListScreen;
