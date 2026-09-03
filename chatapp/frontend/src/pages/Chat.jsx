import React, { useEffect, useState, useCallback } from 'react';
import api from '../api.js';
import socket from '../socket.js';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ChatWindow from '../components/ChatWindow.jsx';

export default function Chat() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOtherTyping, setIsOtherTyping] = useState(false);

  // Load the contact list once on mount
  useEffect(() => {
    api.get('/auth/users').then((res) => setContacts(res.data));
  }, []);

  // When a contact is selected, load the message history for that conversation
  const selectContact = useCallback(async (contact) => {
    setActiveContact(contact);
    setIsOtherTyping(false);
    const res = await api.get(`/messages/${contact._id}`);
    setMessages(res.data);
  }, []);

  // Set up all the real-time listeners once — cleaned up on unmount
  useEffect(() => {
    function handleReceiveMessage(message) {
      // Only add it to the open chat if it belongs to the conversation currently on screen
      setActiveContact((currentContact) => {
        if (
          currentContact &&
          (message.sender === currentContact._id || message.receiver === currentContact._id)
        ) {
          setMessages((prev) => [...prev, message]);
        }
        return currentContact;
      });
    }

    function handleStatusChanged({ userId, isOnline }) {
      setContacts((prev) =>
        prev.map((c) => (c._id === userId ? { ...c, isOnline } : c))
      );
      setActiveContact((current) =>
        current && current._id === userId ? { ...current, isOnline } : current
      );
    }

    function handleTyping({ senderId }) {
      setActiveContact((current) => {
        if (current && current._id === senderId) setIsOtherTyping(true);
        return current;
      });
    }

    function handleStopTyping({ senderId }) {
      setActiveContact((current) => {
        if (current && current._id === senderId) setIsOtherTyping(false);
        return current;
      });
    }

    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_status_changed', handleStatusChanged);
    socket.on('user_typing', handleTyping);
    socket.on('user_stop_typing', handleStopTyping);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_status_changed', handleStatusChanged);
      socket.off('user_typing', handleTyping);
      socket.off('user_stop_typing', handleStopTyping);
    };
  }, []);

  const handleSend = (text) => {
    socket.emit('send_message', {
      senderId: user.id,
      receiverId: activeContact._id,
      text,
    });
  };

  const handleTyping = () => {
    if (activeContact) {
      socket.emit('typing', { senderId: user.id, receiverId: activeContact._id });
    }
  };

  const handleStopTyping = () => {
    if (activeContact) {
      socket.emit('stop_typing', { senderId: user.id, receiverId: activeContact._id });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        contacts={contacts}
        activeContact={activeContact}
        onSelectContact={selectContact}
      />
      <ChatWindow
        contact={activeContact}
        messages={messages}
        currentUserId={user.id}
        isOtherTyping={isOtherTyping}
        onSend={handleSend}
        onTyping={handleTyping}
        onStopTyping={handleStopTyping}
      />
    </div>
  );
}
