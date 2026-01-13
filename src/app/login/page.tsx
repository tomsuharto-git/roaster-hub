'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'roaster') {
      // Set auth cookie (expires in 30 days)
      document.cookie = 'roaster-auth=authenticated; path=/; max-age=2592000';
      router.push('/');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196, 30, 58, 0.12) 0%, transparent 50%)'
        }}
      />

      <div className="relative w-full max-w-sm">
        <h1 className="font-serif text-4xl md:text-5xl mb-2 text-center">
          The <em className="text-[var(--red)]">Roaster</em>
        </h1>
        <p className="label text-[var(--gray)] text-center mb-12">
          Strategic Document Analysis
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-[var(--gray)] focus:outline-none focus:border-[var(--red)] transition-colors"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-[var(--red)]">
                Incorrect password
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-[var(--red)] text-white font-medium hover:bg-[var(--red-dark)] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}
