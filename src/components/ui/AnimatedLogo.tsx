"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedLogo = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Step 0: Sun rises / appears
        // Step 1: Lightning appears inside
        // Step 2: Morph to Power Button
        // Step 3: Text appears
        const timer1 = setTimeout(() => setStep(1), 1000); // Lightning
        const timer2 = setTimeout(() => setStep(2), 2500); // Morph
        const timer3 = setTimeout(() => setStep(3), 3500); // Text

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const sunColor = "#FDB813"; // Sunflower Yellow
    const powerColor = "#00B900"; // Green for Getpower (assuming based on context, or use primary brand color)
    const brandColor = "#333333"; // Text color

    // Power Button Paths
    const powerLinePath = "M12 7V17"; // Vertical line
    const powerCirclePath = "M12 2a10 10 0 1 0 0 20"; // Full circle for sun, will trim for power button

    // Sun Rays (8 rays)
    const rays = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const r1 = 14;
        const r2 = 18;
        const x1 = 12 + r1 * Math.cos(angle);
        const y1 = 12 + r1 * Math.sin(angle);
        const x2 = 12 + r2 * Math.cos(angle);
        const y2 = 12 + r2 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={sunColor} strokeWidth="2" strokeLinecap="round" />;
    });

    return (
        <div className="flex items-center gap-3 overflow-hidden h-12">
            <div className="relative w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 overflow-visible">
                    {/* Sun Circle -> Power Circle */}
                    <motion.path
                        d="M 12 6 A 6 6 0 1 1 11.99 6.01" // Almost full circle
                        initial={{ pathLength: 1, stroke: sunColor, opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            stroke: step >= 2 ? powerColor : sunColor,
                            pathLength: step >= 2 ? 0.75 : 1, // Cut the top for power button
                            rotate: step >= 2 ? 0 : 0, // ensure proper rotation if needed
                            transition: { duration: 1 }
                        }}
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        style={{ rotate: -90, transformOrigin: "center" }} // Start from top
                    />

                    {/* Sun Rays */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: step < 2 ? 1 : 0,
                            scale: step < 2 ? 1 : 1.2,
                            rotate: 360
                        }}
                        transition={{ duration: 1, rotate: { repeat: Infinity, duration: 10, ease: "linear" } }}
                    >
                        {step < 2 && rays}
                    </motion.g>

                    {/* Lightning -> Power Line */}
                    {step < 2 ? (
                        <motion.path
                            d="M13 10V3L4 14h7v7l9-11h-7z" // Standard lightning bolt - adjust to fit center
                            // Scale/Translate manually to fit inside circle, this path is 24x24 based
                            initial={{ pathLength: 0, opacity: 0, scale: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: step >= 1 ? 1 : 0,
                                scale: 0.25,
                                x: 12, // center offset
                                y: 12  // center offset
                            }}
                            style={{ translateX: "-50%", translateY: "-50%" }} // Centering trick
                            fill={sunColor}
                            stroke="none"
                        />
                        // Actually better to use a path that is centered.
                        // Let's use a centered lightning path
                    ) : null}

                    {/* Re-implementing Lightning to animate to Line properly */}
                    <motion.path
                        // Lightning path roughly centered in 24x24
                        d={step < 2 ? "M14 2L10 12H15L9 22L13 12H8L14 2Z" : "M12 4V12"} // Simple Lightning -> Vertical Line?
                        // Let's Keep it simple: Lightning Fades Out, Line Fades In
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: step === 1 ? 1 : 0,
                            scale: step === 1 ? 0.4 : 0,
                        }}
                        fill={sunColor}
                        transition={{ duration: 0.5 }}
                    />

                    <motion.path
                        d="M12 3V10" // Power Button line
                        initial={{ pathLength: 0, opacity: 0, stroke: powerColor }}
                        animate={{
                            pathLength: 1,
                            opacity: step >= 2 ? 1 : 0,
                            stroke: powerColor
                        }}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        transition={{ duration: 0.5, delay: step >= 2 ? 0.5 : 0 }}
                    />
                </svg>
            </div>

            {/* Text */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{
                    x: step >= 3 ? 0 : -20,
                    opacity: step >= 3 ? 1 : 0
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col"
            >
                <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">
                    GETPOWER
                </span>
                <span className="text-[0.6rem] tracking-widest text-gray-500 font-medium">
                    JIYANG ENERGY
                </span>
            </motion.div>
        </div>
    );
};
