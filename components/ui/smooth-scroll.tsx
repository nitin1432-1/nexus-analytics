'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    // @ts-ignore - React 19 type mismatch fix
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}