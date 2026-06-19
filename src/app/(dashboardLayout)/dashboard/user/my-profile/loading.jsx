import React from 'react';
import { Card, Skeleton, Separator } from '@heroui/react';

export default function Loading() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-3 w-full max-w-xs">
                        <Skeleton className="h-6 w-3/4 rounded-lg" />
                        <Skeleton className="h-4 w-1/2 rounded-lg" />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-1/4 rounded-lg" />
                            <Skeleton className="h-8 w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}