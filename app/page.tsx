"use client";

import Navbar from "@/components/Navbar";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import { motion } from "framer-motion";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`h-screen w-full flex items-center relative z-10 snap-center ${className}`}>
      {children}
    </section>
  );
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <main className="relative bg-nova-black text-white min-h-[400vh]">
      <Navbar />

      {/* The sticky canvas background */}
      <ScrollytellingCanvas />

      {/* Scrollable Content Overlays */}
      <div className="absolute top-0 left-0 w-full">
        
        {/* HERO SECTION (0-15%) */}
        <Section className="justify-center text-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.5 }} 
            variants={fadeIn}
            className="max-w-4xl px-6"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white drop-shadow-2xl">
              NOVA <span className="text-mobility-blue">X</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide mb-8">
              Pure electric performance.
            </p>
            <p className="text-sm md:text-base text-white/40 max-w-lg mx-auto">
              Flagship personal mobility — engineered for speed, control, and silence.
            </p>
          </motion.div>
        </Section>

        {/* ENGINEERING REVEAL (15-40%) */}
        <Section className="justify-start px-6 md:px-24">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.5 }} 
            variants={fadeIn}
            className="max-w-md p-8 rounded-2xl bg-nova-black/40 backdrop-blur-sm border border-white/5"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">
              Precision-engineered power.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Vibration-damped composite deck, sealed housings, and structural reinforcements tuned for high-speed stability and rider comfort.
            </p>
          </motion.div>
        </Section>

        {/* BATTERY SYSTEM (40-65%) */}
        <Section className="justify-end px-6 md:px-24">
           <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.5 }} 
            variants={fadeIn}
            className="max-w-md p-8 rounded-2xl bg-nova-black/40 backdrop-blur-sm border border-white/5 text-right"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">
              High-density energy.
            </h2>
            <ul className="space-y-2 text-lg text-white/70 inline-block text-right">
                <li>Long-range lithium pack</li>
                <li>Thermal-balanced cooling</li>
                <li>Intelligent BMS safety</li>
            </ul>
          </motion.div>
        </Section>

        {/* REASSEMBLY & CTA (85-100%) */}
        <Section className="justify-center text-center">
           <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.5 }} 
            variants={fadeIn}
            className="max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Ride the future.
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Performance perfected in carbon, copper, and code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <button className="px-8 py-4 rounded-full bg-gradient-to-r from-mobility-blue to-electric-cyan text-white text-lg font-bold tracking-wide hover:shadow-[0_0_30px_rgba(0,214,255,0.4)] transition-all transform hover:scale-105">
                    Experience NOVA X
                  </button>
                  <a href="#" className="text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
                    View Technical Specs
                  </a>
            </div>
          </motion.div>
        </Section>

      </div>
    </main>
  );
}
