import { useState } from 'react';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const defaultPrompts = [
  'What crop should I plant this season?',
  'Which government schemes am I eligible for?',
  'How should I prepare for the next harvest?',
];

export default function AIAssistant({ profile = {}, quickPrompts = defaultPrompts }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! I am your KrishiConnect AI assistant. Ask about crops, disease, weather, or schemes.',
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
        ...profile,
        assistantContext: {
          ...(profile.assistantContext ?? {}),
          conversation: messages.slice(-6),
        },
      });
      setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Server unavailable. Start the backend with: cd server && npm run dev',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-primary/6 p-8 shadow-lg shadow-primary/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/25">
          <Sparkles className="h-6 w-6 text-primary-light" />
        </div>
        <span className="font-semibold text-lg text-white">AI Agriculture Assistant</span>
      </div>

      <div className="mt-2 flex-1 space-y-4 overflow-y-auto max-h-96 pr-2">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`rounded-2xl px-5 py-4 text-sm transition-all ${
              msg.role === 'user'
                ? 'ml-8 bg-primary/30 text-white font-medium'
                : 'mr-2 border border-primary/20 bg-white/[0.05] text-muted'
            }`}
          >
            <p className="whitespace-pre-wrap text-white/90 leading-relaxed">{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-primary-light">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>AI is thinking…</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs text-muted transition hover:border-primary/40 hover:text-primary-light hover:bg-primary/15"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crops, disease, schemes, weather…"
          className="flex-1 rounded-xl border border-primary/20 bg-white/8 px-5 py-3 text-sm text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition"
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
  );
}
