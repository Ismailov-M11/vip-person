/* VIP Person — App shell: router, navigation, env switch, device scaler. */

const SCREENS = {
  splash: (p) => <SplashScreen {...p} />,
  role: (p) => <RoleScreen {...p} />,
  login: (p) => <LoginScreen {...p} />,
  // blogger
  b_feed: (p) => <BFeed {...p} />,
  b_adDetail: (p) => <BAdDetail {...p} />,
  b_deals: (p) => <BDeals {...p} />,
  b_dealDetail: (p) => <BDealDetail {...p} />,
  b_qr: (p) => <BQR {...p} />,
  b_notifs: (p) => <NotifsScreen {...p} env="blogger" />,
  b_profile: (p) => <BProfile {...p} />,
  b_bizProfile: (p) => <BBizProfile {...p} />,
  b_review: (p) => <ReviewScreen {...p} side="blogger" />,
  // business
  biz_ads: (p) => <BizAds {...p} />,
  biz_createAd: (p) => <BizCreateAd {...p} />,
  biz_adManage: (p) => <BizAdManage {...p} />,
  biz_bloggerProfile: (p) => <BizBloggerProfile {...p} />,
  biz_deals: (p) => <BizDeals {...p} />,
  biz_dealDetail: (p) => <BizDealDetail {...p} />,
  biz_scan: (p) => <BizScan {...p} />,
  biz_subscription: (p) => <BizSubscription {...p} />,
  biz_coins: (p) => <BizCoins {...p} />,
  biz_profile: (p) => <BizProfile {...p} />,
  biz_notifs: (p) => <NotifsScreen {...p} env="business" />,
  biz_review: (p) => <ReviewScreen {...p} side="business" />,
};

const TABS = {
  blogger: [
    { key: 'b_feed', icon: 'feed', label: 'Лента' },
    { key: 'b_deals', icon: 'deals', label: 'Сделки' },
    { key: 'b_notifs', icon: 'bell', label: 'Уведомл.', badge: true },
    { key: 'b_profile', icon: 'user', label: 'Профиль' },
  ],
  business: [
    { key: 'biz_ads', icon: 'feed', label: 'Объявления' },
    { key: 'biz_deals', icon: 'deals', label: 'Сделки' },
    { key: 'biz_subscription', icon: 'crown', label: 'Тариф' },
    { key: 'biz_profile', icon: 'user', label: 'Профиль' },
  ],
};
const TAB_ROOTS = { blogger: new Set(TABS.blogger.map(t => t.key)), business: new Set(TABS.business.map(t => t.key)) };

function App() {
  const [phase, setPhase] = React.useState('onboard');
  const [onb, setOnb] = React.useState([{ name: 'splash', params: {} }]);
  const [env, setEnv] = React.useState('blogger');
  const [bStack, setBStack] = React.useState([{ name: 'b_feed', params: {} }]);
  const [bizStack, setBizStack] = React.useState([{ name: 'biz_ads', params: {} }]);
  const [deals, setDeals] = React.useState(window.DATA.deals);
  const [bizDeals, setBizDeals] = React.useState([
    { id: 'bd1', adId: 'ad1', biz: 'bonjour', blogger: 'madina', status: 'awaiting' },
    { id: 'bd2', adId: 'ad1', biz: 'bonjour', blogger: 'jasur', status: 'working' },
    { id: 'bd3', adId: 'ad2', biz: 'plov', blogger: 'nigora', status: 'review' },
    { id: 'bd4', adId: 'ad5', biz: 'glow', blogger: 'madina', status: 'done' },
  ]);
  const bizAds = [
    { adId: 'ad1', status: 'active', responses: 3, top: true },
    { adId: 'ad2', status: 'active', responses: 1, top: false },
    { adId: 'ad3', status: 'moderation', responses: 0, top: false },
    { adId: 'ad5', status: 'inactive', responses: 5, top: false },
  ];
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  const onboard = phase === 'onboard';
  const stack = onboard ? onb : (env === 'blogger' ? bStack : bizStack);
  const setStack = onboard ? setOnb : (env === 'blogger' ? setBStack : setBizStack);

  const nav = {
    deals, bizDeals, bizAds, env,
    push: (name, params) => setStack(s => [...s, { name, params: params || {} }]),
    pop: () => setStack(s => (s.length > 1 ? s.slice(0, -1) : s)),
    go: (name, params) => setStack(s => [...s, { name, params: params || {} }]),
    tab: (name) => {
      const isBlog = name.startsWith('b_');
      if (isBlog) setBStack([{ name, params: {} }]); else setBizStack([{ name, params: {} }]);
    },
    enter: (role) => { setEnv(role); setPhase('app'); },
    switchEnv: (e) => { setEnv(e); setPhase('app'); setToast(e === 'business' ? 'Окружение: Бизнес' : 'Окружение: Блогер'); scheduleToastClear(); },
    logout: () => { setPhase('onboard'); setOnb([{ name: 'splash', params: {} }]); },
    toast: (msg) => { setToast(msg); scheduleToastClear(); },
    addDeal: (adId) => {
      const ad = window.DATA.ads.find(a => a.id === adId);
      setDeals(d => [{ id: 'dyn' + Date.now(), adId, biz: ad.biz, blogger: 'madina', status: 'responded' }, ...d.filter(x => x.adId !== adId)]);
    },
    setStatus: (dealId, status) => setDeals(d => d.map(x => x.id === dealId ? { ...x, status } : x)),
    setBizStatus: (dealId, status) => setBizDeals(d => d.map(x => x.id === dealId ? { ...x, status } : x)),
  };
  function scheduleToastClear() { clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(null), 2200); }

  const top = stack[stack.length - 1];
  const render = SCREENS[top.name];
  const showTabs = !onboard && stack.length === 1 && (TAB_ROOTS[env].has(top.name));

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
      <div key={env + '-' + top.name + '-' + stack.length} style={{ height: '100%', animation: 'vpScreen .28s cubic-bezier(.2,.8,.2,1)' }}>
        {render ? render({ nav, params: top.params }) : <div style={{ color: '#fff', padding: 40 }}>404 — {top.name}</div>}
      </div>

      {showTabs && <TabBar tabs={TABS[env]} active={top.name} onTab={(k) => nav.tab(k)} />}

      {toast && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: showTabs ? 108 : 40, display: 'flex', justifyContent: 'center', zIndex: 95, pointerEvents: 'none', padding: '0 24px' }}>
          <div style={{
            background: 'rgba(28,25,21,0.95)', backdropFilter: 'blur(14px)', color: 'var(--text)', padding: '12px 18px', borderRadius: 14,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px var(--line-strong)', fontSize: 13.5, fontWeight: 700, maxWidth: '100%',
            display: 'flex', alignItems: 'center', gap: 9, animation: 'vpToast .3s cubic-bezier(.2,.8,.2,1)',
          }}>
            <Icon name="checkCircle" size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ lineHeight: 1.3 }}>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Device scaler ──────────────────────────────────────────
function Stage() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const fit = () => {
      const pad = 24;
      const s = Math.min((window.innerWidth - pad) / 402, (window.innerHeight - pad) / 874, 1.15);
      if (ref.current) ref.current.style.transform = `scale(${s})`;
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(120% 90% at 50% -10%, #1A1714 0%, #08070' + '6 60%)', overflow: 'hidden' }}>
      <div ref={ref} style={{ transformOrigin: 'center center' }}>
        <IOSDevice dark>
          <App />
        </IOSDevice>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Stage />);
