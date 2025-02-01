import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const discussions = [
  { id: "1", question: "How to improve crop yield in dry seasons?", userName: "JohnDoe", comments: 12 },
  { id: "2", question: "Best fertilizers for organic farming?", userName: "JaneSmith", comments: 8 },
  { id: "3", question: "What are the latest trends in AgriTech?", userName: "FarmerJoe", comments: 5 },
  { id: "4", question: "How to prevent pest infestations in wheat crops?", userName: "SaraGreen", comments: 15 },
  { id: "5", question: "How to improve crop yield in dry seasons?", userName: "JohnDoe", comments: 12 },
  { id: "6", question: "Best fertilizers for organic farming?", userName: "JaneSmith", comments: 8 },
  { id: "7", question: "What are the latest trends in AgriTech?", userName: "FarmerJoe", comments: 5 },
  { id: "8", question: "How to prevent pest infestations in wheat crops?", userName: "SaraGreen", comments: 15 },
  { id: "9", question: "How to improve crop yield in dry seasons?", userName: "JohnDoe", comments: 12 },
  { id: "10", question: "Best fertilizers for organic farming?", userName: "JaneSmith", comments: 8 },
  { id: "11", question: "What are the latest trends in AgriTech?", userName: "FarmerJoe", comments: 5 },
  { id: "12", question: "How to prevent pest infestations in wheat crops?", userName: "SaraGreen", comments: 15 },
];

const ForumDiscussionList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require("../assets/krishiConnectLogo.png")} style={styles.logo} />
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Forum Discussions</Text>

      <FlatList
        data={discussions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.discussionItem}>
            <View style={styles.textContainer}>
              <Text style={styles.question} numberOfLines={1} ellipsizeMode="tail">{item.question}</Text>
              <Text style={styles.userName}>by {item.userName}</Text>
            </View>
            <View style={styles.commentSection}>
              <Ionicons name="chatbubble-outline" size={20} color="black" />
              <Text style={styles.commentCount}>{item.comments}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
        <TouchableOpacity style={styles.newButton}>
            <Text style={styles.newButtonText}><Ionicons name="add" size={40} color="white" /></Text>
        </TouchableOpacity>
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
      color: "#000",
    },
    discussionItem: {
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
    textContainer: {
      flex: 1,
    },
    question: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    userName: {
      fontSize: 14,
      color: "gray",
    },
    commentSection: {
      alignItems: "center",
    },
    commentCount: {
      fontSize: 14,
      color: "gray",
      marginTop: 2,
    },
    newButton: {
        position: "absolute",
        bottom: 30,
        right:30,
        backgroundColor: "green",
        paddingVertical: "5%",
        width: 60,
        height: 60,
        borderRadius: 32,
        alignItems: "center",
        zIndex: 999,
        },
        newButtonText: {
        marginVertical: 6,
        fontWeight: "bold",
    },
  });

export default ForumDiscussionList;
