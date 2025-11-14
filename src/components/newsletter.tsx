'use client';

import { useState } from 'react';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Use absolute URL with www to match your actual domain
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/waitlist`
        : '/api/waitlist';

      console.log('Submitting to:', apiUrl); // Debug log

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for joining! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit. Please try again.');
      console.error('Waitlist signup error:', error);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-sky-200 via-indigo-300 to-indigo-600 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get notified when we launch          
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-center text-lg text-white/90">
            Join our early access list and get 1 months free when we launch.
            We will notify you as soon as AlwaysOn opens for beta testers.
          </p>
          <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md flex-col gap-4">
            <div className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="min-w-0 flex-auto rounded-md bg-white/10 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/20 placeholder:text-white/60 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Notify me'}
              </button>
            </div>
            
            {message && (
              <p className={`text-center text-sm ${
                status === 'success' ? 'text-white font-medium' : 'text-red-100'
              }`}>
                {message}
              </p>
            )}
          </form>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.4" />
            <defs>
              <radialGradient
                r={1}
                cx={0}
                cy={0}
                id="759c1415-0410-454c-8f7c-9a820de03641"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop stopColor="#38bdf8" />
                <stop offset={1} stopColor="#818cf8" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}