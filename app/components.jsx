/* VIP Person — composite components shared across screens. */

// ─── Auto-rotating banner carousel ──────────────────────────
function BannerCarousel() {
  const { banners } = window.DATA;
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % banners.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: '0 18px' }}>
      <div style={{ position: 'relative', height: 92, borderRadius: 18, overflow: 'hidden' }}>
        {banners.map((b, idx) => (
          <div key={b.id} style={{
            position: 'absolute', inset: 0, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: `linear-gradient(110deg, ${b.color}, ${b.color}99 70%, ${b.color}55)`,
            opacity: idx === i ? 1 : 0, transform: `translateX(${(idx - i) * 8}px)`, transition: 'opacity .5s, transform .5s',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}>
            <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.18 }}><Icon name="sparkle" size={92} fill /></div>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)' }}>РЕКЛАМА</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginTop: 3 }}>{b.title}</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 1 }}>{b.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 9 }}>
        {banners.map((_, idx) => <div key={idx} style={{ width: idx === i ? 16 : 5, height: 5, borderRadius: 3, background: idx === i ? 'var(--accent)' : 'var(--line-strong)', transition: 'all .3s' }} />)}
      </div>
    </div>
  );
}

// ─── Ad card (blogger feed) ─────────────────────────────────
function AdCard({ ad, onClick, compact = false }) {
  const biz = window.DATA.businesses[ad.biz];
  return (
    <Card onClick={onClick} pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative' }}>
        <Placeholder label={ad.photo} height={compact ? 110 : 132} radius={0} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          {ad.top && <Badge tone="gold" icon="crown" solid>ТОП</Badge>}
          {ad.urgent && <Badge tone="accent" icon="flame" solid>Срочно</Badge>}
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10 }}><PayBadge pay={ad.pay} amount={ad.amount} /></div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 9 }}>
          <BizLogo biz={biz} size={30} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {biz.name}{biz.verified && <Icon name="checkCircle" size={13} style={{ color: 'var(--accent)' }} />}
            </div>
          </div>
          <Rating value={biz.rating} size={12.5} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 9 }}>{ad.title}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 11 }}>
          <Badge tone="muted" icon="instagram">{ad.content}</Badge>
          <Badge tone="muted" icon="user">{ad.audience}</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="pin" size={13} />{ad.crit.city}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={13} />до {ad.deadline}</span>
        </div>
      </div>
    </Card>
  );
}

// ─── Inline ad-style ad banner card (mid-list ad) ───────────
function FeedAdSlot() {
  return (
    <div style={{
      borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14,
      background: 'linear-gradient(120deg, #221E19, #1A1714)', boxShadow: 'inset 0 0 0 1px var(--gold-line, rgba(224,182,92,0.25))',
    }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="bolt" size={24} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--text-3)' }}>РЕКЛАМА</div>
        <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>Курсы SMM от VIP Academy</div>
        <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>Прокачай личный бренд за 6 недель</div>
      </div>
      <Icon name="next" size={18} style={{ color: 'var(--text-3)' }} />
    </div>
  );
}

// ─── Deal row ───────────────────────────────────────────────
function DealRow({ deal, side, onClick }) {
  const { STATUS, ads, businesses, bloggers } = window.DATA;
  const ad = ads.find(a => a.id === deal.adId);
  const st = STATUS[deal.status];
  const biz = businesses[deal.biz];
  const isBiz = side === 'business';
  const counter = isBiz ? bloggers[deal.blogger] : biz;
  return (
    <Card onClick={onClick} pad={13}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isBiz
          ? <Avatar initials={counter.initials} color={counter.color} size={46} />
          : <BizLogo biz={biz} size={46} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{isBiz ? counter.name : biz.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.title}</div>
          <div style={{ marginTop: 7 }}><Badge tone={st.tone}>{isBiz ? st.biz : st.blog}</Badge></div>
        </div>
        <Icon name="next" size={17} style={{ color: 'var(--text-3)' }} />
      </div>
    </Card>
  );
}

// ─── Status timeline ────────────────────────────────────────
function StatusTimeline({ status, side }) {
  const { STATUS_ORDER, STATUS } = window.DATA;
  const steps = [
    { key: 'responded', label: 'Отклик' },
    { key: 'confirmed', label: 'Подтверждено' },
    { key: 'arrived', label: 'Прибытие (QR)' },
    { key: 'working', label: 'В работе' },
    { key: 'review', label: 'На проверке' },
    { key: 'done', label: 'Завершено' },
  ];
  const order = ['responded', 'awaiting', 'confirmed', 'arrived', 'working', 'review', 'done', 'closed'];
  const cur = order.indexOf(status);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((s, i) => {
        const sIdx = order.indexOf(s.key);
        const done = cur >= sIdx;
        const active = (s.key === 'confirmed' && cur === order.indexOf('awaiting')) ? false : cur === sIdx || (cur === order.indexOf('awaiting') && s.key === 'responded');
        const isCurrent = cur === sIdx;
        return (
          <div key={s.key} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? 'var(--accent)' : 'var(--surface)', color: done ? '#fff' : 'var(--text-3)',
                boxShadow: isCurrent ? '0 0 0 4px var(--accent-soft)' : (done ? 'none' : 'inset 0 0 0 1.5px var(--line-strong)'),
                fontSize: 12, fontWeight: 800, flexShrink: 0, transition: 'all .2s',
              }}>{done ? <Icon name="check" size={14} stroke={2.6} /> : i + 1}</div>
              {i < steps.length - 1 && <div style={{ width: 2, height: 26, background: cur > sIdx ? 'var(--accent)' : 'var(--line-strong)' }} />}
            </div>
            <div style={{ paddingTop: 3, paddingBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: isCurrent ? 800 : 600, color: done ? 'var(--text)' : 'var(--text-3)' }}>{s.label}</div>
              {isCurrent && <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginTop: 1 }}>{side === 'business' ? STATUS[status].biz : STATUS[status].blog}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Criteria bars (rating breakdown) ───────────────────────
function CriteriaList({ items }) {
  const max = Math.max(...items.map(i => i[1]), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      {items.map(([label, count]) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={15} stroke={2.6} /></div>
          <div style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
          <div style={{ width: 56, height: 6, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden' }}>
            <div style={{ width: `${(count / max) * 100}%`, height: '100%', background: 'var(--gold)', borderRadius: 3 }} />
          </div>
          <div style={{ width: 22, textAlign: 'right', fontSize: 13, fontWeight: 800, color: 'var(--text-2)' }}>{count}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Anonymous reviews ──────────────────────────────────────
function ReviewList({ reviews }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {reviews.map((r, i) => (
        <div key={i} style={{ background: 'var(--surface)', borderRadius: 14, padding: '13px 15px', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}><Icon name="user" size={13} /></div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-2)' }}>Аноним</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 'auto' }}>проверено модератором</span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.45 }}>{r}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Bottom tab bar ─────────────────────────────────────────
function TabBar({ tabs, active, onTab, fab }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40, paddingBottom: 24, pointerEvents: 'none' }}>
      <div style={{ margin: '0 14px', position: 'relative', pointerEvents: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-around',
          background: 'rgba(20,18,16,0.82)', backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderRadius: 22, padding: '9px 8px', boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 0 0 1px var(--line-strong)',
        }}>
          {tabs.map(t => {
            const on = t.key === active;
            return (
              <button key={t.key} onClick={() => onTab(t.key)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: on ? 'var(--accent)' : 'var(--text-3)',
                WebkitTapHighlightColor: 'transparent', minWidth: 52,
              }}>
                <div style={{ position: 'relative' }}>
                  <Icon name={t.icon} size={23} stroke={on ? 2.3 : 1.9} fill={false} />
                  {t.badge && <span style={{ position: 'absolute', top: -3, right: -6, minWidth: 8, height: 8, borderRadius: 5, background: 'var(--accent)', boxShadow: '0 0 0 2px rgba(20,18,16,0.9)' }} />}
                </div>
                <span style={{ fontSize: 10, fontWeight: on ? 800 : 600, letterSpacing: '-0.01em' }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BannerCarousel, AdCard, FeedAdSlot, DealRow, StatusTimeline, CriteriaList, ReviewList, TabBar });
