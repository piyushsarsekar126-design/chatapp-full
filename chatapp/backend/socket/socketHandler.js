const Message = require('../models/Message');
const User = require('../models/User');

// This map tracks which userId is connected to which socket.id right now.
// It only lives in server memory (resets if the server restarts) — that's fine,
// because it's just for "who's online right now," not permanent data.
const onlineUsers = new Map(); // userId -> socket.id

function socketHandler(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // The frontend calls this right after connecting, to say "this socket belongs to this user"
    socket.on('register', async (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId; // remember it on the socket itself too, for disconnect cleanup

      await User.findByIdAndUpdate(userId, { isOnline: true });

      // Tell everyone else this user just came online (so their contact list can update)
      io.emit('user_status_changed', { userId, isOnline: true });
    });

    // Frontend emits this when the user hits "send"
    socket.on('send_message', async ({ senderId, receiverId, text }) => {
      try {
        // 1. Save it to the database first — this is the permanent record
        const message = await Message.create({
          sender: senderId,
          receiver: receiverId,
          text,
        });

        // 2. If the receiver is currently online, deliver it to them instantly
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', message);
        }

        // 3. Also send it back to the sender, so their own chat window updates too
        socket.emit('receive_message', message);
      } catch (err) {
        console.error('Error saving message:', err.message);
      }
    });

    socket.on('typing', ({ receiverId, senderId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('user_typing', { senderId });
      }
    });

    socket.on('stop_typing', ({ receiverId, senderId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('user_stop_typing', { senderId });
      }
    });

    socket.on('disconnect', async () => {
      console.log('A user disconnected:', socket.id);

      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        await User.findByIdAndUpdate(socket.userId, { isOnline: false });
        io.emit('user_status_changed', { userId: socket.userId, isOnline: false });
      }
    });
  });
}

module.exports = socketHandler;
