"use client";

import React from 'react';
import { Table, Card } from '@heroui/react';
import { FiStar, FiMessageSquare } from 'react-icons/fi';

export default function MyReviewsTable({ initialReviews = [] }) {

    const renderStars = (rating) => {
        const totalStars = 5;
        const currentRating = Math.round(Number(rating || 0));

        return (
            <div className="flex items-center gap-1" aria-label={`${currentRating} out of 5 stars`}>
                {[...Array(totalStars)].map((_, index) => {
                    const starIndex = index + 1;
                    const isFilled = starIndex <= currentRating;
                    return (
                        <FiStar
                            key={index}
                            size={14}
                            className={`${isFilled
                                ? "text-amber-400 fill-amber-400"
                                : "text-zinc-600 dark:text-zinc-700"
                                } transition-colors`}
                        />
                    );
                })}
                <span className="text-xs text-zinc-800 dark:text-zinc-500 font-medium ml-1">
                    ({currentRating}/5)
                </span>
            </div>
        );
    };

    if (initialReviews.length === 0) {
        return (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl max-w-xl mx-auto space-y-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto text-zinc-800 dark:text-zinc-500">
                    <FiMessageSquare size={18} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">No reviews found</h3>
                <p className="text-xs text-zinc-800 dark:text-zinc-500 max-w-xs mx-auto">
                    You haven not left any prompt marketplace evaluations yet. Your posted metrics will show up here.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="hidden md:block w-full">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="User compiled reviews grid context">
                            <Table.Header>
                                <Table.Column isRowHeader>Prompt Details</Table.Column>
                                <Table.Column>My Rating</Table.Column>
                                <Table.Column>Comment Description</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {initialReviews.map((review) => (
                                    <Table.Row key={review._id} className="border-b border-divider/40 last:border-0">
                                        <Table.Cell className="align-top py-4 max-w-60">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">
                                                    {review.promptName || "Untitled Prompt"}
                                                </h4>
                                                <p className="text-xs text-zinc-800 dark:text-zinc-500 line-clamp-2 leading-relaxed">
                                                    {review.promptDescription || "No prompt meta information available."}
                                                </p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="align-top py-4 whitespace-nowrap">
                                            {renderStars(review.rating)}
                                        </Table.Cell>
                                        <Table.Cell className="align-top py-4">
                                            <p className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed wrap-break-word whitespace-pre-wrap max-w-md">
                                                {review.comment}
                                            </p>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            {/* SMALL DEVICE CARD GRID SCALER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {initialReviews.map((review) => (
                    <Card key={review._id} className="w-full border border-divider bg-content1 shadow-sm" variant="default">
                        <Card.Header className="flex flex-col items-start gap-1 pb-2">
                            <Card.Title className="text-sm font-bold text-zinc-800 dark:text-zinc-100 w-full truncate">
                                {review.promptName || "Untitled Prompt"}
                            </Card.Title>
                            <Card.Description className="text-xs text-zinc-800 dark:text-zinc-500 line-clamp-2 leading-normal">
                                {review.promptDescription || "No prompt meta description listed."}
                            </Card.Description>
                        </Card.Header>
                        <Card.Content className="space-y-3 pt-1">
                            <div className="py-1 border-t border-b border-divider/50">
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-xs text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {review.comment}
                            </p>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        </>
    );
}