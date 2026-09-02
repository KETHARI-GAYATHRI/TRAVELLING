import { useState, useCallback } from 'react';
import { chatWithAssistant } from '../services/geminiService';

/**
 * Hook to manage AI chat state
 * @param {string} destinationContext - Optional current destination
 */
export function useChat(destinationContext = '') {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      const response = await chatWithAssistant(updatedMessages, destinationContext);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [messages, destinationContext]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, sendMessage, loading, error, clearMessages };
}
