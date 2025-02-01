import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! 👋", sender: "other" },
    { id: "2", text: "Hey! How are you?", sender: "me" }
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages([{ id: Date.now().toString(), text: inputText, sender: "me" }, ...messages]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
    <Text style={styles.headTitle}>Chat Title</Text>
    <View style={styles.messageContainer}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === "me" ? styles.sentBubble : styles.receivedBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        inverted
      />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: "5%",
  },
  headTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    color: "#000"
},
messageContainer : {
    marginTop: "-15%",
},
  messageBubble: {
    maxWidth: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 18,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sentBubble: {
    alignSelf: "flex-end",
    backgroundColor: "green",
    borderBottomRightRadius: 0,
  },
  receivedBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#7b7b7b",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: "2.5%",
    paddingHorizontal: "5%",
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
  },
  sendButton: {
    backgroundColor: "green",
    padding: "3%",
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default ChatScreen;
