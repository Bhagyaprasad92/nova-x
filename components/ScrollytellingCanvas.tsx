"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 120;
const FRAME_PATH = "/sequence/";

export default function ScrollytellingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Helper to map frame index to available files (001, 050, 090, 120)
  // Since we generated only 4 keyframes, we will snap to the closest one or interpolate (snap for now)
  const getFrameSource = (index: number) => {
    // 0-40: Hero (001) -> Transition to Explode starts at 15% (frame 18)
    // 40-70: Mid Explode (050)
    // 70-100: Full Explode (090)
    // 100-120: Reassembly (120)
    
    // Smooth stepping for prototype:
    if (index < 30) return `${FRAME_PATH}001.png`;
    if (index < 70) return `${FRAME_PATH}050.png`;
    if (index < 100) return `${FRAME_PATH}090.png`;
    return `${FRAME_PATH}120.png`;
  };

  useEffect(() => {
    // Preload "virtual" frames. We only load the 4 actual images but map them to the 120 indices context
    const loadImages = async () => {
        const loadedImages: HTMLImageElement[] = [];
        // We only key distinct sources to avoid redundant network requests, but for the array we need 120 slots?
        // Actually, let's just load the 4 images and store them in a map or object.
        
        const sources = [
            `${FRAME_PATH}001.png`,
            `${FRAME_PATH}050.png`,
            `${FRAME_PATH}090.png`,
            `${FRAME_PATH}120.png`
        ];

        const promises = sources.map((src) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = reject;
            });
        });

        try {
            const results = await Promise.all(promises);
            // Map results back to index logic?
            // Let's just store the distinct images for now.
            // But to make drawing fast, we want to know exactly which image to draw for a given frame index.
            
            // Re-construct the array of 120 frames pointing to the loaded image objects
            const frameArray = new Array(TOTAL_FRAMES).fill(null).map((_, i) => {
                const src = getFrameSource(i);
                // Find the loaded image with this src
                return results.find(img => img.src.endsWith(src.split('/').pop()!)) || results[0];
            });
            
            setImages(frameArray);
            setLoaded(true);
        } catch (err) {
            console.error("Failed to load sequence images", err);
        }
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    
    // Clear and Draw
    // Maintain aspect ratio: contain
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Canvas is taller than image
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      Math.floor(latest * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            // Redraw current frame
            // We'd need to store current index or just let scroll trigger it. 
            // For now, let's just ensure dimensions are right.
        }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Init

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial draw
  useEffect(() => {
      if (loaded) renderFrame(0);
  }, [loaded]);

  return (
    <div className="sticky top-0 w-full h-screen overflow-hidden -z-10">
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-nova-black"
        width={1920}
        height={1080}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
            Loading Sequence...
        </div>
      )}
    </div>
  );
}
