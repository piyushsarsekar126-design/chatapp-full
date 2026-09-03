import { io } from 'socket.io-client';

// autoConnect is false — we manually .connect() only after login,
// so a logged-out visitor never opens a socket connection.
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
});

export default socket;
