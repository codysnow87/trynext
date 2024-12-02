// TODO: pull url from config
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Function to get all messages from server
export const getMessages = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

// Function to post a new message
export const postMessage = async (messageContent) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: messageContent }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
            throw new Error('Failed to post message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting message:', error);
        return null;
    }
};