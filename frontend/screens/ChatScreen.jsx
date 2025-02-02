import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Voice from "@react-native-voice/voice";
import { useLogin } from "../context/LoginProvider";

const ChatScreen = ({route}) => {
  const { product } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [ws, setWs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [currentVoiceLanguage, setCurrentVoiceLanguage] = useState("en-US");
  
    const languageOptions = [
      { label: "English", code: "en-US" },
      { label: "Hindi", code: "hi-IN" },
      { label: "Marathi", code: "mr-IN" },
      { label: "Telugu", code: "te-IN" },
      { label: "Tamil", code: "ta-IN" },
    ];
  
    const {user} = useLogin();
  
    const userId = user?._id;
    const friendId = product?.authorId;
    const productId = product?._id;
  
    console.log(userId,friendId,productId);

  useEffect(() => {
    // const getChat = async () => {
    //   try {
    //     const response = await fetch(
    //      `https://6a62-118-151-210-82.ngrok-free.app/fetch/chat?userId=${userId}&friendId=${friendId}&productId=${productId}`
    //        ,{
    //         method: "GET",headers: {
    //           "ngrok-skip-browser-warning": "true",
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log(response);
        
    //     if (response.ok) {
    //       const data = await response.json();
    //       const formattedMessages = data.messages
    //         .map((msg) => ({
    //           id: msg._id,
    //           text: msg.message,
    //           sender: msg.sender === userId ? "me" : "other",
    //           timestamp: new Date(msg.createdAt).getTime(),
    //         }))
    //         .sort((a, b) => b.timestamp - a.timestamp);
    //       setMessages(formattedMessages);
    //     } else {
    //       console.error("API Error:", response.status, response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Network Error:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // getChat();

    const websocket = new WebSocket(
      `wss://3c3e-118-151-210-82.ngrok-free.app?userId=${userId}&friendId=${friendId}&productId=${productId}`
    );

    websocket.onopen = () => console.log("Connected to WebSocket");
    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [
        {
          id: message._id || new Date().getTime().toString(),
          text: message.message,
          sender: message.sender === userId ? "me" : "other",
          timestamp: new Date(message.timestamp).getTime(),
        },
        ...prevMessages,
      ]);
    };
    websocket.onclose = () => console.log("Disconnected from WebSocket");

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
        productId: productId,
        timestamp: new Date().toISOString(),
      };
      ws.send(JSON.stringify(messageObj));
      setMessages((prevMessages) => [
        {
          id: new Date().getTime().toString(),
          text: inputText,
          sender: "me",
          timestamp: new Date().getTime(),
        },
        ...prevMessages,
      ]);
      setInputText("");
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start(currentVoiceLanguage); // Using selected language
    } catch (e) {
      console.log("Error ->", e);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (e) {
      console.log("Error ->", e);
    }
  };

  const handleToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setInputText(e.value[0]);
      }
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleLanguagePress = () => {
    setModalVisible(true);
  };

  const selectLanguage = (languageCode) => {
    setSelectedLanguage(languageCode);
    setCurrentVoiceLanguage(languageCode);
    setModalVisible(false);
    
    // Update Voice recognition language
    Voice.destroy().then(() => {
      Voice.start(languageCode);
    });
  };

  const getCurrentLanguageLabel = () => {
    const currentLanguage = languageOptions.find(lang => lang.code === selectedLanguage);
    return currentLanguage ? currentLanguage.label : "English";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headTitle}>Chat</Text>
        <TouchableOpacity 
          style={styles.languageSelector}
          onPress={handleLanguagePress}
        >
          <Text style={styles.languageButtonText}>
            {getCurrentLanguageLabel()} ▼
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "me" ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          inverted
        />
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languageOptions.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.code && styles.selectedLanguage,
                ]}
                onPress={() => selectLanguage(lang.code)}
              >
                <Text style={[
                  styles.languageText,
                  selectedLanguage === lang.code && styles.selectedLanguageText
                ]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={"black"}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleToggle} style={styles.micButton}>
          <Ionicons name={isRecording ? "mic" : "mic-off"} size={24} color="white" />
        </TouchableOpacity>
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
    paddingHorizontal: "5%" 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: "5%",
    marginBottom: 10,
  },
  headTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#000" 
  },
  languageSelector: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  languageButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  messageBubble: { 
    maxWidth: "80%", 
    padding: 10, 
    borderRadius: 18, 
    marginVertical: 5 
  },
  sentBubble: { 
    alignSelf: "flex-end", 
    backgroundColor: "green" 
  },
  receivedBubble: { 
    alignSelf: "flex-start", 
    backgroundColor: "gray" 
  },
  messageText: { 
    color: "white", 
    fontSize: 16 
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
  micButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  languageButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedLanguage: {
    backgroundColor: "#3498db",
  },
  languageText: {
    fontSize: 16,
    color: "#000",
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#ff5a5f",
    borderRadius: 8,
    width: "100%",
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default ChatScreen;