'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // tiny client-side guard; server re-validates too
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city, zip }),
      });

      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error ?? 'Something went wrong.');
      } else {
        setSubscribed(true);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Network error.');
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return (
      <p className="text-sm">
        You’re on the list! We’ll ping you when your favorites are less busy.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-3 py-2"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm">City (optional)</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Sugar Land"
          />
        </div>
        <div>
          <label className="block text-sm">ZIP (optional)</label>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            placeholder="77479"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md px-4 py-2 shadow border"
      >
        {loading ? 'Joining…' : 'Join Waitlist'}
      </button>
    </form>
  );
}
