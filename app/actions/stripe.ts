'use server'

import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function createCheckoutSession(priceId: string) {
  const supabase = createClient()
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
    success_url: `${headers().get('origin')}/dashboard?success=true`,
    cancel_url: `${headers().get('origin')}/?canceled=true`,
    metadata: {
      userId: user.id,
    },
  })

  // 2. Redirect user to Stripe
  if (session.url) {
    redirect(session.url)
  }
}