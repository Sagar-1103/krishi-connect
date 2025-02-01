import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { AsyncHandler } from "./utils/AsyncHandler.js";
import cors from 'cors';
import url from 'url';
import Chat from './models/Chat.js';

const port = 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Global map to store active users
const users = new Map();

// WebSocket connection handler
wss.on('connection', function connection(ws, req) {
    console.log("websocket connection")
    const { query } = url.parse(req.url, true);
    const { userId, friendId, productId } = query;

    if (!userId) {
        console.log("Invalid connection: Missing userId");
        ws.close();
        return;
    }

    // Store the user's WebSocket connection
    users.set(userId, ws);
    ws.userId = userId;
    console.log(`User connected: userId=${userId}, chatting with friendId=${friendId}`);

    ws.on('message', async function incoming(data) {
        try {
            const messageData = JSON.parse(data);
            const { recipientId, text, productId } = messageData;

            if (!recipientId) {
                console.error("Invalid message: Missing recipientId");
                return;
            }

            console.log(`Message from ${userId} to ${recipientId}: ${text} for product ${productId}`);

            await storeMessage(userId, recipientId, text, productId);

            const recipientSocket = users.get(recipientId);
            if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
                recipientSocket.send(JSON.stringify({ sender: userId, receiver: recipientId, message: text, timestamp: new Date() }));
            } else {
                console.log(`User ${recipientId} is not online.`);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        }
    });

    ws.on('close', () => {
        users.delete(userId);
        console.log(`User ${userId} disconnected`);
    });
});

// Function to store chat messages
async function storeMessage(userId, friendId, text, productId) {
    try {
        const newChat = new Chat({
            sender: userId,
            receiver: friendId,
            productId: productId,
            message: text,
        });

        await newChat.save();
    } catch (err) {
        console.error("Error saving message:", err);
    }
}

// Routes
import homeRouter from './routes/home.routes.js';
import chatRouter from './routes/chat.routes.js';

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));

app.use("/", homeRouter);
app.use("/fetch", chatRouter);
app.use("/socket", AsyncHandler(async (req, res) => {
    res.status(200).json({ "Chat-Socket Status": "Connected" });
}));

// Start the server (HTTP and WebSocket together)
server.listen(port, function () {
    console.log(`Server is running on PORT ${port}!`);
});

export { app }