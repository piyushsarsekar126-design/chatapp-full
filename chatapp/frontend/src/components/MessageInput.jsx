import React, { useState, useRef } from 'react';

export default function MessageInput({ onSend, onTyping, onStopTyping }) {
  const [text, setText] = useState('');
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping();

    // Debounce: only fire "stop typing" after the user pauses for 1.5s
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      onStopTyping();
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
    clearTimeout(typingTimeout.current);
    onStopTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4 flex items-center gap-2">
      <input
        value={text}
        onChange={handleChange}
        placeholder="Message..."
        className="flex-1 px-4 py-2.5 bg-hover border border-border rounded-full text-sm outline-none focus:border-muted"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="text-accent font-semibold text-sm disabled:text-muted disabled:cursor-not-allowed px-2"
      >
        Send
      </button>
    </form>
  );
}
