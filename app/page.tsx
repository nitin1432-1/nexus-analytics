import Hero from '@/components/ui/hero';
import BentoGrid from '@/components/ui/bento-grid';
import Pricing from '@/components/ui/pricing';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      
      {/* Solutions Section (Simple Placeholder for the Navbar link) */}
      <section id="solutions" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Built for Engineers</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From startups to enterprise giants, our platform scales with your needs.
          </p>
        </div>
      </section>

      <Pricing />
    </>
  );
}