'use server'

import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// FIXED: This MUST match the version in your error log exactly
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', 
})

export async function createCheckoutSession(priceId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

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

  if (session.url) {
    redirect(session.url)
  }
}