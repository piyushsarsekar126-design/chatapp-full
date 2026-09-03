import React from 'react';
import Avatar from './Avatar.jsx';

export default function ConversationItem({ contact, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
        isActive ? 'bg-active' : 'hover:bg-hover'
      }`}
    >
      <Avatar name={contact.name} showOnline isOnline={contact.isOnline} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{contact.name}</p>
        <p className="text-xs text-muted truncate">
          {contact.isOnline ? 'Active now' : 'Offline'}
        </p>
      </div>
    </button>
  );
}
