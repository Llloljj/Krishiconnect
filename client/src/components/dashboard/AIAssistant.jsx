import { useState } from 'react';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const starters = [
  // 'What crop should I plant this season?',
  // 'My wheat leaves have yellow spots — what should I do?',
  // 'Which government schemes am I eligible for?',
  // 'Should I irrigate before the rain forecast?',
];

function buildFallbackReply(message, profile = {}) {
  const text = message.toLowerCase();
  const context = profile?.assistantContext ?? {};
  const farmer = context?.farmer ?? {};
  const weather = context?.weather ?? {};
  const location = farmer?.location || weather?.location || 'your area';

  if (/disease|spot|fung|pest|insect|yellow/.test(text)) {
    return `For ${location}, start with field scouting and remove heavily affected leaves, spray only after confirming pest/fungal symptoms, and avoid over-irrigation for 2-3 days. If you share the crop and symptom color/pattern, I can suggest a tighter treatment plan.`;
  }

  if (/rain|weather|irrigat|water/.test(text)) {
    return `Weather guidance for ${location}: check soil moisture before watering, reduce irrigation when rain chance is high, and prefer morning irrigation to reduce fungal risk. I can help you make a day-wise irrigation plan if you share your crop stage.`;
  }

  if (/scheme|subsidy|loan|pm-kisan|insurance/.test(text)) {
    return 'You can usually check PM-KISAN eligibility, crop insurance enrollment windows, and drip/sprinkler subsidy schemes at your nearest agriculture office or CSC. Share your state and crop, and I will narrow this to likely matching schemes.';
  }

  if (/price|market|demand|sell|mandi/.test(text)) {
    return 'To improve selling decisions, compare mandi trend for the last 7-14 days, check current demand from buyers/FPOs, and stagger harvest if prices are rising. If you share crop and expected quantity, I can suggest a better sale window.';
  }

  if (/crop|plant|sow|season/.test(text)) {
    return `For ${location}, choose crops based on soil type, water availability, and current demand contracts. A safe plan is one primary cash crop plus one risk-buffer crop. Share your land size and irrigation type for a specific recommendation.`;
  }

  return 'I can help with crop planning, disease checks, irrigation timing, market demand, and government schemes. Tell me your crop and current issue, and I will provide a practical next step.';
}

export default function AIAssistant({
  profile = {},
  className = '',
  welcomeMessage = 'Namaste! I am your KrishiConnect AI assistant. Ask about crops, disease, weather, or schemes.',
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: welcomeMessage,
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
      const assistantReply =
        typeof response === 'string' && response.trim()
          ? response
          : buildFallbackReply(trimmed, profile);
      setMessages((prev) => [...prev, { role: 'assistant', text: assistantReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: buildFallbackReply(trimmed, profile),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 p-6 ${className}`}
    >
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
