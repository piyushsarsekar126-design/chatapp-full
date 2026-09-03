# ChatApp — Real-Time MERN Chat (Instagram DM style)

Full-stack real-time chat application. React frontend, Node/Express +
Socket.io backend, MongoDB for storage.

## What's included
- Signup / Login with JWT
- Contact list with live online/offline status
- Real-time messaging (Socket.io)
- "Typing..." indicator
- Full message history saved in MongoDB and reloaded on conversation open
- Instagram-DM-inspired UI (gradient message bubbles, clean sidebar)

## Folder structure
```
chatapp/
  backend/     → Express API + Socket.io server
  frontend/    → React (Vite) + Tailwind CSS
```

## Setup — Backend

```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env`:
```
MONGO_URI=<your MongoDB Atlas connection string>
PORT=5000
JWT_SECRET=<any random string>
```
Run it:
```bash
npm run dev
```
Should print `MongoDB connected` and `Server running on port 5000`.

## Setup — Frontend

Open a **second terminal**:
```bash
cd frontend
npm install
cp .env.example .env
```
`.env` already points to `localhost:5000` — leave as-is for local dev.
```bash
npm run dev
```
Opens at `http://localhost:5173`.

## How to actually test the real-time part

You need **two different logged-in users** talking to each other. Easiest way:
1. Open `http://localhost:5173` in a normal browser window — sign up as "User A"
2. Open the same URL in an **Incognito/Private window** — sign up as "User B"
3. In User A's window, click on "User B" in the sidebar and send a message
4. Watch it appear instantly in User B's window — that's Socket.io working

## How the real-time flow works (quick recap)
1. On login, the frontend opens a Socket.io connection and tells the server
   "this socket belongs to user X" (`socket.emit('register', userId)`)
2. The server keeps an in-memory map of `userId -> socket.id` for who's online
3. When a message is sent, the server saves it to MongoDB first, then
   delivers it instantly to the receiver's socket if they're online
4. If the receiver is offline, the message still saves — they'll see it in
   their history next time they open that conversation

## Deployment (same pattern as DevBlog)
- Backend → Render (Web Service, root directory `backend`)
- Frontend → Vercel (root directory `frontend`, env var `VITE_API_URL` and
  `VITE_SOCKET_URL` pointed at your deployed backend URL)

## Next features to add yourself (good learning exercises)
- Unread message badge on contacts you haven't opened yet
- Image/file sharing in messages
- Group chats (would need a new `Room` model)
- Message delete/edit
