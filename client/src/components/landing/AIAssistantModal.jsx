import { useState } from 'react';
import { X, Loader2, Send, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const starters = [
  'What crop should I plant this season?',
  'How do I prevent crop diseases?',
  'Which government schemes am I eligible for?',
  'Should I irrigate before rain forecast?',
];

export default function AIAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! I am your KrishiConnect AI assistant. Ask me about crops, diseases, weather, government schemes, or contracts. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const { response } = await api.aiConsult(trimmed, {
        assistantContext: {
          conversation: messages.slice(-6),
        },
      });
      setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I apologize, I am currently unavailable. Please try again in a moment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-primary/30 bg-gradient-to-br from-[#0a1f12] via-[#0f2818] to-[#081410] shadow-2xl shadow-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/20 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/25">
              <Sparkles className="h-6 w-6 text-primary-light" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">AI Agriculture Assistant</h2>
              <p className="text-xs text-muted">Powered by Gemini AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((msg, index) => (
            <div
              key={`${msg.role}-${index}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-2xl px-5 py-4 text-sm transition-all ${
                  msg.role === 'user'
                    ? 'bg-primary/35 text-white font-medium'
                    : 'border border-primary/25 bg-white/[0.06] text-muted'
                }`}
              >
                <p className="whitespace-pre-wrap text-white/90 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-primary-light">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>AI is thinking…</span>
            </div>
          )}
        </div>

        {/* Starters */}
        {messages.length === 1 && (
          <div className="border-t border-primary/20 px-6 py-4">
            <p className="text-xs text-muted mb-3 font-medium uppercase tracking-wider">Common questions:</p>
            <div className="flex flex-wrap gap-2">
              {starters.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-primary/30 bg-primary/15 px-4 py-2 text-xs text-muted transition hover:border-primary/50 hover:text-primary-light hover:bg-primary/25"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          className="border-t border-primary/20 flex gap-3 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about agriculture…"
            className="flex-1 rounded-xl border border-primary/25 bg-white/8 px-5 py-3 text-sm text-white outline-none placeholder:text-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-light px-6 py-3 text-white font-medium transition hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:shadow-none"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
