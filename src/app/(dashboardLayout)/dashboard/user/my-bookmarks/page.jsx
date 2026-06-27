import React from 'react';
import { getUserSession } from '@/lib/core/session';
import BookmarksDisplay from '@/components/dashboard/BookmarkDisplay';
import { getUserBookmarks } from '@/lib/api/bookmarks';

export default async function Page() {
    const user = await getUserSession();
    // console.log(user);

    const initialBookmarks = await getUserBookmarks(user.id);
    // console.log(initialBookmarks)

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Bookmarks</h1>
            <BookmarksDisplay initialBookmarks={initialBookmarks} user={user} />
        </div>
    );
}