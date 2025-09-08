'use client';

import { useEffect, useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helps confirm the component actually shows up on the page
  useEffect(() => {
    console.log('WaitlistForm mounted');
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    console.log('Submit fired with values:', { email, city, zip });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.');
      console.warn('Client validation failed');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city, zip }),
      });

      const data = await res.json().catch(() => ({}));
      console.log('WAITLIST_CLIENT_RESPONSE', { status: res.status, data });

      if (!res.ok || (data && data.error)) {
        setError(data?.error ?? 'Something went wrong.');
      } else {
        setSubscribed(true);
      }
    } catch (err: any) {
      console.error('WAITLIST_CLIENT_NETWORK_ERROR', err);
      setError(err?.message ?? 'Network error.');
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return <p className="text-sm">You’re on the list! We’ll ping you when your favorites are less busy.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" id="waitlist-form">
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

      <button type="submit" disabled={loading} className="rounded-md px-4 py-2 shadow border">
        {loading ? 'Joining…' : 'Join Waitlist'}
      </button>
    </form>
  );
}
