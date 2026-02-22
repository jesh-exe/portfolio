"use client";

import { useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import sequenceData from "./sequenceData.json";

export default function ScrollyCanvas() {
    const totalFrames = sequenceData.length;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Create an array to hold all the preloaded Image objects
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // We map scroll from 0 to 1 over the 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map progress (0-1) to our frame index (0 to totalFrames - 1)
    const rawIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    // Smooth out the animation with physics-based spring interpolation
    const currentIndex = useSpring(rawIndex, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001
    });

    // Use requestAnimationFrame to render the canvas smoothly
    const renderFrame = useCallback((index: number) => {
        if (!canvasRef.current || imagesRef.current.length === 0) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        // Safety check bounded index
        const boundedIndex = Math.max(0, Math.min(Math.floor(index), totalFrames - 1));
        const img = imagesRef.current[boundedIndex];
        if (!img) return;

        // To mimic object-fit: cover, we calculate the scaling factor
        const canvas = canvasRef.current;

        // Handle retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Scale Context
        context.scale(dpr, dpr);

        const hRatio = window.innerWidth / img.width;
        const vRatio = window.innerHeight / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
        const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }, [totalFrames]);

    useEffect(() => {
        // 1. Preload Images
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            for (let i = 0; i < totalFrames; i++) {
                const src = `/sequence/${sequenceData[i]}`;

                const img = new Image();
                img.src = src;

                // Wait for image to load
                await new Promise((resolve) => {
                    img.onload = () => {
                        resolve(true);
                    };
                    img.onerror = () => {
                        // Resolve anyway to prevent hanging on missing frame, but do not push empty
                        resolve(false);
                    }
                });
                loadedImages.push(img);
            }

            imagesRef.current = loadedImages;
            setImagesLoaded(true);

            // Draw first frame immediately
            renderFrame(0);
        };

        preloadImages();

        const handleResize = () => {
            // Re-render current frame on resize to fix layout
            renderFrame(currentIndex.get());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [totalFrames, renderFrame, currentIndex]);

    useEffect(() => {
        // 2. Setup scroll listener
        const unsubscribe = currentIndex.onChange((latest) => {
            requestAnimationFrame(() => renderFrame(latest));
        });

        return () => unsubscribe();
    }, [currentIndex, renderFrame]);

    return (
        <div ref={containerRef} className="h-[500vh] relative w-full bg-[#121212]">
            {/* Sticky section remains fixed while scrolling down 500vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading State fallback */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center text-white/50">
                        Loading sequence...
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
            </div>
        </div>
    );
}
