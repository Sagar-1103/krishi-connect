<div align="center">

# Krishi Connect
### *Buy | Rent | Share - One stop solution for all your farming tools*

[![React Native](https://img.shields.io/badge/React_Native-v0.73.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Microservices-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2340?style=for-the-badge&logo=razorpay&logoColor=blue)](https://razorpay.com/)

<br />

![Krishi Connect Showcase](https://github.com/user-attachments/assets/0ea61088-7e2a-4386-8b86-6a0feac1ee2e)

<br />

**[Explore Figma Prototype](https://www.figma.com/proto/R0wcTUi2p4Gih7MIOx1j3r/Krishi-Connect?node-id=6-8063&starting-point-node-id=1%3A8867&t=uKEercjGbfRw2OBS-1)** | **[Architecture Overview](#system-architecture)** | **[Key Features](#key-features--user-workflows)** | **[Getting Started](#getting-started--local-setup)**

</div>

---

## Overview

**Krishi Connect** is a decentralized agricultural machinery sharing platform and hyper-local marketplace tailored for farming communities. Heavy agricultural equipment - such as tractors, harvesters, power tillers, and sprayers - demands immense capital expenditure, frequently forcing small and marginal farmers into debt or leaving them reliant on manual, labor-intensive practices. Meanwhile, machinery owned by progressive farmers often sits idle between planting and harvest cycles.

**Krishi Connect bridges this divide through a collaborative rental economy:**
- **Borrow Vital Machinery:** Smallholder farmers can discover, reserve, and rent modern agricultural equipment on-demand from nearby villages at accessible daily rates.
- **Lend & Monetize Idle Tools:** Equipment owners monetize idle assets, creating consistent supplementary income streams.
- **Resilient in Remote Areas:** Built-in offline synchronization ensures farmers can list and record transactions seamlessly even in low-connectivity rural zones.
- **Conversational AI Advisory & Voice Input:** An integrated AI agronomist and voice-to-text messaging empower farmers across diverse literacy levels.

---

## Core Highlights

- **Shared Resource Network:** Links rural farmers to shared agricultural tools, tractors, harvesters, and irrigation equipment across neighboring villages.
- **Resilient Offline Synchronization:** Local caching and background synchronization workers safeguard data integrity under intermittent connectivity conditions, queuing actions locally and syncing automatically once online.
- **Real-Time Farmer-to-Farmer Communication:** Bidirectional WebSocket chat enables direct negotiations, equipment availability coordination, and handover scheduling.
- **Autonomous AI Agricultural Advisory:** Autonomous query resolution powered by Google Gemini 1.5 Flash provides instantaneous advice on crop health, soil preparation, government subsidies, and loan schemes while protecting users from predatory financial scams.
- **Voice-Enabled Accessibility:** Speech-to-text capability allows farmers to dictate queries and chat messages directly via voice input.

---

## Key Features & User Workflows

### 1. Equipment Marketplace & Discovery
- **Comprehensive Agricultural Categories:** Machines, Tools, Irrigation, Fertilizers, Pesticides, Livestock, Storage, and Safety.
- **Granular Equipment Profiles:** Detailed machinery cards showing verified photos, detailed engine and implement specifications, fuel efficiency, customer ratings, pricing units (per day, per hour, per acre), and owner location.
- **Dynamic Filters & Search:** Filter by equipment type, village proximity, and rental pricing tiers.

### 2. Interactive Booking Calendar & Pricing Breakdown
- **Date Range Selection:** Visual calendar picker (`react-native-calendars`) enabling farmers to reserve equipment for single or multi-day operational windows.
- **Transparent Cost Calculation:** Dynamic calculation based on rental duration, convenience fees, coupon code discounts, and available installment options.
- **Rental History:** Farmer dashboard logging previous bookings, rental dates, and order receipts.

### 3. Secure Checkout & Direct Payouts
- **Razorpay Integration:** Full integration with Razorpay supporting UPI, Debit/Credit Cards, and Netbanking.
- **Lender Bank Payout Details:** Equipment owners input their verified bank account number and IFSC code to receive direct rental deposits.

### 4. Equipment Listing Flow ("Sell / Lend")
- **In-App Camera Capture & Cropping:** Integrated camera access and circular image cropping (`react-native-image-crop-picker`) for high-quality listing photos.
- **Precise Geolocation:** Automatically attaches latitude, longitude, village, and state coordinates via Geolocation services.
- **Flexible Pricing Units:** Allows equipment owners to define customized pricing models: `INR / day`, `INR / hour`, or `INR / acre`.

### 5. Resilient Offline Synchronization
- **Connection Awareness:** Detects network availability on device via `NetInfo`.
- **Local Persistence:** When offline, new equipment listings and form submissions are saved to local `AsyncStorage` under `pendingPost`.
- **Headless Background Worker:** Periodically checks connectivity in the background using `react-native-background-actions`. Once internet connectivity is restored, the queue is posted to the backend and the local cache is cleared.

### 6. AI Agronomist & Chatbot Assistant
- **Powered by Google Gemini 1.5 Flash:** Instant, stream-based agricultural consulting (`res.write`) specialized in crop disease prevention, fertilization routines, weather precautions, and modern farming techniques.
- **Financial Guardrails:** Prompt-engineered safeguards that actively warn farmers against fraudulent loan schemes, predatory high-interest lenders, and unfair middleman pricing.

### 7. Real-Time Chat with Voice Input
- **Low-Latency WebSockets:** Dedicated WebSocket server routing instant peer-to-peer messages with MongoDB message persistence.
- **Speech-to-Text Support:** Integrated `@react-native-voice/voice` allowing farmers to tap and speak naturally using voice-to-text.

### 8. Agricultural Community Discussion Forum
- **Peer Knowledge Sharing:** Farmers ask questions, discuss agricultural techniques (drip irrigation, drought management, pest control), and share local farming insights.
- **Community Upvotes & Replies:** Upvote helpful responses and participate in open threads to foster collaborative problem-solving.

---

## System Architecture

Krishi Connect is architected as a modern, decoupled microservices platform. The React Native mobile client interacts with services via a centralized API Gateway, with a dedicated WebSocket server managing real-time chat sessions.

### Microservices Overview

- **API Gateway (Port 3000):** Central reverse proxy managing request dispatching, authentication token verification, and unified endpoint resolution across all underlying services.
- **User Service (Port 5001):** Manages user registration, JWT authentication, farmer profiles, address management, and lender bank account payout configurations.
- **Product Service (Port 5002):** Handles machinery catalogue listings, search queries, categorization, rental order creation, and media uploads via Cloudinary.
- **Chat Service (Port 4000):** Hybrid HTTP and WebSocket service providing bidirectional real-time peer-to-peer messaging and message persistence in MongoDB.
- **AI Chat Service (Port 5003):** Integrates Google Gemini 1.5 Flash with custom prompt engineering, streaming responses, and domain-specific knowledge banks for agricultural queries.
- **Payment Service (Port 5004):** Handles checkout sessions, Razorpay order generation, and cryptographic webhook signature verification.
- **Forum Service (Port 5005):** Powers community discussion threads, questions, answers, and community upvotes.

### Offline Synchronization Mechanism

1. **Submission Check:** When a farmer creates an equipment listing, the application verifies network availability using the `NetInfo` module.
2. **Local Queueing:** If the device is offline, the serialized listing data is securely stored in local storage (`AsyncStorage`) under the `pendingPost` key, and an offline confirmation is presented to the user.
3. **Background Daemon:** A background task registered with `react-native-background-actions` polls network connectivity at regular intervals without requiring active user intervention.
4. **Cloud Reconciliation:** As soon as network connectivity is re-established, the background task reads the queued payloads from storage, executes multipart HTTP POST requests to the Product Service endpoint, and purges the cached queue upon successful HTTP 201 response confirmation.

---

## Tech Stack Matrix

| Layer | Technologies & Libraries | Purpose |
| :--- | :--- | :--- |
| **Mobile Frontend** | **React Native (0.73.6)**, React 18.2.0 | Cross-platform native mobile application |
| **Navigation** | React Navigation (Native Stack, Bottom Tabs) | Declarative screen transitions and tab routing |
| **Offline Architecture** | `@react-native-community/netinfo`, `AsyncStorage`, `react-native-background-actions` | Network connectivity detection, local disk queue, headless background synchronization |
| **Voice & Speech** | `@react-native-voice/voice` | Speech recognition and voice message input |
| **Backend Framework** | **Node.js**, **Express.js (v4.21)** (ES Modules) | Microservices backend architecture |
| **API Gateway** | `express-http-proxy`, `cors`, `dotenv` | Centralized request routing, reverse proxying, and CORS handling |
| **Real-Time Messaging** | **WebSockets (`ws` v8.18)** | Low-latency duplex communication between buyers and renters |
| **Artificial Intelligence** | **Google Generative AI (`gemini-1.5-flash`)** | Autonomous agricultural query answering with streaming chunks |
| **Database & ODM** | **MongoDB**, **Mongoose (v8.9)** | Document database for users, listings, chat history, and forums |
| **Cloud Storage** | **Cloudinary**, `multer` | Fast image uploads and CDN image optimization for equipment photos |
| **Payment Gateway** | **Razorpay Node SDK**, `react-native-razorpay` | Secure transactions, order creation, and payment verification |
| **Maps & Location** | `@rnmapbox/maps`, `@react-native-community/geolocation` | Location discovery and equipment map tagging |
| **UI Components & Motion** | `lottie-react-native`, `react-native-calendars`, Vector Icons | Clean visual indicators and interactive booking calendars |

---

## Microservices & API Reference

| Service | Port | Base Proxy Route | Core Responsibilities |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `3000` | `/` | Centralized routing proxy forwarding calls to underlying services |
| **User Service** | `5001` | `/u` | Authentication, JWT tokens, profile management, and bank payout details |
| **Product Service** | `5002` | `/p` | Machinery listings, category filtering, Cloudinary image upload, and orders |
| **Chat Service** | `4000` | `/chat` & `ws://` | Duplex WebSocket chat, active user map, and chat history retrieval |
| **AI Chat Service** | `5003` | `/ai-chat` | Google Gemini 1.5 Flash stream generation with agricultural domain guardrails |
| **Payment Service** | `5004` | `/payment` | Razorpay order creation (`/pay/create-order`) and HMAC signature verification |
| **Forum Service** | `5005` | `/f` | Agricultural discussion posts, answers, comments, and upvote tracking |

---

## Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.x or later) & **npm** / **yarn**
- **MongoDB** instance (local MongoDB service or MongoDB Atlas connection URI)
- **Android Studio** (with Android SDK, platform tools, and emulator) or **Xcode** (macOS)
- **API Keys & Credentials:**
  - Google Gemini API Key
  - Cloudinary credentials (`CLOUD_NAME`, `API_KEY`, `API_SECRET`)
  - Razorpay Test Key and Secret

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sagar-1103/krishi-connect.git
cd krishi-connect
```

---

### Step 2: Configure Environment Variables

Create `.env` files in each microservice folder:

#### `backend/api-gateway/.env`
```env
PORT=3000
```

#### `backend/ai-chat/.env`
```env
PORT=5003
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_ai
GEMINI_API_KEY=your_google_gemini_api_key
```

#### `backend/chat-service/.env`
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_chat
```

#### `backend/payment-service/.env`
```env
PORT=5004
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_payment
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### `backend/product-service/.env`
```env
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_products
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### `backend/user-service/.env`
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_users
JWT_SECRET=your_jwt_secret_token
```

#### `backend/forum-service/.env`
```env
PORT=5005
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishi_forum
```

---

### Step 3: Start Backend Services

Navigate to each microservice folder, install dependencies, and launch:

```bash
# Terminal 1: API Gateway
cd backend/api-gateway && npm install && npm run dev

# Terminal 2: Product Service
cd backend/product-service && npm install && npm run dev

# Terminal 3: Chat Service (WebSocket + HTTP)
cd backend/chat-service && npm install && npm run dev

# Terminal 4: AI Chat Service (Gemini)
cd backend/ai-chat && npm install && npm run dev

# Terminal 5: Payment Service
cd backend/payment-service && npm install && npm run dev

# Terminal 6: User Service
cd backend/user-service && npm install && npm run dev

# Terminal 7: Forum Service
cd backend/forum-service && npm install && npm run dev
```

---

### Step 4: Run the Mobile Application

```bash
cd frontend

# Install JavaScript dependencies
npm install

# (iOS only) Install CocoaPods
cd ios && pod install && cd ..

# Start Metro Bundler
npm start

# In a separate terminal, launch Android or iOS
npm run android
# or
npm run ios
```

---

## UI/UX Design & Prototype

The UI/UX design of **Krishi Connect** was designed in Figma around the real-world operational constraints of farmers:

- **Large Interactive Targets:** Touch targets designed for outdoor visibility and ease of use in field conditions.
- **Iconography-Supported Navigation:** Tab bar, category headers, and form inputs are paired with intuitive visual cues to accommodate users with basic literacy.
- **Visual Feedback:** Instant visual confirmations and smooth animations on successful equipment listings and bookings.
- **High-Contrast Palette:** Agriculture Emerald Green (`#0F9D58`) accents paired with soft backgrounds (`#F9F9F9`) to ensure clear readability under bright sunlight.

[View the Live Figma Prototype](https://www.figma.com/proto/R0wcTUi2p4Gih7MIOx1j3r/Krishi-Connect?node-id=6-8063&starting-point-node-id=1%3A8867&t=uKEercjGbfRw2OBS-1)
