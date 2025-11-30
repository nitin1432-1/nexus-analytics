'use client'

import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { loginAction } from '../actions' // Import the server action
import { useFormStatus } from 'react-dom'

// Small component to handle the loading state automatically
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      disabled={pending}
      type="submit" 
      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
    </button>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30">
        <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-400 mb-8">Sign in to access your dashboard</p>
        
        {/* We use the Server Action here directly in the action prop */}
        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="admin@nexus.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}