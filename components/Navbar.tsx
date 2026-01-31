"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";


export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Fade in nav background and border as user scrolls
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-20, 0]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
        setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      style={{ opacity, y }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-out border-b ${
        isScrolled
          ? "bg-nova-black/75 border-white/5 backdrop-blur-md"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tighter text-white">
          NOVA <span className="text-mobility-blue">X</span>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white transition-colors">Overview</a>
          <a href="#" className="hover:text-white transition-colors">Powertrain</a>
          <a href="#" className="hover:text-white transition-colors">Battery</a>
          <a href="#" className="hover:text-white transition-colors">Control</a>
          <a href="#" className="hover:text-white transition-colors">Specs</a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm font-medium text-white/70 hover:text-white hidden sm:block">Log in</a>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-mobility-blue to-electric-cyan text-white text-sm font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(0,214,255,0.3)] transition-shadow duration-300">
            Order Now
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
