'use client';  

import { useState } from 'react';
import { getMessages, postMessage } from '../app/api/messageService';

const Messages = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages || []);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const result = await postMessage(newMessage);
            if (result) {
                setMessages((prevMessages) => [...prevMessages, result]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Message Board</h2>
            <div>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <p key={index}>{msg.content}</p>
                    ))
                ) : (
                    <p>No messages available.</p>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a new message"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export async function getServerSideProps() {
    const messages = await getMessages();
    return {
        props: { initialMessages: messages },
    };
}

export default Messages;
