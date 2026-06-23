import React from 'react';
import ActionButtons from './ActionButtons';
import { Card } from '@heroui/react';
import { FiCopy, FiCpu } from 'react-icons/fi';

const RenderCardGrid = ({ items, isPendingSet, isDeleting, handleDelete }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {items.map((prompt) => (
            <Card
                key={prompt._id}
                className="bg-transparent shadow-none border border-blue-500/10 rounded-xl p-0 overflow-hidden flex flex-col justify-between"
            >
                <Card.Header className="p-4 pb-2 flex flex-col items-start space-y-1 bg-transparent">
                    <div className="w-full flex items-center justify-between">
                        <span className="relative pl-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 capitalize before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full">
                            {prompt.category}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-wider ${prompt.difficulty === 'pro' ? 'text-purple-500' :
                            prompt.difficulty === 'intermediate' ? 'text-amber-500' : 'text-blue-500'
                            }`}>
                            {prompt.difficulty}
                        </span>
                    </div>
                    <Card.Title className="text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 pt-1">
                        {prompt.title}
                    </Card.Title>
                </Card.Header>

                <Card.Content className="p-4 py-2 bg-transparent space-y-3">
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <FiCpu size={13} className="text-blue-500/50" />
                            <span>{prompt.aiTool}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiCopy size={13} className="text-zinc-400" />
                            <span>{prompt.copyCount || 0} uses</span>
                        </div>
                    </div>
                </Card.Content>

                <Card.Footer className="p-4 pt-2 border-t border-blue-500/5 bg-transparent flex items-center justify-between">
                    <div>
                        {isPendingSet ? (
                            <span className="text-[10px] font-extrabold tracking-widest uppercase text-amber-500">Pending</span>
                        ) : (
                            <span className="text-[10px] font-extrabold tracking-widest uppercase text-green-500">Approved</span>
                        )}
                    </div>
                    <ActionButtons prompt={prompt} isDeleting={isDeleting} handleDelete={handleDelete} />
                </Card.Footer>
            </Card>
        ))}
    </div>
);

export default RenderCardGrid;