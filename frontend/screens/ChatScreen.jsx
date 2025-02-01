import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [ws, setWs] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = "user2";  // Replace with dynamic user ID if needed
  const friendId = "user1"; // Replace with dynamic friend ID if needed
  const productId="pdt1"

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await fetch(
          `https://7ed5-118-151-210-82.ngrok-free.app/fetch/chat?userId=${userId}&friendId=${friendId}&productId=${productId}`,
          {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const formattedMessages = data.messages.map(msg => ({
            id: msg._id,
            text: msg.message,
            sender: msg.sender === userId ? 'me' : 'other',
            timestamp: new Date(msg.createdAt).getTime(),
          })).sort((a, b) => b.timestamp - a.timestamp); // Sort messages by time
          setMessages(formattedMessages);
        } else {
          console.error('API Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Network Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getChat();

    // Initialize WebSocket connection
    const websocket = new WebSocket(`https://7ed5-118-151-210-82.ngrok-free.app?userId=${userId}&friendId=${friendId}&productId=${productId}`);

    websocket.onopen = () => console.log('Connected to WebSocket');

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const formattedMessage = {
        id: message._id || new Date().getTime().toString(),
        text: message.message,
        sender: message.sender === userId ? 'me' : 'other',
        timestamp: new Date(message.timestamp).getTime(),
      };
      setMessages((prevMessages) => [formattedMessage, ...prevMessages]); // Prepend message
    };

    websocket.onclose = () => console.log('Disconnected from WebSocket');

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && inputText.trim()) {
      const messageObj = {
        sender: userId,
        recipientId: friendId,
        text: inputText,
        productId:productId,
        timestamp: new Date().toISOString(),
      };

      ws.send(JSON.stringify(messageObj));

      // Optimistically update UI
      setMessages(prevMessages => [
        { id: new Date().getTime().toString(), text: inputText, sender: 'me' },
        ...prevMessages // Prepend message to keep it at the bottom
      ]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>Chat Title</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
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
      )}

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
  messageContainer: {
    marginTop: "-15%",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  messageContainer : {
    height: "87%",
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