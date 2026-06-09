/* VIP Person — Business: subscription, coins, profile. */

// ─── Subscription / tariffs ─────────────────────────────────
function BizSubscription({ nav }) {
  const { tariffs } = window.DATA;
  const [period, setPeriod] = React.useState('1');
  const [sel, setSel] = React.useState('max');
  const mult = { '1': 1, '3': 2.7, '6': 5 };
  return (
    <ScreenScroll>
      <Header large title="Подписка" sub="Free Trial · осталось 2 дня"
        right={<IconBtn name="coins" onClick={() => nav.push('biz_coins')} />} />

      <div style={{ padding: '4px 18px 16px' }}>
        <Segmented value={period} onChange={setPeriod} options={[{ value: '1', label: '1 месяц' }, { value: '3', label: '3 месяца' }, { value: '6', label: '6 месяцев' }]} />
        {period !== '1' && <div style={{ textAlign: 'center', marginTop: 9 }}><Badge tone="success" icon="bolt">Выгода до {period === '3' ? '10' : '17'}%</Badge></div>}
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tariffs.map(t => {
          const on = t.id === sel;
          const price = Math.round(t.price * mult[period] / 1000) * 1000;
          return (
            <div key={t.id} onClick={() => setSel(t.id)} style={{
              position: 'relative', borderRadius: 22, padding: 18, cursor: 'pointer', overflow: 'hidden',
              background: on ? 'linear-gradient(135deg, #2A1E16, #1C1814)' : 'var(--surface)',
              boxShadow: on ? 'inset 0 0 0 2px var(--accent)' : 'inset 0 0 0 1px var(--line)', transition: 'all .15s',
            }}>
              {t.popular && <div style={{ position: 'absolute', top: 0, right: 0, padding: '5px 12px', borderRadius: '0 22px 0 12px', background: 'var(--gold)', color: '#2A1E0A', fontSize: 11, fontWeight: 800 }}>ПОПУЛЯРНЫЙ</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.id === 'ultra' ? 'var(--gold-soft)' : 'var(--accent-soft)', color: t.id === 'ultra' ? 'var(--gold)' : 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={t.id === 'ultra' ? 'crown' : t.id === 'max' ? 'bolt' : 'feed'} size={21} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{t.tagline}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', boxShadow: on ? 'none' : 'inset 0 0 0 2px var(--line-strong)', background: on ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{on && <Icon name="check" size={14} stroke={3} style={{ color: '#fff' }} />}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: 'var(--text)', lineHeight: 1, marginRight: 4 }}>{(price / 1000).toLocaleString('ru')}K</span>
                <span style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>сум / {period === '1' ? 'мес' : period + ' мес'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                <Badge tone="muted" icon="feed">{t.ads} объявл./мес</Badge>
                {t.coins > 0 ? <Badge tone="gold" icon="coins">+{t.coins} Coins</Badge> : <Badge tone="muted">Без Coins</Badge>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <Card style={{ padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-3)', marginBottom: 11 }}>СПОСОБ ОПЛАТЫ</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Payme', 'Click', 'Uzum', 'Octo'].map(p => <div key={p} style={{ flex: 1, textAlign: 'center', padding: '11px 4px', borderRadius: 11, background: 'var(--surface-2)', fontSize: 12.5, fontWeight: 700, color: 'var(--text-2)' }}>{p}</div>)}
          </div>
        </Card>
        <Btn size="lg" full icon="lock" onClick={() => nav.toast('Переход к оплате через Rahmat / Multicard')}>Оформить {tariffs.find(t => t.id === sel).name}</Btn>
        <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3)', marginTop: 12, lineHeight: 1.5 }}>Оплата через Rahmat / Multicard с поддержкой автоплатежей</p>
      </div>
      <BottomSpacer />
    </ScreenScroll>
  );
}

// ─── Coins wallet / Top boost / packs ───────────────────────
function BizCoins({ nav }) {
  const { topPeriods, adPacks } = window.DATA;
  return (
    <ScreenScroll>
      <Header title="Кошелёк" onBack={() => nav.pop()} />
      <div style={{ padding: '8px 18px' }}>
        {/* balance */}
        <div style={{ borderRadius: 22, padding: 22, marginBottom: 20, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #E9C672, #C9962F)' }}>
          <div style={{ position: 'absolute', right: -14, bottom: -14, opacity: 0.2 }}><Icon name="coins" size={120} style={{ color: '#3A2A08' }} /></div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'rgba(42,30,10,0.7)', letterSpacing: '0.04em' }}>БАЛАНС COINS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <Icon name="coins" size={32} style={{ color: '#3A2A08' }} />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 46, color: '#2A1E0A', lineHeight: 1 }}>240</span>
          </div>
          <Btn variant="dark" size="sm" icon="plus" style={{ marginTop: 16, background: 'rgba(42,30,10,0.85)', color: '#F4DFA6', boxShadow: 'none' }} onClick={() => nav.toast('Пополнение кошелька')}>Пополнить Coins</Btn>
        </div>

        <SectionTitle>Поднять объявление в Топ</SectionTitle>
        <p style={{ margin: '0 0 12px 2px', fontSize: 13, color: 'var(--text-3)', fontWeight: 500, lineHeight: 1.45 }}>Объявление показывается первым в своей категории при любой фильтрации.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
          {topPeriods.map(tp => (
            <div key={tp.days} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 15, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="crown" size={19} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 800 }}>{tp.days} {tp.days === 1 ? 'день' : tp.days < 5 ? 'дня' : 'дней'}</div></div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--gold)', fontWeight: 800, fontSize: 15 }}><Icon name="coins" size={15} fill />{tp.coins}</div>
              <Btn variant="dark" size="sm" onClick={() => nav.toast(`Топ на ${tp.days} дн. за ${tp.coins} Coins`)}>Купить</Btn>
            </div>
          ))}
        </div>

        <SectionTitle>Пакеты объявлений</SectionTitle>
        <p style={{ margin: '0 0 12px 2px', fontSize: 13, color: 'var(--text-3)', fontWeight: 500, lineHeight: 1.45 }}>Не сгорают в конце месяца. Расходуются после месячного лимита.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {adPacks.map(p => (
            <div key={p} onClick={() => nav.toast(`Пакет ${p} объявлений`)} style={{ borderRadius: 16, padding: 16, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: 'var(--text)', lineHeight: 1 }}>{p}</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, marginTop: 3 }}>объявлений</div>
            </div>
          ))}
        </div>
        <BottomSpacer h={40} />
      </div>
    </ScreenScroll>
  );
}

// ─── Business own profile ───────────────────────────────────
function BizProfile({ nav }) {
  const biz = window.DATA.businesses.bonjour;
  const bizAds = window.DATA.ads.filter(a => a.biz === biz.id);
  return (
    <ScreenScroll>
      <div style={{ position: 'relative', height: 152, background: `linear-gradient(120deg, ${biz.color}66, var(--bg))` }}>
        <div style={{ position: 'absolute', top: 68, right: 18 }}><IconBtn name="edit" onClick={() => nav.toast('Редактирование профиля')} style={{ background: 'rgba(12,11,10,0.5)' }} /></div>
      </div>
      <div style={{ padding: '0 18px', marginTop: -48, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 16 }}>
          <BizLogo biz={biz} size={82} />
          <div style={{ paddingBottom: 6 }}>
            <div style={{ fontSize: 21, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>{biz.name}<Icon name="checkCircle" size={17} style={{ color: 'var(--accent)' }} /></div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>{biz.cat}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
          <Badge tone="gold" icon="star">{biz.rating}</Badge>
          <Badge tone="muted" icon="pin">{biz.city}</Badge>
          <Badge tone="success" icon="deals">{biz.deals} сделок</Badge>
        </div>

        {/* subscription status card */}
        <div style={{ borderRadius: 18, padding: 16, marginBottom: 16, background: 'linear-gradient(120deg, #2A1E16, #1A1714)', boxShadow: 'inset 0 0 0 1px rgba(224,182,92,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700 }}>ТЕКУЩИЙ ТАРИФ</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}><Icon name="bolt" size={18} />Free Trial</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>Истекает через 2 дня</div>
            </div>
            <Btn variant="gold" size="sm" onClick={() => nav.tab('biz_subscription')}>Сменить</Btn>
          </div>
        </div>

        <SectionTitle>Описание компании</SectionTitle>
        <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.55 }}>{biz.desc}</p>

        <SectionTitle>Оценки от блогеров</SectionTitle>
        <Card style={{ marginBottom: 16 }}><CriteriaList items={bizAds[0].ratings} /></Card>

        <SectionTitle>Аккаунт</SectionTitle>
        <Card pad={6} style={{ marginBottom: 16 }}>
          <SettingRow icon="coins" label="Кошелёк и Coins" value="240" onClick={() => nav.push('biz_coins')} />
          <SettingRow icon="chart" label="Финансы и история" onClick={() => nav.toast('История платежей')} />
          <SettingRow icon="refresh" label="Переключиться на Блогера" onClick={() => nav.switchEnv('blogger')} accent />
          <SettingRow icon="logout" label="Выйти" onClick={() => nav.logout()} last danger />
        </Card>
        <BottomSpacer />
      </div>
    </ScreenScroll>
  );
}

Object.assign(window, { BizSubscription, BizCoins, BizProfile });
