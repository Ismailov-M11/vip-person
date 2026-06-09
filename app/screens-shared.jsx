/* VIP Person — onboarding + shared screens. */

// ─── Splash ─────────────────────────────────────────────────
function SplashScreen({ nav }) {
  React.useEffect(() => {
    if (window.__vpSetSBDark) window.__vpSetSBDark(false);
    return () => { if (window.__vpSetSBDark) window.__vpSetSBDark(true); };
  }, []);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'radial-gradient(120% 80% at 50% 0%, #FFF0E0 0%, #FAF4EC 55%)' }}>
      <div style={{ position: 'absolute', top: 90, left: 40, opacity: 0.5 }}><Icon name="sparkle" size={20} fill style={{ color: 'var(--gold)' }} /></div>
      <div style={{ position: 'absolute', top: 160, right: 54, opacity: 0.3 }}><Icon name="sparkle" size={13} fill style={{ color: 'var(--gold)' }} /></div>
      <div style={{ position: 'absolute', top: 240, left: 70, opacity: 0.25 }}><Icon name="sparkle" size={11} fill style={{ color: 'var(--accent)' }} /></div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 30px' }}>
        <LogoMark size={92} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 46, color: 'var(--accent)', lineHeight: 1 }}>VIP</span>
            <span style={{ fontWeight: 800, fontSize: 42, letterSpacing: '-0.03em', color: '#1E1208' }}>Person</span>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)', fontWeight: 600, marginTop: 12, lineHeight: 1.5, maxWidth: 280 }}>
            Платформа, где <span style={{ color: 'var(--gold)' }}>бизнес</span> и <span style={{ color: 'var(--accent)' }}>блогеры</span> находят друг друга
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px 48px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn size="lg" full iconRight="arrow" onClick={() => nav.go('role')}>Начать</Btn>
        <div style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600 }}>Узбекистан · iOS · Android</div>
      </div>
    </div>
  );
}

// ─── Role select ────────────────────────────────────────────
function RoleScreen({ nav }) {
  const roles = [
    { key: 'business', icon: 'grid', color: '#E0B65C', soft: 'var(--gold-soft)', title: 'Я — Бизнес', desc: 'Размещайте объявления и находите блогеров для рекламы', points: ['Free Trial 14 дней', 'Доступ ко всем профилям'] },
    { key: 'blogger', icon: 'instagram', color: '#E86A3A', soft: 'var(--accent-soft)', title: 'Я — Блогер', desc: 'Откликайтесь на предложения бизнеса и зарабатывайте', points: ['Бесплатно навсегда', 'Лента под ваши параметры'] },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '70px 24px 8px' }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em' }}>Выберите роль</h1>
        <p style={{ margin: '8px 0 0', fontSize: 14.5, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.5 }}>Роль определяет ваше окружение. Сменить можно в любой момент в профиле.</p>
      </div>
      <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {roles.map(r => (
          <div key={r.key} onClick={() => nav.go('login', { role: r.key })} style={{
            background: 'var(--surface)', borderRadius: 22, padding: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden',
            boxShadow: 'inset 0 0 0 1px var(--line)', transition: 'transform .12s',
          }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div style={{ position: 'absolute', right: -16, top: -16, opacity: 0.08 }}><Icon name={r.icon} size={120} /></div>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: r.soft, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Icon name={r.icon} size={27} /></div>
            <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>{r.title}</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontWeight: 500, marginTop: 5, lineHeight: 1.4, maxWidth: 260 }}>{r.desc}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {r.points.map(p => <Badge key={p} tone="muted" icon="check">{p}</Badge>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Login ──────────────────────────────────────────────────
function LoginScreen({ nav, params }) {
  const role = params.role || 'blogger';
  const [method, setMethod] = React.useState('phone');
  const methods = [
    { key: 'phone', icon: 'phone', label: 'Телефон (SMS)' },
    { key: 'email', icon: 'mail', label: 'Email + пароль' },
    { key: 'google', icon: 'user', label: 'Google' },
  ];
  const roleLabel = role === 'business' ? 'Бизнес' : 'Блогер';
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ paddingTop: 58, paddingLeft: 18 }}><IconBtn name="back" onClick={() => nav.pop()} /></div>
      <div style={{ flex: 1, padding: '14px 24px', display: 'flex', flexDirection: 'column' }}>
        <LogoMark size={56} />
        <h1 style={{ margin: '20px 0 0', fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>Вход в аккаунт</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8 }}>
          <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 500 }}>Роль:</span>
          <Badge tone={role === 'business' ? 'gold' : 'accent'} icon={role === 'business' ? 'grid' : 'instagram'}>{roleLabel}</Badge>
        </div>

        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {methods.map(m => (
            <button key={m.key} onClick={() => setMethod(m.key)} style={{
              display: 'flex', alignItems: 'center', gap: 13, padding: '15px 16px', borderRadius: 15, cursor: 'pointer', textAlign: 'left',
              background: method === m.key ? 'var(--accent-soft)' : 'var(--surface)', border: 'none',
              boxShadow: method === m.key ? 'inset 0 0 0 1.5px rgba(232,106,58,0.4)' : 'inset 0 0 0 1px var(--line)',
            }}>
              <div style={{ color: method === m.key ? 'var(--accent)' : 'var(--text-2)' }}><Icon name={m.icon} size={21} /></div>
              <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{m.label}</span>
              <div style={{ width: 20, height: 20, borderRadius: '50%', boxShadow: method === m.key ? 'none' : 'inset 0 0 0 2px var(--line-strong)', background: method === m.key ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {method === m.key && <Icon name="check" size={13} stroke={3} style={{ color: '#fff' }} />}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 18, background: 'var(--surface)', borderRadius: 15, padding: '14px 16px', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, marginBottom: 8 }}>{method === 'phone' ? 'Номер телефона' : method === 'email' ? 'Email' : 'Аккаунт Google'}</div>
          <div style={{ fontSize: 17, color: 'var(--text)', fontWeight: 600 }}>{method === 'phone' ? '+998 90 123 45 67' : method === 'email' ? 'you@vipperson.uz' : 'you@gmail.com'}</div>
        </div>

        <div style={{ flex: 1 }} />
        <Btn size="lg" full onClick={() => nav.enter(role)} iconRight="arrow">Продолжить</Btn>
        <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3)', marginTop: 14, lineHeight: 1.5 }}>Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности VIP Person</p>
      </div>
    </div>
  );
}

// ─── Notifications (shared) ─────────────────────────────────
function NotifsScreen({ nav, env }) {
  const list = window.DATA.notifs[env];
  const iconMap = { check: 'checkCircle', star: 'star', bell: 'bell', warn: 'warn', user: 'user', qr: 'qr' };
  return (
    <ScreenScroll>
      <Header title="Уведомления" large sub={`${list.filter(n => n.unread).length} новых`} />
      <div style={{ padding: '6px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {list.map(n => {
          const t = window.TONES[n.tone];
          return (
            <div key={n.id} style={{ display: 'flex', gap: 13, padding: 14, borderRadius: 17, background: n.unread ? 'var(--surface)' : 'transparent', boxShadow: n.unread ? 'inset 0 0 0 1px var(--line)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: t.bg, color: t.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={iconMap[n.icon]} size={21} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text)' }}>{n.title}</span>
                  {n.unread && <span style={{ width: 7, height: 7, borderRadius: 4, background: 'var(--accent)' }} />}
                  <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--text-3)', fontWeight: 600 }}>{n.time}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500, marginTop: 3, lineHeight: 1.4 }}>{n.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <BottomSpacer />
    </ScreenScroll>
  );
}

// ─── Leave review (shared, side-aware) ──────────────────────
function ReviewScreen({ nav, params, side }) {
  const { ads, businesses, bloggers, BIZ_CRIT, BLOG_CRIT } = window.DATA;
  const deal = window.DATA.deals.find(d => d.id === params.dealId) || { adId: 'ad1', biz: 'bonjour', blogger: 'madina' };
  const ad = ads.find(a => a.id === deal.adId);
  const target = side === 'business' ? bloggers[deal.blogger] : businesses[deal.biz];
  const crit = side === 'business' ? BLOG_CRIT : BIZ_CRIT;
  const [score, setScore] = React.useState(9);
  const [picked, setPicked] = React.useState([]);
  const [text, setText] = React.useState('');
  const toggle = (c) => setPicked(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const ok = picked.length > 0 && text.length >= 20;
  return (
    <ScreenScroll>
      <Header title="Оставить отзыв" onBack={() => nav.pop()} />
      <div style={{ padding: '8px 18px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          {side === 'business' ? <Avatar initials={target.initials} color={target.color} size={46} /> : <BizLogo biz={target} size={46} />}
          <div>
            <div style={{ fontSize: 15.5, fontWeight: 800 }}>{target.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600 }}>{ad.title}</div>
          </div>
        </Card>

        <SectionTitle>Оценка</SectionTitle>
        <Card style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13.5, color: 'var(--text-2)', fontWeight: 600 }}>Поставьте от 1 до 10</span>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--gold)', lineHeight: 1 }}>{score}.0</span>
          </div>
          <input type="range" min="1" max="10" value={score} onChange={e => setScore(+e.target.value)} className="vp-range" style={{ width: '100%' }} />
        </Card>

        <SectionTitle>За что отметить</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {crit.map(c => {
            const on = picked.includes(c);
            return <button key={c} onClick={() => toggle(c)} style={{
              padding: '9px 13px', borderRadius: 11, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              background: on ? 'var(--gold-soft)' : 'var(--surface)', color: on ? 'var(--gold)' : 'var(--text-2)',
              boxShadow: on ? 'inset 0 0 0 1.5px rgba(224,182,92,0.4)' : 'inset 0 0 0 1px var(--line)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>{on && <Icon name="check" size={13} stroke={2.6} />}{c}</button>;
          })}
        </div>

        <SectionTitle>Комментарий</SectionTitle>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Минимум 20 символов. Отзыв проходит модерацию перед публикацией." className="vp-textarea" />
        <div style={{ fontSize: 11.5, color: text.length >= 20 ? 'var(--success)' : 'var(--text-3)', fontWeight: 600, margin: '6px 2px 18px', textAlign: 'right' }}>{text.length}/20</div>

        <Btn size="lg" full disabled={!ok} icon="send" onClick={() => { nav.setStatus(deal.id, 'moderation'); nav.toast('Отзыв отправлен на модерацию'); nav.pop(); }}>Отправить отзыв</Btn>
        <BottomSpacer h={20} />
      </div>
    </ScreenScroll>
  );
}

// ─── Layout helpers ─────────────────────────────────────────
function ScreenScroll({ children }) {
  return <div style={{ height: '100%', overflowY: 'auto', background: 'var(--bg)' }} className="vp-scroll">{children}</div>;
}
function BottomSpacer({ h = 96 }) { return <div style={{ height: h }} />; }

Object.assign(window, { SplashScreen, RoleScreen, LoginScreen, NotifsScreen, ReviewScreen, ScreenScroll, BottomSpacer });
