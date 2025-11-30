'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get('email')
  
  // In a real app, you would validate password against a DB here.
  
  // FIXED: In Next.js 15, cookies() is a Promise, so we must 'await' it
  const cookieStore = await cookies()
  
  cookieStore.set('nexus_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  redirect('/dashboard')
}

export async function logoutAction() {
  // FIXED: await cookies() here too
  const cookieStore = await cookies()
  cookieStore.delete('nexus_session')
  redirect('/')
}