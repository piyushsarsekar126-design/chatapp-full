import React from 'react';
import Avatar from './Avatar.jsx';

export default function ChatHeader({ contact }) {
  return (
    <div className="h-[72px] shrink-0 border-b border-border px-5 flex items-center gap-3">
      <Avatar name={contact.name} showOnline isOnline={contact.isOnline} />
      <div>
        <p className="text-sm font-semibold">{contact.name}</p>
        <p className="text-xs text-muted">
          {contact.isOnline ? 'Active now' : 'Offline'}
        </p>
      </div>
    </div>
  );
}
