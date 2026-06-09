/* VIP Person — UI primitives + icon set. Exports to window. */

// ─── Icon set (line, 24×24, currentColor) ───────────────────
const ICONS = {
  feed: 'M4 5h16M4 12h16M4 19h10',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  deals: 'M3 7l4-2 5 2 5-2 4 2v10l-4 2-5-2-5 2-4-2z M7 5v12 M12 7v12 M17 5v12',
  bell: 'M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6 M9.5 20a2.5 2.5 0 005 0',
  user: 'M5 20a7 7 0 0114 0 M12 11a4 4 0 100-8 4 4 0 000 8',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2',
  scan: 'M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16',
  plus: 'M12 5v14M5 12h14',
  back: 'M15 5l-7 7 7 7',
  next: 'M9 5l7 7-7 7',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-3.5-3.5',
  filter: 'M4 6h16M7 12h10M10 18h4',
  sliders: 'M4 8h10M18 8h2M4 16h2M10 16h10M14 6v4M8 14v4',
  star: 'M12 3l2.6 5.5 6 .8-4.4 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.4 9.3l6-.8z',
  check: 'M5 12l5 5L20 6',
  checkCircle: 'M12 21a9 9 0 100-18 9 9 0 000 18zM8.5 12l2.5 2.5 5-5',
  x: 'M6 6l12 12M18 6L6 18',
  heart: 'M12 20s-7-4.3-9.3-9C1 7.5 3 4.5 6.2 4.5c2 0 3.2 1.3 3.8 2.3.6-1 1.8-2.3 3.8-2.3 3.2 0 5.2 3 3.5 6.5C19 15.7 12 20 12 20z',
  pin: 'M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5',
  coins: 'M9 7a5 3 0 1010 0 5 3 0 10-10 0v6a5 3 0 0010 0M4 11a5 3 0 1010 0 5 3 0 10-10 0v6a5 3 0 0010 0',
  crown: 'M4 18h16M4 18l-1-9 5 4 4-7 4 7 5-4-1 9',
  sparkle: 'M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  share: 'M16 6l-4-4-4 4M12 2v13M6 12H5a2 2 0 00-2 2v6h18v-6a2 2 0 00-2-2h-1',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  warn: 'M12 4l9 16H3zM12 10v4M12 17h.01',
  lock: 'M6 11V8a6 6 0 0112 0v3M5 11h14v9H5z',
  cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  flame: 'M12 22c4 0 7-2.8 7-7 0-4-3-5-2.5-9C13 8 11 9 11 12c-1 0-2-1-2-3-2 1.5-4 4-4 7 0 4.2 3 6 7 6z',
  instagram: 'M4 4h16v16H4zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7M17 6.5h.01',
  send: 'M4 11l16-7-7 16-2-7z',
  edit: 'M4 20h4L18 10l-4-4L4 16zM13 5l4 4',
  bolt: 'M13 3L5 13h6l-1 8 8-10h-6z',
  shield: 'M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z',
  chart: 'M5 20V10M12 20V4M19 20v-7',
  refresh: 'M4 12a8 8 0 0114-5l2 2M20 6v4h-4M20 12a8 8 0 01-14 5l-2-2M4 18v-4h4',
  logout: 'M9 5H5v14h4M16 8l4 4-4 4M20 12H10',
  copy: 'M9 9h10v11H9zM5 15H4V4h11v1',
};

function Icon({ name, size = 22, stroke = 1.7, fill = false, style = {} }) {
  const d = ICONS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

// ─── Logo (inline, themeable) ───────────────────────────────
function LogoMark({ size = 48, radius }) {
  const r = radius != null ? radius : size * 0.3;
  return (
    <div style={{
      width: size, height: size, borderRadius: r, flexShrink: 0,
      background: 'linear-gradient(140deg, #F0824E 0%, #E86A3A 55%, #C24E26 100%)',
      boxShadow: '0 6px 18px rgba(200,72,30,0.4), inset 0 0 0 1.2px rgba(224,182,92,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: size * 0.5, color: '#FBF6EE', lineHeight: 1, letterSpacing: '-0.02em' }}>VP</span>
      <svg width={size * 0.34} height={size * 0.34} viewBox="0 0 24 24" style={{ position: 'absolute', top: size * 0.06, right: size * 0.05 }}>
        <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" fill="#F4DFA6" />
      </svg>
    </div>
  );
}

function Wordmark({ size = 26, sub = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: size * 0.18 }}>
        <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontSize: size, color: 'var(--accent)' }}>VIP</span>
        <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: size * 0.92, letterSpacing: '-0.02em', color: 'var(--text)' }}>Person</span>
      </div>
      {sub && <span style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'var(--text-3)', marginTop: 3, fontWeight: 600 }}>БИЗНЕС · БЛОГЕРЫ</span>}
    </div>
  );
}

// ─── Buttons ────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'primary', size = 'md', full = false, icon, iconRight, disabled = false, style = {} }) {
  const pads = { sm: '9px 14px', md: '13px 18px', lg: '16px 22px' };
  const fs = { sm: 14, md: 15.5, lg: 16.5 };
  const variants = {
    primary: { background: 'linear-gradient(135deg, #F0824E, #E0612F)', color: '#fff', boxShadow: '0 6px 18px rgba(216,94,48,0.34)' },
    gold:    { background: 'linear-gradient(135deg, #E9C672, #D2A341)', color: '#2A1E0A', boxShadow: '0 6px 18px rgba(210,163,65,0.3)' },
    dark:    { background: 'var(--surface-2)', color: 'var(--text)', boxShadow: 'inset 0 0 0 1px var(--line-strong)' },
    ghost:   { background: 'transparent', color: 'var(--text-2)', boxShadow: 'inset 0 0 0 1px var(--line-strong)' },
    danger:  { background: 'rgba(229,99,91,0.14)', color: '#E5635B', boxShadow: 'inset 0 0 0 1px rgba(229,99,91,0.3)' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      width: full ? '100%' : undefined, padding: pads[size], borderRadius: 14, border: 'none',
      fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: fs[size], cursor: 'pointer',
      letterSpacing: '-0.01em', opacity: disabled ? 0.4 : 1, transition: 'transform .12s, filter .12s',
      WebkitTapHighlightColor: 'transparent', ...variants[variant], ...style,
    }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 18} stroke={2} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'lg' ? 20 : 18} stroke={2} />}
    </button>
  );
}

function IconBtn({ name, onClick, size = 40, badge, active = false, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 13, border: 'none', cursor: 'pointer', position: 'relative',
      background: active ? 'var(--accent-soft)' : 'var(--surface)', color: active ? 'var(--accent)' : 'var(--text-2)',
      boxShadow: active ? 'inset 0 0 0 1px rgba(232,106,58,0.35)' : 'inset 0 0 0 1px var(--line)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent', ...style,
    }}>
      <Icon name={name} size={size * 0.5} />
      {badge != null && <span style={{
        position: 'absolute', top: -3, right: -3, minWidth: 17, height: 17, padding: '0 4px', borderRadius: 9,
        background: 'var(--accent)', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex',
        alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px var(--bg)',
      }}>{badge}</span>}
    </button>
  );
}

// ─── Badges / pills ─────────────────────────────────────────
const TONES = {
  accent:  { bg: 'rgba(232,106,58,0.15)', fg: '#F08A5E', line: 'rgba(232,106,58,0.3)' },
  gold:    { bg: 'rgba(224,182,92,0.15)', fg: '#E0B65C', line: 'rgba(224,182,92,0.3)' },
  success: { bg: 'rgba(91,191,138,0.15)', fg: '#5BBF8A', line: 'rgba(91,191,138,0.3)' },
  danger:  { bg: 'rgba(229,99,91,0.15)', fg: '#E5635B', line: 'rgba(229,99,91,0.3)' },
  muted:   { bg: 'rgba(245,238,225,0.08)', fg: '#A89F90', line: 'rgba(245,238,225,0.12)' },
};

function Badge({ children, tone = 'muted', icon, solid = false, style = {} }) {
  const t = TONES[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 8,
      fontSize: 11.5, fontWeight: 700, letterSpacing: '0.01em', whiteSpace: 'nowrap',
      background: solid ? t.fg : t.bg, color: solid ? '#1A1410' : t.fg,
      boxShadow: solid ? 'none' : `inset 0 0 0 1px ${t.line}`, ...style,
    }}>
      {icon && <Icon name={icon} size={12} stroke={2.4} />}
      {children}
    </span>
  );
}

function PayBadge({ pay, amount }) {
  const map = { 'Платно': 'accent', 'Бартер': 'gold', 'Услуга': 'muted' };
  return <Badge tone={map[pay] || 'muted'} icon={pay === 'Платно' ? 'coins' : pay === 'Бартер' ? 'refresh' : 'heart'}>{pay === 'Платно' ? window.fmtSum(amount) : pay}</Badge>;
}

// ─── Avatars / logos ────────────────────────────────────────
function Avatar({ name, initials, color, size = 48, ring = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(140deg, ${color}, ${color}bb)`, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.38, letterSpacing: '-0.01em',
      boxShadow: ring ? '0 0 0 2px var(--bg), 0 0 0 3.5px var(--gold)' : 'inset 0 0 0 1px rgba(255,255,255,0.12)',
    }}>{initials}</div>
  );
}

function BizLogo({ biz, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      background: `linear-gradient(140deg, ${biz.color}, ${biz.color}cc)`, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * 0.36, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
    }}>{biz.initials}</div>
  );
}

// ─── Striped image placeholder ──────────────────────────────
function Placeholder({ label, height = 160, radius = 16, style = {} }) {
  return (
    <div style={{
      height, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: 'repeating-linear-gradient(135deg, #1E1A15 0 11px, #191510 11px 22px)',
      boxShadow: 'inset 0 0 0 1px var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <span style={{
        fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.04em',
        color: 'var(--text-3)', background: 'var(--bg)', padding: '4px 9px', borderRadius: 6,
        boxShadow: 'inset 0 0 0 1px var(--line)',
      }}>{label}</span>
    </div>
  );
}

// ─── Rating display ─────────────────────────────────────────
function Rating({ value, size = 14, showNum = true }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--gold)', fontWeight: 800, fontSize: size }}>
      <Icon name="star" size={size + 1} fill={true} />
      {showNum && <span style={{ color: 'var(--text)', fontFamily: "'Hanken Grotesk', sans-serif" }}>{value.toFixed(1)}</span>}
    </span>
  );
}

// ─── Card / Section ─────────────────────────────────────────
function Card({ children, onClick, pad = 16, style = {} }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--surface)', borderRadius: 20, padding: pad,
      boxShadow: 'inset 0 0 0 1px var(--line)', cursor: onClick ? 'pointer' : 'default',
      WebkitTapHighlightColor: 'transparent', ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 2px 12px' }}>
      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{children}</h3>
      {action && <button onClick={onAction} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit' }}>{action}</button>}
    </div>
  );
}

// ─── Segmented control ──────────────────────────────────────
function Segmented({ options, value, onChange, style = {} }) {
  return (
    <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 13, padding: 4, gap: 4, boxShadow: 'inset 0 0 0 1px var(--line)', ...style }}>
      {options.map(o => {
        const active = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1, padding: '9px 8px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: active ? 'var(--accent)' : 'transparent', color: active ? '#fff' : 'var(--text-2)',
            fontFamily: 'inherit', fontWeight: 700, fontSize: 13.5, letterSpacing: '-0.01em',
            boxShadow: active ? '0 4px 12px rgba(216,94,48,0.3)' : 'none', transition: 'background .15s',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>{o.icon && <Icon name={o.icon} size={15} stroke={2} />}{o.label}</button>
        );
      })}
    </div>
  );
}

// ─── Field (read-only display row) ──────────────────────────
function Field({ label, value, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0' }}>
      {icon && <div style={{ color: 'var(--text-3)' }}><Icon name={icon} size={18} /></div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.02em' }}>{label}</div>
        <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600, marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

// ─── Stat chips ─────────────────────────────────────────────
function Stat({ label, value, accent }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '12px 6px' }}>
      <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 27, color: accent ? 'var(--gold)' : 'var(--text)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginTop: 5, letterSpacing: '0.01em' }}>{label}</div>
    </div>
  );
}

// ─── Bottom sheet ───────────────────────────────────────────
function Sheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 80, display: 'flex', alignItems: 'flex-end',
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', animation: 'vpFade .2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: 'var(--bg-2)', borderRadius: '26px 26px 0 0', padding: '10px 18px 30px',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.5), inset 0 1px 0 var(--line-strong)', animation: 'vpSlideUp .26s cubic-bezier(.2,.8,.2,1)',
        maxHeight: '88%', overflowY: 'auto',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: 'var(--line-strong)', margin: '4px auto 14px' }} />
        {title && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>{title}</h3>
          <IconBtn name="x" size={34} onClick={onClose} />
        </div>}
        {children}
      </div>
    </div>
  );
}

// ─── Top header (custom, clears status bar) ─────────────────
function Header({ title, sub, left, right, onBack, large = false, transparent = false }) {
  return (
    <div style={{
      paddingTop: 58, paddingLeft: 18, paddingRight: 18, paddingBottom: large ? 6 : 12,
      background: transparent ? 'transparent' : 'var(--bg)', position: window.__FIGMA_EXPORT ? 'relative' : 'sticky', top: 0, zIndex: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 40 }}>
        {onBack && <IconBtn name="back" size={40} onClick={onBack} />}
        {left}
        <div style={{ flex: 1, minWidth: 0 }}>
          {!large && title && <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>}
          {!large && sub && <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{sub}</div>}
        </div>
        {right}
      </div>
      {large && <div style={{ marginTop: 10 }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)' }}>{title}</h1>
        {sub && <div style={{ fontSize: 13.5, color: 'var(--text-3)', fontWeight: 600, marginTop: 3 }}>{sub}</div>}
      </div>}
    </div>
  );
}

Object.assign(window, {
  Icon, LogoMark, Wordmark, Btn, IconBtn, Badge, PayBadge, Avatar, BizLogo,
  Placeholder, Rating, Card, SectionTitle, Segmented, Field, Stat, Sheet, Header, TONES,
});
