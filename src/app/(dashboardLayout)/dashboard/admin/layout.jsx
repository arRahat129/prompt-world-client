import { requireRole } from '@/lib/core/session';
import React from 'react';

const CreatorLayout = async ({ children }) => {
    await requireRole('admin');
    return children;
};

export default CreatorLayout;