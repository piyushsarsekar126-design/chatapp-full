import React from 'react';
import ConversationItem from './ConversationItem.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Sidebar({ contacts, activeContact, onSelectContact }) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-[350px] shrink-0 border-r border-border flex flex-col h-screen">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <p className="font-semibold">{user?.name}</p>
        <button
          onClick={logout}
          className="text-xs text-muted hover:text-ink transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="px-5 py-3">
        <p className="text-sm font-semibold">Messages</p>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin">
        {contacts.length === 0 && (
          <p className="text-sm text-muted px-5 py-4">No other users yet.</p>
        )}
        {contacts.map((contact) => (
          <ConversationItem
            key={contact._id}
            contact={contact}
            isActive={activeContact?._id === contact._id}
            onClick={() => onSelectContact(contact)}
          />
        ))}
      </div>
    </aside>
  );
}
