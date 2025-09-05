'use client';

import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: post to /api/waitlist (Supabase/SendGrid)
    console.log({ email, zip, city });
    setSubscribed(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-content-center font-bold">NSB</div>
          <span className="text-xl font-semibold">NotSoBusy<span className="text-slate-400">.com</span></span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <a className="hover:text-slate-900" href="#how">How it works</a>
          <a className="hover:text-slate-900" href="#why">Why it helps</a>
          <a className="hover:text-slate-900" href="#faq">FAQ</a>
        </nav>
        <a href="#waitlist" className="rounded-xl bg-slate-900 px-4 py-2 text-white shadow-sm hover:shadow">Get early access</a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Go when it’s <span className="rounded-xl bg-amber-100 px-2 py-1">Not So Busy</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Real-time alerts when your favorite restaurants have short waits and happy staff.
              Dine better — without the crowds.
            </p>
            <form id="waitlist" onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-6">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="col-span-3 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="col-span-2 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="ZIP"
                className="col-span-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <button
                type="submit"
                className="col-span-1 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow hover:opacity-90 sm:col-span-6"
              >
                {subscribed ? "You're on the list!" : "Join the waitlist"}
              </button>
            </form>
            <p className="mt-3 text-sm text-slate-500">Free for diners. Private by design.</p>
          </div>

          {/* Mock UI card */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Your Favorites</h3>
                  <p className="text-sm text-slate-500">Richmond / Sugar Land</p>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">Not so busy</span>
              </div>
              <ul className="mt-4 divide-y">
                {[{name:"El Jardin", wait:"10–15m", score:92}, {name:"Taro Sushi", wait:"No wait", score:96}, {name:"BBQ Depot", wait:"25–35m", score:68}].map((r) => (
                  <li key={r.name} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-sm text-slate-500">Estimated wait: {r.wait}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">NSB Score</p>
                      <p className="text-xl font-bold">{r.score}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="mt-1 text-sm text-slate-600">
                Get a text when <span className="font-medium">Taro Sushi</span> drops below a 15-minute wait between 5–8 pm.
              </p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-xl border border-slate-200 px-4 py-2">Manage</button>
                <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">Enable SMS</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {title:"Pick favorites", body:"Follow restaurants you love and choose your usual time windows."},
            {title:"We watch the crowds", body:"We monitor waitlists, reservations, and historical patterns to estimate current busyness."},
            {title:"You get a ping", body:"When it’s a great moment to go, we alert you — by text, push, or email."},
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="mt-2 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it helps */}
      <section id="why" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">For diners</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-600">
              <li>Shorter waits, better service.</li>
              <li>Privacy-first: location sharing is optional.</li>
              <li>One tap to navigate or share ETA.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">For restaurants</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-600">
              <li>Fill slow periods with loyal guests.</li>
              <li>Integrates with waitlist & reservation systems.</li>
              <li>Zero hardware to start.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 pb-24">
        <h3 className="text-2xl font-bold">FAQ</h3>
        <details className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-medium">How do you know when a place is not so busy?</summary>
          <p className="mt-2 text-slate-600">We combine waitlist signals, reservation availability, and historical patterns to estimate busyness. We’ll always show our confidence level.</p>
        </details>
        <details className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-medium">Do I have to share my location?</summary>
          <p className="mt-2 text-slate-600">No. Location is optional and only used to personalize nearby alerts if enabled.</p>
        </details>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NotSoBusy, Inc. • Privacy-first notifications for real-world places.
      </footer>
    </div>
  );
}
