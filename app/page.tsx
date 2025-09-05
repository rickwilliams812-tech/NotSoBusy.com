'use client';

import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, zip, city });
    setSubscribed(true);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(40%_60%_at_20%_10%,#e0f2fe_0%,transparent_50%),radial-gradient(30%_40%_at_90%_20%,#fae8ff_0%,transparent_45%),radial-gradient(30%_40%_at_30%_90%,#fef9c3_0%,transparent_45%)] text-slate-800">

      {/* Top ribbon */}
      <div className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500 text-white text-center text-sm py-2 shadow-md drop-shadow-[0_2px_8px_rgba(255,182,255,0.4)]">
        <span className="font-semibold">New:</span> Smart alerts for your favorite spots — free for diners ✨
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-content-center font-extrabold shadow-sm">NSB</div>
          <span className="text-xl font-semibold">NotSoBusy<span className="text-slate-500">.com</span></span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <a className="hover:text-slate-900" href="#how">How it works</a>
          <a className="hover:text-slate-900" href="#why">Why it helps</a>
          <a className="hover:text-slate-900" href="#faq">FAQ</a>
        </nav>
        <a
          href="#waitlist"
          className="rounded-xl bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-600 px-4 py-2 text-white shadow-md hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition-shadow duration-300"
        >
          Get early access
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-4 pb-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-[1.15] pb-3">
              Go when it’s{" "}
              <span className="ml-2 inline-block bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(255,182,255,0.4)]">
                Not So Busy
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Real-time alerts when your favorite restaurants have short waits and happy staff. Dine better — without the crowds.
            </p>

            {/* Waitlist form */}
            <form id="waitlist" onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-6">
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="col-span-3 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-300 bg-white/80 backdrop-blur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="col-span-2 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-300 bg-white/80 backdrop-blur"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="ZIP"
                className="col-span-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300 bg-white/80 backdrop-blur"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <button
                type="submit"
                className="col-span-1 rounded-2xl bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-600 px-5 py-3 font-semibold text-white shadow-md hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-shadow duration-300 sm:col-span-6"
              >
                {subscribed ? "You're on the list! 🎉" : "Join the waitlist"}
              </button>
              <p className="sm:col-span-6 text-sm text-slate-500">Free for diners. Private by design.</p>
            </form>

            {/* Benefits strip */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {[
                {label:"No crowds", emoji:"🧑‍🍳"},
                {label:"Short waits", emoji:"⏱️"},
                {label:"Happy staff", emoji:"🙂"},
                {label:"Set alerts", emoji:"🔔"},
              ].map(b => (
                <span key={b.label} className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 shadow-sm border border-slate-200">
                  <span>{b.emoji}</span> {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right-side bento cards */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-white to-cyan-50 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Your Favorites</h3>
                  <p className="text-sm text-slate-500">Richmond / Sugar Land</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Not so busy</span>
              </div>
              <ul className="mt-4 divide-y divide-slate-200/70">
                {[{name:"El Jardin", wait:"10–15m", score:92}, {name:"Taro Sushi", wait:"No wait", score:96}, {name:"BBQ Depot", wait:"25–35m", score:68}].map((r) => (
                  <li key={r.name} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-sm text-slate-500">Estimated wait: {r.wait}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">NSB Score</p>
                      <p className="text-xl font-bold bg-gradient-to-r from-cyan-700 to-fuchsia-700 bg-clip-text text-transparent">{r.score}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-fuchsia-200/70 bg-gradient-to-br from-white to-fuchsia-50 p-5 shadow-sm">
              <h3 className="font-semibold">Smart Alerts</h3>
              <p className="mt-1 text-sm text-slate-700">
                Get a text when <span className="font-medium">Taro Sushi</span> drops below a 15-minute wait between 5–8 pm.
              </p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-xl border border-slate-200 px-4 py-2 bg-white/80 hover:bg-white transition-colors duration-300">Manage</button>
                <button className="rounded-xl bg-gradient-to-r from-cyan-600 to-fuchsia-600 px-4 py-2 text-white shadow-md hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-shadow duration-300">Enable SMS</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {title:"Pick favorites", body:"Follow restaurants you love and choose your usual time windows.", grad:"from-cyan-50 to-white border-cyan-200/60"},
            {title:"We watch the crowds", body:"We monitor waitlists, reservations, and historical patterns to estimate busyness.", grad:"from-fuchsia-50 to-white border-fuchsia-200/60"},
            {title:"You get a ping", body:"When it’s a great moment to go, we alert you — by text, push, or email.", grad:"from-amber-50 to-white border-amber-200/60"},
          ].map((item) => (
            <div key={item.title} className={`rounded-2xl border bg-gradient-to-br ${item.grad} p-6 shadow-sm`}>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="mt-2 text-slate-700">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it helps */}
      <section id="why" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-white to-amber-50 p-6 shadow-sm">
            <h3 className="text-xl font-semibold">For diners</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-700">
              <li>Shorter waits, better service.</li>
              <li>Privacy-first: location sharing is optional.</li>
              <li>One tap to navigate or share ETA.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-sm">
            <h3 className="text-xl font-semibold">For restaurants</h3>
            <ul className="mt-3 list-disc pl-6 text-slate-700">
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
        <details className="mt-4 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">How do you know when a place is not so busy?</summary>
          <p className="mt-2 text-slate-700">We combine waitlist signals, reservation availability, and historical patterns to estimate busyness. We’ll always show our confidence level.</p>
        </details>
        <details className="mt-3 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 shadow-sm">
          <summary className="cursor-pointer font-medium">Do I have to share my location?</summary>
          <p className="mt-2 text-slate-700">No. Location is optional and only used to personalize nearby alerts if enabled.</p>
        </details>
      </section>

      <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur py-10 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} NotSoBusy, Inc. • Privacy-first notifications for real-world places.
      </footer>
    </div>
  );
}
