import React from 'react';
import { redirect } from "next/navigation";
import { getReviewsByUserId } from "@/lib/api/reviews";
import { getUserSession } from '@/lib/core/session';
import MyReviewsTable from '@/components/dashboard/MyReviewsTable';

export const metadata = {
    title: "My Reviews | Prompt World",
    description: "Manage and view your submitted prompt ecosystem valuations.",
};

const MyReviews = async () => {
    const user = await getUserSession();

    if (!user) {
        redirect("/auth/signin");
    }

    let reviews = [];
    try {
        reviews = await getReviewsByUserId(user?.id);
        console.log(reviews?.data);
    } catch (error) {
        console.error("Failed to compile user reviews on server:", error);
    }

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold tracking-tight">My Reviews</h1>
                <p className="text-xs text-zinc-500 mt-1">
                    Manage and view all community reviews you have posted across the marketplace directory.
                </p>
            </div>

            {/* 3. Pass raw datasets cleanly to our view child */}
            <MyReviewsTable initialReviews={reviews?.data} />
        </div>
    );
};

export default MyReviews;