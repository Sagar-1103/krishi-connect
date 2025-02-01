import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '@env';
import axios from 'axios';
import { useLogin } from '../context/LoginProvider';

const AIChat = ({ navigation }) => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! How can I assist you today?', sender: 'bot' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [loading,setLoading] = useState(true);
    
    const { user } = useLogin();

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            setLoading(true);
            const url = `${BACKEND_URL}/ai-chat/farmer/${user?._id}`;
            const res = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.data;

            const formattedMessages = data.data.map(chat => (
                [
                    { id: chat._id, text: chat.query, sender: 'user' },
                    { id: `${chat._id}-reply`, text: chat.reply, sender: 'bot' }
                ]
            )).flat();

            setMessages([...messages, ...formattedMessages]);
        } catch (error) {
            console.log("ERROR: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim().length === 0) return;
        const userMsg = { id: Date.now().toString(), text: newMessage, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMsg]);
        setNewMessage('');

        try {
            const url = `${BACKEND_URL}/ai-chat/farmer`;
            const res = await axios.post(url, { userId: user?._id, query: newMessage }, {
                headers: { 'Content-Type': 'application/json' },
            });
            const botReply = { id: (Date.now() + 1).toString(), text: res.data, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botReply]);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };

    if(loading){
        return <View style={[styles.container,{flex: 1,
            justifyContent: 'center',
            alignItems: 'center'}]}><Text>Loading...</Text></View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item,index) => index}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageBubble,
                            item.sender === 'user' ? styles.userBubble : styles.botBubble,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={styles.chatContainer}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#aaa"
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    chatContainer: {
        padding: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '75%',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#3498db',
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#76B947',
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#34495e',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AIChat;
