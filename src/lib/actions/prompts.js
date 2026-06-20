'use server';

import { serverMutation } from "../core/server";

export const createPrompt = async(newPromptData) => {
    return serverMutation('/api/prompts', newPromptData, "POST");
}

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