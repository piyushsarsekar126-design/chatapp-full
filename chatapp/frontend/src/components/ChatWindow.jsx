import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageBubble from './MessageBubble.jsx';
import MessageInput from './MessageInput.jsx';
import TypingIndicator from './TypingIndicator.jsx';

export default function ChatWindow({
  contact,
  messages,
  currentUserId,
  isOtherTyping,
  onSend,
  onTyping,
  onStopTyping,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOtherTyping]);

  if (!contact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 rounded-full border-2 border-ink flex items-center justify-center mb-4">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <p className="text-xl font-light">Your Messages</p>
        <p className="text-sm text-muted mt-1">Pick a contact from the left to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen min-w-0">
      <ChatHeader contact={contact} />

      <div className="flex-1 overflow-y-auto scroll-thin px-4 py-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-muted mt-8">
            No messages yet. Say hi to {contact.name}!
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isMine={msg.sender === currentUserId}
          />
        ))}
        {isOtherTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} onTyping={onTyping} onStopTyping={onStopTyping} />
    </div>
  );
}
