# 🎨 KISAN MADAD: UI-UX Pro Max Design System

## 🌟 Identity: Bio-Tech Cyberpunk
A fusion of high-tech "NVIDIA NIM" intelligence with grounded agricultural reliability.

## 🎨 Color Palette (Pro Max Verified)
| Role | Hex | CSS Variable | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary** | `#00ff88` | `--primary` | Main accent, buttons, high-priority matches |
| **Secondary** | `#10b981` | `--secondary` | Success states, steady growth indicators |
| **Background** | `#050505` | `--bg` | Deep charcoal for maximum neon contrast |
| **Glass** | `rgba(255, 255, 255, 0.03)` | `--glass` | Main container background |
| **Border** | `rgba(255, 255, 255, 0.08)` | `--border` | Subtle structural definition |

## Typography
- **Heading/Body**: `Plus Jakarta Sans`
- **Scale**:
    - `h1`: 3.5rem (Bold, -2px tracking)
    - `h2`: 2.2rem
    - `body`: 1rem (Line-height: 1.6)

## ⚡ Interaction Rules (UX Pro Max)
1. **Cursor**: All interactive elements (cards, buttons, rows) MUST have `cursor: pointer`.
2. **Transitions**: All hover states MUST use `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
3. **No Emojis**: Strictly use **Lucide/Heroicons** SVG icons.
4. **Stable Hover**: Hover transforms should be subtle (e.g., `translateY(-2px)`) to avoid layout shifts.

## 🌈 Component Tokens
- **Neon Glow**: `text-shadow: 0 0 20px var(--primary);`
- **Glass Blur**: `backdrop-filter: blur(20px);`
- **Pulse Animation**: `animation: pulse 2s infinite alternate;`

## 🛡️ Accessibility
- **Contrast**: Minimum 4.5:1 for all text.
- **Touch**: Targets 44x44px minimum.
- **Reduced Motion**: Respect `prefers-reduced-motion` media query.
