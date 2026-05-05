'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await auth.login(formData);
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 1.5rem;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }
        .brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          color: #fff;
        }

        .login-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.03em;
          margin-bottom: 0.4rem;
        }
        .login-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
        }

        .field-group { margin-bottom: 1.1rem; }
        .field-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 0.5rem;
        }
        .field-wrapper { position: relative; }
        .field-icon {
          position: absolute;
          left: 14px; top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.22);
          font-size: 14px;
          pointer-events: none;
          transition: color 0.2s;
        }
        .field-wrapper.focused .field-icon { color: #818cf8; }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 0.75rem 2.8rem;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          box-sizing: border-box;
          outline: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.07);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .eye-btn {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.25);
          cursor: pointer;
          font-size: 15px;
          padding: 4px;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: rgba(255,255,255,0.6); }

        .forgot-link {
          display: block;
          text-align: right;
          font-size: 0.73rem;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          margin-top: 0.45rem;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: #818cf8; }

        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          margin-top: 1.5rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(99,102,241,0.45);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.6rem 0;
        }
        .divider-line {
          flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .register-row {
          text-align: center;
          font-size: 0.83rem;
          color: rgba(255,255,255,0.32);
        }
        .register-link {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .register-link:hover { color: #a5b4fc; }

        .trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 1.6rem;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.18);
        }
        .trust-dot {
          width: 3px; height: 3px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          {/* <div className="brand-row">
            <div className="brand-icon">🎯</div>
            <span className="brand-name">InterviewAI</span>
          </div> */}

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue your interview prep</p>

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <div className={`field-wrapper ${focused === 'email' ? 'focused' : ''}`}>
                <span className="field-icon">✉</span>
                <input
                  type="email"
                  required
                  className="field-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <div className={`field-wrapper ${focused === 'password' ? 'focused' : ''}`}>
                <span className="field-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="field-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading && <span className="spinner" />}
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">new here?</span>
            <div className="divider-line" />
          </div>

          <p className="register-row">
            Don't have an account?{' '}
            <Link href="/register" className="register-link">Create one free →</Link>
          </p>

          {/* <div className="trust-row">
            <span>🔐 Encrypted</span>
            <div className="trust-dot" />
            <span>No spam</span>
            <div className="trust-dot" />
            <span>Cancel anytime</span>
          </div> */}

        </div>
      </div>
    </>
  );
}