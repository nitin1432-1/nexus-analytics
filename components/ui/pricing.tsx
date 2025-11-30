'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { createCheckoutSession } from '@/app/actions/stripe' // Import the action

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId)
    await createCheckoutSession(priceId)
  }

  const plans = [
    {
      name: "Startup",
      // REPLACE THESE STRINGS WITH REAL STRIPE PRICE IDs
      monthlyId: "price_1Qhk...", 
      yearlyId: "price_1Qhk...", 
      price: 29,
      features: ["10k Events/mo", "3 Team Members", "30-Day Retention"]
    },
    {
      name: "Growth",
      monthlyId: "price_1Qhk...", 
      yearlyId: "price_1Qhk...",
      price: 99,
      popular: true,
      features: ["100k Events/mo", "Unlimited Team", "90-Day Retention", "Priority Support"]
    },
    {
      name: "Enterprise",
      monthlyId: "price_1Qhk...", 
      yearlyId: "price_1Qhk...",
      price: 299,
      features: ["Unlimited Events", "SSO & Audit Logs", "Unlimited Retention", "Dedicated Manager"]
    }
  ]

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Simple Pricing</h2>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!annual ? 'text-white font-bold' : 'text-zinc-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-8 bg-zinc-800 rounded-full p-1 transition-colors hover:bg-zinc-700"
            >
              <motion.div 
                animate={{ x: annual ? 24 : 0 }}
                className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm ${annual ? 'text-white font-bold' : 'text-zinc-500'}`}>
              Yearly <span className="text-blue-500 text-xs ml-1 font-bold">(-20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => {
            const currentPriceId = annual ? plan.yearlyId : plan.monthlyId
            
            return (
              <div 
                key={i} 
                className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-blue-500 bg-blue-500/5' : 'border-zinc-800 bg-zinc-900/30'} flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  ${annual ? Math.round(plan.price * 0.8) : plan.price}
                  <span className="text-sm text-zinc-500 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleCheckout(currentPriceId)}
                  disabled={!!loading}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-zinc-800 hover:bg-white hover:text-black text-white'
                  }`}
                >
                  {loading === currentPriceId ? <Loader2 className="animate-spin" /> : `Choose ${plan.name}`}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}