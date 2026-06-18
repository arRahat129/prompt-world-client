"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaWandMagicSparkles } from "react-icons/fa6";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        setIsLoading(true);

        try {
            const { error: authError } = await signIn.email({
                email,
                password,
                callbackURL: "/"
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
                return;
            }

            setSuccess("Signed in successfully!");
            setEmail("");
            setPassword("");
            toast.success(`User signed In successfully`);
            
        } catch (err) {
            console.error(err);
            setError("An unexpected network error occurred.");
            toast.error(`ERROR OCCURED || error`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard", // Update with your actual post-login route
            });
        } catch (err) {
            console.error(err);
            setError("Google authentication failed.");
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-linear-to-b from-blue-50/20 via-white to-slate-50 dark:from-black dark:via-gray-900/40 dark:to-black px-4 py-12">

            {/* AMBIENT BACKGROUND GLOWS */}
            <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-400/10 dark:bg-purple-600/5 blur-[100px]" />

            <div className="w-full max-w-md rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-xl shadow-blue-100/20 dark:shadow-none">

                {/* HEADER TITLE SECTION */}
                <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                        <FaWandMagicSparkles className="h-3 w-3 text-blue-500" />
                        <span>Welcome Back to Prompt World</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Account Sign In
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Access your marketplace dashboard and custom AI pipelines.
                    </p>
                </div>

                {/* SOCIAL GOOGLE BUTTON OAUTH */}
                <div className="space-y-4 mb-6">
                    <Button
                        onClick={handleGoogleLogin}
                        variant="bordered"
                        radius="xl"
                        className="w-full h-11 border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-800/50 flex items-center justify-center gap-2.5 transition"
                    >
                        <FaGoogle className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                        <span>Continue with Google</span>
                    </Button>

                    {/* TEXT SEPARATOR DIVIDER */}
                    <div className="relative flex items-center justify-center py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <span className="relative bg-white dark:bg-gray-900 px-3 text-xs uppercase text-slate-400 dark:text-slate-500 font-medium tracking-wider">
                            Or sign in with email
                        </span>
                    </div>
                </div>

                {/* NATIVE SIGN IN FORM */}
                <form onSubmit={handleSignInSubmit} className="space-y-5">

                    {/* Email Input Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                            <FiMail className="text-slate-400 dark:text-slate-500" />
                            Email Address
                        </label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            radius="lg"
                            variant="bordered"
                            required
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-gray-950 text-slate-800 dark:text-white focus-within:border-blue-500"
                        />
                    </div>

                    {/* Password Input Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center justify-between w-full">
                            <span className="flex items-center gap-1.5">
                                <FiLock className="text-slate-400 dark:text-slate-500" />
                                Password
                            </span>
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="focus:outline-none text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline normal-case flex items-center gap-1"
                            >
                                {isVisible ? (
                                    <>
                                        <FiEyeOff className="inline" /> Hide
                                    </>
                                ) : (
                                    <>
                                        <FiEye className="inline" /> Show
                                    </>
                                )}
                            </button>
                        </label>
                        <Input
                            type={isVisible ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            radius="lg"
                            variant="bordered"
                            required
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-gray-950 text-slate-800 dark:text-white focus-within:border-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Submit Sign In Button Action */}
                    <Button
                        type="submit"
                        radius="lg"
                        isLoading={isLoading}
                        className="w-full h-11 bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md shadow-blue-200 dark:shadow-none mt-2 transition"
                    >
                        Sign In Account
                    </Button>
                </form>

                {/* FOOTER LINK ALTERNATE SWITCH */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                    Do not have an account yet?
                    <Link href="/auth/signup" className="ml-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}