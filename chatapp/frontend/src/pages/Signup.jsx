import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/signup', form);
      login(res.data.user, res.data.token);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hover">
      <div className="w-full max-w-[350px] px-4">
        <div className="bg-white border border-border rounded-sm p-10">
          <h1 className="text-3xl font-semibold text-center mb-2 tracking-tight">
            ChatApp
          </h1>
          <p className="text-muted text-center text-sm mb-6">
            Sign up to start chatting.
          </p>

          {error && (
            <p className="text-red-500 text-xs text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-hover border border-border rounded-sm text-sm outline-none focus:border-muted"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-hover border border-border rounded-sm text-sm outline-none focus:border-muted"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-hover border border-border rounded-sm text-sm outline-none focus:border-muted"
            />
            <button
              type="submit"
              className="w-full mt-2 py-1.5 bg-accent text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign up
            </button>
          </form>
        </div>

        <div className="bg-white border border-border rounded-sm p-5 mt-3 text-center">
          <p className="text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-accent font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
