'use server'

import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// FIXED: Using the exact version string from your error log
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover', 
})

export async function createCheckoutSession(priceId: string) {
  // FIXED: Added 'await' here for Next.js 15 async cookies
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // 1. Create a Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${(await headers()).get('origin')}/dashboard?success=true`,
    cancel_url: `${(await headers()).get('origin')}/?canceled=true`,
    metadata: {
      userId: user.id,
    },
  })

  // 2. Redirect user to Stripe
  if (session.url) {
    redirect(session.url)
  }
}