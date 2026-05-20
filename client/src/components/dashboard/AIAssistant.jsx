import { useState } from 'react';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const starters = [
  // 'What crop should I plant this season?',
  // 'My wheat leaves have yellow spots — what should I do?',
  // 'Which government schemes am I eligible for?',
  // 'Should I irrigate before the rain forecast?',
];

export default function AIAssistant({ profile = {} }) {
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
    <div className="flex h-full flex-col rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary-light" />
        <span className="font-semibold text-white">AI Agriculture Assistant</span>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-64 pr-1">
        {messages.map((msg, index) => (
          <div
            key={`${msg.role}-${index}`}
            className={`rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'ml-8 bg-primary/30 text-white'
                : 'mr-4 border border-white/10 bg-white/5 text-muted'
            }`}
          >
            <p className="whitespace-pre-wrap text-white/90">{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            Thinking…
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {starters.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted transition hover:border-primary/30 hover:text-white"
          >
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crops, disease, schemes…"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-primary/40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex items-center justify-center rounded-xl bg-primary px-4 text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
