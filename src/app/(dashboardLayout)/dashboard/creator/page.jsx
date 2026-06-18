'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const CreatorHomePage = () => {
    const { data: session, isPending } = useSession();

    // console.log(session);

    if(isPending) {
        return <div>Loading....</div>
    }

    const user = session?.user;
    console.log('session data from creator dashboard', user, 'session', session);

    return (
        <div>
            <h2 className='text-2xl font-bold'>WELCOME BACK, { user?.name }</h2>
        </div>
    );
};

export default CreatorHomePage;