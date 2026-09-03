import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-active px-4 py-3 rounded-3xl flex gap-1">
        <span className="typing-dot w-1.5 h-1.5 bg-muted rounded-full inline-block" />
        <span className="typing-dot w-1.5 h-1.5 bg-muted rounded-full inline-block" />
        <span className="typing-dot w-1.5 h-1.5 bg-muted rounded-full inline-block" />
      </div>
    </div>
  );
}
