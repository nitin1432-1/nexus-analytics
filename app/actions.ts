'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get('email')
  
  // In a real app, you would validate password against a DB here.
  // For this demo, we accept any email to allow you to test it easily.
  
  // Create a secure, HTTP-only cookie
  cookies().set('nexus_session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  redirect('/dashboard')
}

export async function logoutAction() {
  cookies().delete('nexus_session')
  redirect('/')
}