'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Note = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-3xl border border-blue-200/70 dark:border-blue-900/60 bg-linear-to-br from-sky-50 via-blue-50 to-indigo-100 dark:from-[#0b1220] dark:via-[#111827] dark:to-[#172554] p-8 md:p-10 shadow-2xl"
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/20 dark:bg-cyan-400/10 blur-3xl" />

                {/* Decorative Line */}
                <div className="absolute left-0 top-0 h-1.5 w-full bg-linear-to-r from-sky-500 via-blue-600 to-indigo-600" />

                <div className="relative z-10 max-w-4xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Note
                    </h2>

                    <p className="mt-5 text-sm md:text-base leading-8 text-slate-600 dark:text-slate-300">
                        This is not a requirement output. This is just a Thank you for using this app. While creating the app, I faced some issues. Do not know its actually an error or just my network problem. Sometime after updating any data, it is not actually updating in the UI without a re-login. As payment functionality. After payment it still shows locks. If you face this error, do not panic, just <strong className='text-lg'>Re-Login</strong>. Sorry about this trouble. Hope to fix it soon...
                        <br />
                        <span className='flex justify-end font-bold text-2xl text-sky-500 dark:text-sky-200'>Thank You</span>
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Note;