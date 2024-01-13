// app/template.tsx
"use client";
import { motion } from "framer-motion";

export default function PageTransistionTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: [0.75, 1] }}
      transition={{delay: 0.35,type:"tween" }}
    >
      {children}
    </motion.main>
  );
}
