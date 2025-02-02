import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const discussion = {
  id: "1",
  title: "How to improve crop yield in dry seasons?",
  description: "Looking for effective techniques to increase agricultural yield during dry seasons. Any suggestions?",
  comments: [
    { id: "1", text: "Try drip irrigation techniques.", upvotes: 5 },
    { id: "2", text: "Use drought-resistant crop varieties.", upvotes: 8 },
    { id: "3", text: "Mulching helps retain soil moisture.", upvotes: 3 },
  ],
};

const ForumDiscussionScreen = ({ navigation }) => {
  const [comments, setComments] = useState(discussion.comments);

  const handleUpvote = (commentId) => {
    
  };

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

      <Text style={styles.title}>{discussion.title}</Text>
      <Text style={styles.description}>{discussion.description}</Text>

      <View style={styles.separator} />
      <Text style={styles.commentHeader}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.commentText}>{item.text}</Text>
            <View style={styles.upvoteSection}>
              <TouchableOpacity onPress={() => handleUpvote(item.id)}>
                <Ionicons name="thumbs-up-sharp" size={20} color="green"  />
              </TouchableOpacity>
              <Text style={styles.upvoteCount}>{item.upvotes}</Text>
            </View>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={"black"}
        />
        <TouchableOpacity style={styles.sendButton}>
        <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
    </KeyboardAvoidingView>
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
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green"
  },
  commentItem: {
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
  commentText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  upvoteSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  upvoteCount: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    color: "black",
  },
  sendButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
  },
});

export default ForumDiscussionScreen;
