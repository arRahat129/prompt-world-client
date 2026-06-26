'use server';

import { serverMutation } from "../core/server";

export const createPrompt = async (newPromptData) => {
    return serverMutation('/api/prompts', newPromptData, "POST");
}

export const updatePrompt = async (promptId, updatedPromptData) => {
    return serverMutation(`/api/prompts/${promptId}`, updatedPromptData, "PATCH");
};

export const approvePrompt = async (promptId) => {
    return serverMutation(`/api/prompts/${promptId}/approve`, {}, "PATCH");
};

export const rejectPrompt = async (promptId, feedback) => {
    return serverMutation(`/api/prompts/${promptId}/reject`, { feedback }, "POST");
};

export const deletePromptAdmin = async (promptId) => {
    return serverMutation(`/api/prompts/${promptId}`, {}, "DELETE");
};

export const deletePromptCreator = async (promptId) => {
    return serverMutation(`/api/prompts/${promptId}`, {}, "DELETE");
};

// Copy count
export const incrementPromptCopyCount = async (promptId) => {
    return serverMutation(`/api/prompts/${promptId}/copy`, {}, "PATCH");
};



// export const createPrompt = async (newPromptData) => {
//     console.log(newPromptData)
//     const res = await fetch(`${baseUrl}/api/prompts`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newPromptData)
//     });

//     const data = await res.json();
//     return data;
// }