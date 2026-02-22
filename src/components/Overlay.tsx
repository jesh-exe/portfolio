"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We track the scroll progress of the *entire* 500vh container
    // This overlay will span the same height, so it aligns with the canvas scroll.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Match the same spring physics as the canvas image sequence for perfect sync
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 20,
        restDelta: 0.001
    });

    // SECTION 1: 0% to 20% scroll
    const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(smoothProgress, [0, 0.2], [0, -50]);

    // SECTION 2: 30% to 50% scroll
    const opacity2 = useTransform(smoothProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(smoothProgress, [0.25, 0.55], [50, -50]);

    // SECTION 3: 60% to 80% scroll
    const opacity3 = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(smoothProgress, [0.55, 0.85], [50, -50]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* SECTION 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-auto"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
                    Jayesh Murodiya
                </h1>
                <p className="text-xl md:text-3xl text-gray-300 font-light">
                    Full Stack Developer.
                </p>
            </motion.div>

            {/* SECTION 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute top-[150vh] w-full flex items-center justify-start px-10 md:px-32 pointer-events-auto"
            >
                <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl leading-tight">
                    I build digital <span className="text-gray-400">experiences.</span>
                </h2>
            </motion.div>

            {/* SECTION 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute top-[300vh] w-full flex flex-col items-end justify-center px-10 md:px-32 pointer-events-auto"
            >
                <h2 className="text-4xl md:text-6xl font-semibold text-white max-w-2xl text-right leading-tight mb-4">
                    Based in <span className="text-gray-400">Pune,</span> <br /> India.
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 font-light text-right">
                    Currently inventing at <span className="text-white font-medium">CDAC</span>.
                </p>
            </motion.div>

        </div>
    );
}
