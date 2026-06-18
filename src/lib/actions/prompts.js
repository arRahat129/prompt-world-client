'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createPrompt = async (newPromptData) => {
    console.log(newPromptData)
    const res = await fetch(`${baseUrl}/api/prompts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPromptData)
    });

    const data = await res.json();
    return data;
}