"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function SectionDivider({}: Props) {
  return (
    <motion.div
      className="my-24 h-16 w-16 rounded-full hidden sm:block"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ delay: 0.125 }}
    ></motion.div>
  );
}