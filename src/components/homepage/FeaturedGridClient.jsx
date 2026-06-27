"use client";

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedPromptCard from '../prompts/FeaturedPromptCard';

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function FeaturedGridClient({ featuredList }) {
    console.log(featuredList);
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {featuredList.map((prompt) => (
                <FeaturedPromptCard
                    key={prompt._id}
                    prompt={prompt}
                />
            ))}
        </motion.div>
    );
}