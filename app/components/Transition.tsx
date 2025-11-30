"use client";

import { motion, AnimatePresence  } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Transition({ children}: { children: React.ReactNode }) {

    const pathname = usePathname()

    return (
        <AnimatePresence>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "linear", duration: 0.35 }}
                style={{ maxWidth: '450px', width: '100%',  }}
            >
            <div
            className="scrollWrapper"
            style={{
                height: '100vh',
                overflowY:'auto' }}>
            {children}
            </div>
            </motion.div>
        </AnimatePresence>
    );
}