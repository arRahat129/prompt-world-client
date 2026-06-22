"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FiUser, FiMail, FiLink, FiLock, FiEye, FiEyeOff, FiCompass, FiHome } from "react-icons/fi";
import { FaGoogle, FaWandMagicSparkles } from "react-icons/fa6";
import { signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import Image from "next/image";
import logoPng from "@/images/logo.png"
import { useRouter, useSearchParams } from "next/navigation";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("user");

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError("File size exceeds 5MB limit");
            return;
        }

        setIsUploading(true);
        setError("");

        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setImage(data.data.url);
            } else {
                setError("Upload failed. Please try again.");
            }
        } catch (err) {
            setError("Network error occurred during image upload.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const plan = role === 'user' ? 'user_free' : 'creator_free';

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);

        const finalImageUrl = image.trim() || "https://i.ibb.co.com/216mxB4J/user-Sample.png";

        try {
            const { error: authError } = await signUp.email({
                email,
                password,
                name,
                image: finalImageUrl,
                role,
                plan
            });

            if (authError) {
                setError(
                    authError.message ||
                    "Something went wrong during signup."
                );
                return;
            }

            setSuccess("Account created successfully!");

            setName("");
            setEmail("");
            setImage("");
            setRole("user");
            setPassword("");
            toast.success(`User Signed up successfully`);
            router.push('/');

        } catch (err) {
            console.error(err);
            setError("An unexpected network error occurred.");
            toast.error(`ERROR OCCURED || error`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Initiating Google Auth Sign-In...");
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-50/20 via-white to-slate-50 dark:from-black dark:via-gray-900/40 dark:to-black px-4 py-12">

            <header className="w-md mx-auto flex items-center justify-between p-4 mb-2 md:mb-4 border-b border-blue-100 dark:border-blue-900/40 rounded-2xl backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src={logoPng}
                        alt="PromptWorld Logo"
                        width={28}
                        height={28}
                        className="object-contain transition-transform group-hover:scale-105"
                    />
                    <span className="text-xl font-bold tracking-wide text-blue-900 dark:text-blue-400">
                        Prompt World
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button
                            variant=""
                            size="sm"
                            className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FiHome className="text-base" /> Home
                        </Button>
                    </Link>
                    <Link href="/prompts">
                        <Button
                            variant=""
                            size="sm"
                            className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FiCompass className="text-base" /> All Prompts
                        </Button>
                    </Link>
                </div>
            </header>

            {/* AMBIENT BACKGROUND GLOWS */}
            <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-400/10 dark:bg-purple-600/5 blur-[100px]" />

            <div className="w-full max-w-md rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-xl shadow-blue-100/20 dark:shadow-none">

                {/* HEADER TITLE SECTION */}
                <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                        <FaWandMagicSparkles className="h-3 w-3 text-blue-500" />
                        <span>Join Prompt World Marketplace</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Create Your Account
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Start discovering and monetizing engineered AI workflows.
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
                            Or register with email
                        </span>
                    </div>
                </div>

                {/* NATIVE REGISTRATION FORM */}
                <form onSubmit={handleRegisterSubmit} className="space-y-5">

                    {/* Name Input Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                            <FiUser className="text-slate-400 dark:text-slate-500" />
                            Full Name
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            radius="lg"
                            variant="bordered"
                            required
                            className="w-full border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-gray-950 text-slate-800 dark:text-white focus-within:border-blue-500"
                        />
                    </div>

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

                    {/* Photo Input Field */}
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                            <FiLink className="text-slate-400 dark:text-slate-500" />
                            Avatar Photo
                        </label>
                        <div className="flex items-center gap-4 mt-1 p-3 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <label className="w-14 h-14 border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-slate-50 dark:bg-gray-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden shrink-0">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                {image ? (
                                    <Image
                                        src={image}
                                        alt="Avatar Preview"
                                        fill
                                        sizes="(max-w-7xl) 100vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 text-lg font-light">+</span>
                                )}
                            </label>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isUploading ? 'Uploading picture...' : image ? 'Image uploaded!' : 'Choose avatar picture'}
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG up to 5MB</span>
                            </div>
                        </div>

                        {image && !isUploading && (
                            <button
                                type="button"
                                onClick={() => setImage("")}
                                className="text-xs font-medium text-red-500 hover:text-red-600 hover:underline px-2 py-1 transition"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <Label>You want to be a/an...</Label>
                        <RadioGroup
                            onChange={(value) => setRole(value)}
                            defaultValue="user" name="role" orientation="horizontal">
                            <Radio value="user">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    User
                                </Radio.Content>
                                <Description>Can browse prompts for need</Description>
                            </Radio>
                            <Radio value="creator">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Creator
                                </Radio.Content>
                                <Description>Can Create Prompts</Description>
                            </Radio>
                        </RadioGroup>
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

                    {/* Submit Registration Button Action */}
                    <Button
                        type="submit"
                        radius="lg"
                        isLoading={isLoading}
                        className="w-full h-11 bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md shadow-blue-200 dark:shadow-none mt-2 transition"
                    >
                        Sign Up Account
                    </Button>
                </form>

                {/* FOOTER LINK ALTERNATE SWITCH */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                    Already have an account?
                    <Link href={`/auth/signin?redirect=${redirectTo}`} className="ml-2 font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}