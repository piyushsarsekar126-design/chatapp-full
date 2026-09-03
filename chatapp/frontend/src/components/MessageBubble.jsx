import React from 'react';

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message, isMine }) {
  return (
    <div className={`flex mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[65%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-3xl text-sm leading-snug break-words ${
            isMine
              ? 'bg-bubble-grad text-white'
              : 'bg-active text-ink'
          }`}
        >
          {message.text}
        </div>
        <span className="text-[10px] text-muted mt-1 px-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
