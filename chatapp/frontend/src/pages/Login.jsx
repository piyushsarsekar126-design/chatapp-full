import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hover">
      <div className="w-full max-w-[350px] px-4">
        <div className="bg-white border border-border rounded-sm p-10">
          <h1 className="text-3xl font-semibold text-center mb-8 tracking-tight">
            ChatApp
          </h1>

          {error && (
            <p className="text-red-500 text-xs text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
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
              Log in
            </button>
          </form>
        </div>

        <div className="bg-white border border-border rounded-sm p-5 mt-3 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
