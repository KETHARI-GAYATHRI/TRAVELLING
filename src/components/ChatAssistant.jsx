import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export default function ChatAssistant({ destinationContext = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, loading, error, clearMessages } = useChat(destinationContext);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = destinationContext
    ? [
        `What should I do in ${destinationContext}?`,
        `Best time to visit ${destinationContext}?`,
        `Local food to try in ${destinationContext}?`,
        `Hidden gems in ${destinationContext}?`,
      ]
    : [
        'Best destinations for solo travel?',
        'Top budget-friendly countries?',
        'Best time to visit Japan?',
        'Beach vs mountain vacation?',
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const formatMessage = (text) => {
    // Basic markdown-like formatting
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let listType = null;

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(<ul key={`list-${elements.length}`}>{currentList.map((item, i) => <li key={i}>{item}</li>)}</ul>);
        } else {
          elements.push(<ol key={`list-${elements.length}`}>{currentList.map((item, i) => <li key={i}>{item}</li>)}</ol>);
        }
        currentList = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.match(/^[-•*]\s+/)) {
        listType = 'ul';
        currentList.push(line.replace(/^[-•*]\s+/, ''));
        continue;
      }

      if (line.match(/^\d+\.\s+/)) {
        listType = 'ol';
        currentList.push(line.replace(/^\d+\.\s+/, ''));
        continue;
      }

      flushList();

      if (line === '') continue;

      // Bold text
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    }

    flushList();
    return elements;
  };

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <button
          className="chat-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI travel assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="AI Travel Assistant">
          {/* Header */}
          <div className="chat-panel__header">
            <div>
              <div className="chat-panel__title">
                <Sparkles size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle', color: 'var(--color-accent-primary)' }} />
                ESCAPE AI
              </div>
              <div className="chat-panel__subtitle">
                {destinationContext ? `Exploring ${destinationContext}` : 'Your travel assistant'}
              </div>
            </div>
            <button className="chat-panel__close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-panel__messages" aria-live="polite">
            {messages.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <Sparkles size={32} style={{ color: 'var(--color-text-light)', marginBottom: 12 }} />
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                  Ask me anything about travel!
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-message chat-message--${msg.role === 'assistant' ? 'ai' : 'user'}`}>
                <div className="chat-message__avatar">
                  {msg.role === 'assistant' ? 'AI' : 'You'}
                </div>
                <div className="chat-message__bubble">
                  {msg.role === 'assistant' ? formatMessage(msg.content) : <p>{msg.content}</p>}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message chat-message--ai">
                <div className="chat-message__avatar">AI</div>
                <div className="chat-message__bubble">
                  <div className="chat-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-xs)' }}>{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="chat-suggestions">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="chat-suggestions__chip"
                  onClick={() => handleSuggestion(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-panel__input">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              placeholder="Ask about any destination..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="chat-panel__send"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              type="button"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
