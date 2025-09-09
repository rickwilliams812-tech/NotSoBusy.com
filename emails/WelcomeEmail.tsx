import * as React from 'react';

export default function WelcomeEmail({
  email,
  city,
}: { email: string; city?: string }) {
  const name = email.split('@')[0];

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      lineHeight: 1.6,
      color: '#0f172a'
    }}>
      <h2>Welcome to NotSoBusy 🎉</h2>
      <p>Hey {name}{city ? ` from ${city}` : ''},</p>
      <p>
        Thanks for joining! We’ll ping you when your favorite restaurants are
        <strong> not so busy</strong> so you can enjoy shorter waits and happier staff.
      </p>
      <p style={{marginTop: 24}}>— The NotSoBusy team</p>
    </div>
  );
}
