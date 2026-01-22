"use client";

import { motion } from "framer-motion";
import { LottieAnimation } from "@/components/ui/lottie-animation";

const CAT_URLS = [
    "https://lottie.host/4b86f167-2787-433f-b88d-294726053911/6Xb7Q8Kz5e.json", // Sleeping Cat
    "https://lottie.host/98501002-3486-4536-8f35-64536d40040a/2e7g5Q3y5b.json", // Playing Cat
    "https://lottie.host/64b5c777-9876-4d5e-8f3b-7c4a3d2e1f0a/1a2b3c4d5e.json", // Walking Cat
];


export function FloatingCats() {
    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {/* Cat: Walking across bottom */}
            <motion.div
                className="absolute bottom-0 left-[-100px] w-32 h-32"
                animate={{ x: "120vw" }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 0 }}
            >
                <LottieAnimation animationUrl="https://assets3.lottiefiles.com/packages/lf20_tr1pjkop.json" />
            </motion.div>
        </div>
    );
}
