"use client";

import { motion, AnimatePresence  } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({ children}: { children: React.ReactNode }) {

    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.35 }}
                className="scrollWrapper"
                style={{ maxWidth: '450px', width: '100%', height: '100vh', overflowY:'auto' }}
            > {children}
            </motion.div>
        </AnimatePresence>
    );
}