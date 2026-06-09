/* VIP Person — Blogger environment screens. */

// ─── Feed ───────────────────────────────────────────────────
function BFeed({ nav }) {
  const { ads } = window.DATA;
  const [sort, setSort] = React.useState('new');
  const [filters, setFilters] = React.useState(false);
  const sorted = [...ads].sort((a, b) => b.top - a.top);
  return (
    <ScreenScroll>
      <Header large title="Лента" sub="Подобрано под ваш профиль"
        right={<div style={{ display: 'flex', gap: 8 }}>
          <IconBtn name="search" onClick={() => nav.toast('Поиск бизнесов')} />
          <IconBtn name="sliders" active={false} onClick={() => setFilters(true)} />
        </div>} />

      <div style={{ marginBottom: 14 }}><BannerCarousel /></div>

      <div style={{ padding: '0 18px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, display: 'flex', gap: 7, overflowX: 'auto' }} className="vp-scroll">
          {[['new', 'Новые'], ['rating', 'По рейтингу'], ['amount', 'По сумме']].map(([k, l]) => (
            <button key={k} onClick={() => setSort(k)} style={{
              padding: '8px 14px', borderRadius: 11, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
              background: sort === k ? 'var(--accent)' : 'var(--surface)', color: sort === k ? '#fff' : 'var(--text-2)', boxShadow: sort === k ? 'none' : 'inset 0 0 0 1px var(--line)',
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <AdCard ad={sorted[0]} onClick={() => nav.push('b_adDetail', { adId: sorted[0].id })} />
        <AdCard ad={sorted[1]} onClick={() => nav.push('b_adDetail', { adId: sorted[1].id })} />
        <FeedAdSlot />
        {sorted.slice(2).map(a => <AdCard key={a.id} ad={a} onClick={() => nav.push('b_adDetail', { adId: a.id })} />)}
      </div>
      <BottomSpacer />

      <Sheet open={filters} onClose={() => setFilters(false)} title="Фильтры">
        <FilterBody onApply={() => { setFilters(false); nav.toast('Фильтры применены'); }} />
      </Sheet>
    </ScreenScroll>
  );
}

function FilterBody({ onApply }) {
  const [pay, setPay] = React.useState('all');
  const [content, setContent] = React.useState('all');
  const [city, setCity] = React.useState('Ташкент');
  const { CITIES } = window.DATA;
  const Group = ({ label, children }) => (
    <div style={{ marginBottom: 18 }}><div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-3)', marginBottom: 9, letterSpacing: '0.01em' }}>{label}</div>{children}</div>
  );
  const Chips = ({ opts, value, onChange }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {opts.map(([k, l]) => {
        const on = k === value;
        return <button key={k} onClick={() => onChange(k)} style={{ padding: '9px 14px', borderRadius: 11, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, background: on ? 'var(--accent-soft)' : 'var(--surface)', color: on ? 'var(--accent)' : 'var(--text-2)', boxShadow: on ? 'inset 0 0 0 1.5px rgba(232,106,58,0.4)' : 'inset 0 0 0 1px var(--line)' }}>{l}</button>;
      })}
    </div>
  );
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16, padding: '10px 13px', borderRadius: 12, background: 'var(--accent-soft)' }}>
        <Icon name="bolt" size={16} style={{ color: 'var(--accent)' }} />
        <span style={{ fontSize: 12.5, color: 'var(--text-2)', fontWeight: 600 }}>Автофильтры из профиля уже применены</span>
      </div>
      <Group label="Тип сотрудничества"><Chips opts={[['all', 'Все'], ['Платно', 'Платно'], ['Бартер', 'Бартер'], ['Услуга', 'Услуга']]} value={pay} onChange={setPay} /></Group>
      <Group label="Тип контента"><Chips opts={[['all', 'Любой'], ['Пост', 'Пост'], ['Reels', 'Reels'], ['Stories', 'Stories']]} value={content} onChange={setContent} /></Group>
      <Group label="Город"><Chips opts={CITIES.slice(0, 4).map(c => [c, c])} value={city} onChange={setCity} /></Group>
      <Group label="Сумма вознаграждения">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, padding: '12px 14px', borderRadius: 12, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)', fontSize: 14, color: 'var(--text-2)', fontWeight: 600 }}>от 500K</div>
          <div style={{ color: 'var(--text-3)' }}>—</div>
          <div style={{ flex: 1, padding: '12px 14px', borderRadius: 12, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)', fontSize: 14, color: 'var(--text-2)', fontWeight: 600 }}>до 2 млн</div>
        </div>
      </Group>
      <Btn size="lg" full onClick={onApply}>Показать объявления</Btn>
    </div>
  );
}

// ─── Ad detail ──────────────────────────────────────────────
function BAdDetail({ nav, params }) {
  const { ads, businesses } = window.DATA;
  const ad = ads.find(a => a.id === params.adId);
  const biz = businesses[ad.biz];
  const [responded, setResponded] = React.useState(false);
  const Crit = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: '1px solid var(--line)' }}>
      <div style={{ color: 'var(--text-3)' }}><Icon name={icon} size={18} /></div>
      <span style={{ flex: 1, fontSize: 13.5, color: 'var(--text-2)', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 700 }}>{value}</span>
    </div>
  );
  return (
    <div style={{ height: '100%', position: 'relative', background: 'var(--bg)' }}>
      <ScreenScroll>
        <div style={{ position: 'relative' }}>
          <Placeholder label={ad.photo} height={230} radius={0} />
          <div style={{ position: 'absolute', top: 68, left: 18, right: 18, display: 'flex', justifyContent: 'space-between' }}>
            <IconBtn name="back" onClick={() => nav.pop()} style={{ background: 'rgba(12,11,10,0.6)', backdropFilter: 'blur(8px)' }} />
            <IconBtn name="share" onClick={() => nav.toast('Ссылка скопирована')} style={{ background: 'rgba(12,11,10,0.6)', backdropFilter: 'blur(8px)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 12, left: 18, display: 'flex', gap: 6 }}>
            {ad.top && <Badge tone="gold" icon="crown" solid>ТОП</Badge>}
            {ad.urgent && <Badge tone="accent" icon="flame" solid>Срочно</Badge>}
          </div>
        </div>

        <div style={{ padding: '16px 18px 0' }}>
          <Card onClick={() => nav.push('b_bizProfile', { bizId: biz.id })} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <BizLogo biz={biz} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 5 }}>{biz.name}{biz.verified && <Icon name="checkCircle" size={14} style={{ color: 'var(--accent)' }} />}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600 }}>{biz.cat} · {biz.city}</div>
            </div>
            <Rating value={biz.rating} />
            <Icon name="next" size={16} style={{ color: 'var(--text-3)' }} />
          </Card>

          <h1 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.18 }}>{ad.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
            <PayBadge pay={ad.pay} amount={ad.amount} />
            <Badge tone="muted" icon="instagram">{ad.content}</Badge>
            <Badge tone="muted" icon="user">{ad.audience}</Badge>
            <Badge tone="muted" icon="clock">до {ad.deadline}</Badge>
          </div>

          <SectionTitle>Описание задачи</SectionTitle>
          <p style={{ margin: '0 0 22px', fontSize: 14.5, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.55 }}>{ad.desc}</p>

          <SectionTitle>Критерии отбора</SectionTitle>
          <Card style={{ marginBottom: 22, padding: '4px 16px' }}>
            <Crit icon="pin" label="Город / локация" value={ad.crit.city} />
            <Crit icon="user" label="Мин. подписчиков" value={ad.crit.minFollowers ? ad.crit.minFollowers.toLocaleString('ru') : '—'} />
            <Crit icon="eye" label="Мин. охват" value={ad.crit.reach ? ad.crit.reach.toLocaleString('ru') : '—'} />
            <Crit icon="grid" label="Ниша" value={ad.crit.niche} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0' }}>
              <div style={{ color: 'var(--text-3)' }}><Icon name="heart" size={18} /></div>
              <span style={{ flex: 1, fontSize: 13.5, color: 'var(--text-2)', fontWeight: 600 }}>Пол</span>
              <span style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 700 }}>{ad.crit.gender}</span>
            </div>
          </Card>

          <SectionTitle>Репутация объявления</SectionTitle>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 42, color: 'var(--gold)', lineHeight: 1 }}>{biz.rating.toFixed(1)}</div>
              <div>
                <Rating value={biz.rating} showNum={false} size={15} />
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600, marginTop: 3 }}>{biz.deals} завершённых сделок</div>
              </div>
            </div>
            <CriteriaList items={ad.ratings} />
          </Card>
          <div style={{ marginBottom: 8 }}><SectionTitle>Анонимные отзывы блогеров</SectionTitle></div>
          <ReviewList reviews={ad.reviews} />
          <BottomSpacer h={120} />
        </div>
      </ScreenScroll>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 18px 30px', background: 'linear-gradient(transparent, var(--bg) 22%)' }}>
        {responded
          ? <Btn size="lg" full variant="dark" icon="checkCircle" onClick={() => nav.tab('b_deals')}>Отклик отправлен · К сделкам</Btn>
          : <Btn size="lg" full icon="send" onClick={() => { setResponded(true); nav.addDeal(ad.id); nav.toast('Отклик отправлен компании'); }}>Откликнуться</Btn>}
      </div>
    </div>
  );
}

// ─── Deals list ─────────────────────────────────────────────
function BDeals({ nav }) {
  const [tab, setTab] = React.useState('active');
  const deals = nav.deals;
  const active = deals.filter(d => !['closed', 'moderation', 'done'].includes(d.status));
  const past = deals.filter(d => ['closed', 'moderation', 'done'].includes(d.status));
  const list = tab === 'active' ? active : past;
  return (
    <ScreenScroll>
      <Header large title="Мои сделки" sub={`${active.length} активных`} />
      <div style={{ padding: '4px 18px 14px' }}>
        <Segmented value={tab} onChange={setTab} options={[{ value: 'active', label: `Активные · ${active.length}` }, { value: 'past', label: `Архив · ${past.length}` }]} />
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0
          ? <EmptyState icon="deals" title="Здесь пусто" text="Откликайтесь на объявления в ленте — сделки появятся тут." />
          : list.map(d => <DealRow key={d.id} deal={d} side="blogger" onClick={() => nav.push('b_dealDetail', { dealId: d.id })} />)}
      </div>
      <BottomSpacer />
    </ScreenScroll>
  );
}

// ─── Deal detail (blogger) ──────────────────────────────────
function BDealDetail({ nav, params }) {
  const { ads, businesses, STATUS } = window.DATA;
  const deal = nav.deals.find(d => d.id === params.dealId);
  const ad = ads.find(a => a.id === deal.adId);
  const biz = businesses[deal.biz];
  const order = ['responded', 'awaiting', 'confirmed', 'arrived', 'working', 'review', 'done', 'closed'];
  const idx = order.indexOf(deal.status);
  const contactsOpen = idx >= order.indexOf('confirmed');
  return (
    <ScreenScroll>
      <Header title={biz.name} sub={ad.title} onBack={() => nav.pop()} />
      <div style={{ padding: '8px 18px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }} onClick={() => nav.push('b_bizProfile', { bizId: biz.id })}>
          <BizLogo biz={biz} size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 5 }}>{biz.name}{biz.verified && <Icon name="checkCircle" size={14} style={{ color: 'var(--accent)' }} />}</div>
            <div style={{ marginTop: 5 }}><Badge tone={STATUS[deal.status].tone}>{STATUS[deal.status].blog}</Badge></div>
          </div>
          <Rating value={biz.rating} />
        </Card>

        <SectionTitle>Этапы сделки</SectionTitle>
        <Card style={{ marginBottom: 16 }}><StatusTimeline status={deal.status} side="blogger" /></Card>

        {contactsOpen && (
          <>
            <SectionTitle>Контакты бизнеса</SectionTitle>
            <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
              <Field icon="phone" label="Телефон" value="+998 71 200 40 60" />
              <div style={{ height: 1, background: 'var(--line)' }} />
              <Field icon="mail" label="Email" value="hello@bonjour.uz" />
              <div style={{ height: 1, background: 'var(--line)' }} />
              <Field icon="pin" label="Адрес" value="Ташкент, Амира Темура 15" />
            </Card>
          </>
        )}

        {/* Contextual actions */}
        {deal.status === 'confirmed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Card style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--accent-soft)', boxShadow: 'inset 0 0 0 1px rgba(232,106,58,0.3)' }}>
              <Icon name="qr" size={26} style={{ color: 'var(--accent)' }} />
              <div style={{ flex: 1, fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}>На месте покажите QR — бизнес отсканирует его для подтверждения прибытия</div>
            </Card>
            <Btn size="lg" full icon="qr" onClick={() => nav.push('b_qr', { dealId: deal.id })}>Показать QR-код</Btn>
          </div>
        )}
        {deal.status === 'review' && <Btn size="lg" full icon="send" onClick={() => { nav.setStatus(deal.id, 'done'); nav.toast('Ссылка на публикацию отправлена'); }}>Прикрепить ссылку на публикацию</Btn>}
        {deal.status === 'done' && <Btn size="lg" full variant="gold" icon="star" onClick={() => nav.push('b_review', { dealId: deal.id })}>Оставить отзыв об объявлении</Btn>}
        {deal.status === 'responded' && <Card style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13.5, fontWeight: 600 }}>Ожидаем, пока компания рассмотрит ваш отклик</Card>}
        {deal.status === 'moderation' && <Card style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13.5, fontWeight: 600 }}>Ваш отзыв проверяется модератором</Card>}
        <BottomSpacer h={40} />
      </div>
    </ScreenScroll>
  );
}

// ─── QR screen ──────────────────────────────────────────────
function QRMatrix({ seed = 7, size = 188 }) {
  const n = 21;
  const cells = [];
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s / 0x7fffffff); };
  const finder = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    let on;
    if (finder(r, c)) {
      const lr = r % (n - 7 > r ? n : n - 7);
      const rr = r < 7 ? r : r - (n - 7); const cc = c < 7 ? c : c - (n - 7);
      on = (rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4));
    } else on = rand() > 0.5;
    if (on) cells.push(<rect key={r + '-' + c} x={c} y={r} width="1" height="1" fill="#0C0B0A" />);
  }
  return <svg width={size} height={size} viewBox="0 0 21 21" shapeRendering="crispEdges">{cells}</svg>;
}

function BQR({ nav, params }) {
  const [sec, setSec] = React.useState(180);
  const [seed, setSeed] = React.useState(7);
  React.useEffect(() => { const t = setInterval(() => setSec(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(t); }, [seed]);
  const mm = String(Math.floor(sec / 60)).padStart(1, '0'); const ss = String(sec % 60).padStart(2, '0');
  const expired = sec === 0;
  return (
    <ScreenScroll>
      <Header title="QR подтверждения" onBack={() => nav.pop()} />
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>Покажите код бизнесу</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', fontWeight: 500, marginTop: 5, lineHeight: 1.45, maxWidth: 280 }}>Одноразовый код, привязан к этой сделке. Бизнес сканирует его на месте.</div>
        </div>

        <div style={{ position: 'relative', padding: 22, borderRadius: 26, background: '#F6F0E6', boxShadow: '0 20px 50px rgba(0,0,0,0.45)', opacity: expired ? 0.35 : 1, transition: 'opacity .3s' }}>
          <QRMatrix seed={seed} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: 12, background: '#F6F0E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoMark size={34} radius={10} />
          </div>
        </div>

        {expired
          ? <Btn size="lg" icon="refresh" style={{ marginTop: 22 }} onClick={() => { setSeed(s => s + 5); setSec(180); }}>Сгенерировать новый</Btn>
          : <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 9, padding: '11px 18px', borderRadius: 13, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
              <Icon name="clock" size={18} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)' }}>Действует ещё</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{mm}:{ss}</span>
            </div>}

        <div style={{ marginTop: 26, width: '100%', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[['lock', 'Зашифрованный токен: deal + blogger + подпись'], ['clock', 'Срок жизни 3 минуты, затем устаревает'], ['shield', 'Скриншот бесполезен — код одноразовый']].map(([ic, t]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600 }}>
              <Icon name={ic} size={16} style={{ color: 'var(--text-2)' }} />{t}
            </div>
          ))}
        </div>
        {/* simulate scan */}
        <Btn variant="ghost" size="md" style={{ marginTop: 22 }} icon="checkCircle" onClick={() => { nav.setStatus(params.dealId, 'working'); nav.toast('Прибытие подтверждено · Статус: В работе'); nav.pop(); }}>Симулировать сканирование</Btn>
        <BottomSpacer h={30} />
      </div>
    </ScreenScroll>
  );
}

// ─── Blogger own profile ────────────────────────────────────
function BProfile({ nav }) {
  const b = window.DATA.bloggers.madina;
  return (
    <ScreenScroll>
      <div style={{ position: 'relative', height: 152, background: 'linear-gradient(120deg, #2A1E16, #1A1714)' }}>
        <div style={{ position: 'absolute', top: 68, right: 18, display: 'flex', gap: 8 }}>
          <IconBtn name="edit" onClick={() => nav.toast('Редактирование профиля')} style={{ background: 'rgba(12,11,10,0.5)' }} />
          <IconBtn name="sliders" onClick={() => nav.toast('Настройки фильтров')} style={{ background: 'rgba(12,11,10,0.5)' }} />
        </div>
      </div>
      <div style={{ padding: '0 18px', marginTop: -48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 16 }}>
          <Avatar initials={b.initials} color={b.color} size={84} ring />
          <div style={{ paddingBottom: 6 }}>
            <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>{b.name}<Icon name="checkCircle" size={17} style={{ color: 'var(--gold)' }} /></div>
            <div style={{ fontSize: 13.5, color: 'var(--text-3)', fontWeight: 600 }}>{b.user}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
          <Badge tone="accent" icon="instagram">{b.type}</Badge>
          <Badge tone="gold" icon="star">{b.rating} рейтинг</Badge>
          <Badge tone="muted" icon="pin">{b.city}</Badge>
        </div>

        <Card pad={0} style={{ display: 'flex', marginBottom: 16 }}>
          <Stat label="Подписчиков" value={(b.followers / 1000).toFixed(1) + 'K'} />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat label="Сделок" value={b.deals} />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat label="Рейтинг" value={b.rating} accent />
        </Card>

        <SectionTitle>Средние охваты</SectionTitle>
        <Card pad={0} style={{ display: 'flex', marginBottom: 16 }}>
          <Stat label="Пост" value={(b.reach.post / 1000).toFixed(1) + 'K'} />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat label="Reels" value={(b.reach.reels / 1000).toFixed(1) + 'K'} />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat label="Stories" value={(b.reach.stories / 1000).toFixed(1) + 'K'} />
        </Card>

        <SectionTitle>Прайс</SectionTitle>
        <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
          <Field icon="instagram" label="Пост" value={b.price.post + ' сум'} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <Field icon="instagram" label="Reels" value={b.price.reels + ' сум'} />
          <div style={{ height: 1, background: 'var(--line)' }} />
          <Field icon="instagram" label="Stories" value={b.price.stories + ' сум'} />
        </Card>

        <SectionTitle>Портфолио · скриншоты статистики</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {['Охваты', 'Reels', 'Stories', 'Работа 1', 'Работа 2'].map((p, i) => <Placeholder key={i} label={p} height={86} radius={12} />)}
          <div style={{ borderRadius: 12, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', gap: 4 }}>
            <Icon name="plus" size={22} /><span style={{ fontSize: 11, fontWeight: 700 }}>Добавить</span>
          </div>
        </div>

        <SectionTitle>Оценки от бизнесов</SectionTitle>
        <Card style={{ marginBottom: 16 }}><CriteriaList items={b.crit} /></Card>

        <SectionTitle>Аккаунт</SectionTitle>
        <Card pad={6} style={{ marginBottom: 16 }}>
          <SettingRow icon="refresh" label="Переключиться на Бизнес" onClick={() => nav.switchEnv('business')} accent />
          <SettingRow icon="heart" label="Мои подписки на бизнесы" onClick={() => nav.toast('Список подписок')} />
          <SettingRow icon="shield" label="Штрафные баллы" value={`${b.penalty} / 10`} onClick={() => nav.toast('Штрафные баллы: 0. Аккаунт в порядке.')} />
          <SettingRow icon="logout" label="Выйти" onClick={() => nav.logout()} last danger />
        </Card>
        <BottomSpacer />
      </div>
    </ScreenScroll>
  );
}

function SettingRow({ icon, label, value, onClick, last, accent, danger }) {
  const color = danger ? '#E5635B' : accent ? 'var(--accent)' : 'var(--text)';
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 12px', cursor: 'pointer', borderBottom: last ? 'none' : '1px solid var(--line)' }}>
      <div style={{ color: danger ? '#E5635B' : accent ? 'var(--accent)' : 'var(--text-3)' }}><Icon name={icon} size={19} /></div>
      <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600, color }}>{label}</span>
      {value && <span style={{ fontSize: 13.5, color: 'var(--text-3)', fontWeight: 700 }}>{value}</span>}
      {!danger && <Icon name="next" size={15} style={{ color: 'var(--text-3)' }} />}
    </div>
  );
}

// ─── Business profile (viewed by blogger) ───────────────────
function BBizProfile({ nav, params }) {
  const biz = window.DATA.businesses[params.bizId];
  const bizAds = window.DATA.ads.filter(a => a.biz === biz.id);
  const [sub, setSub] = React.useState(false);
  return (
    <ScreenScroll>
      <div style={{ position: 'relative', height: 152, background: `linear-gradient(120deg, ${biz.color}55, var(--bg))` }}>
        <div style={{ position: 'absolute', top: 68, left: 18 }}><IconBtn name="back" onClick={() => nav.pop()} style={{ background: 'rgba(12,11,10,0.5)' }} /></div>
      </div>
      <div style={{ padding: '0 18px', marginTop: -48 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 14 }}>
          <BizLogo biz={biz} size={80} />
          <div style={{ paddingBottom: 6, flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 5 }}>{biz.name}{biz.verified && <Icon name="checkCircle" size={16} style={{ color: 'var(--accent)' }} />}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>{biz.cat}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
          <Badge tone="gold" icon="star">{biz.rating}</Badge>
          <Badge tone="muted" icon="pin">{biz.city}</Badge>
          <Badge tone="muted" icon="deals">{biz.deals} сделок</Badge>
        </div>
        <Btn full variant={sub ? 'dark' : 'primary'} icon={sub ? 'checkCircle' : 'heart'} onClick={() => { setSub(!sub); nav.toast(sub ? 'Вы отписались' : 'Вы подписались на бизнес'); }} style={{ marginBottom: 18 }}>
          {sub ? 'Вы подписаны' : 'Подписаться на бизнес'}
        </Btn>

        <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.55 }}>{biz.desc}</p>

        <SectionTitle>Активные объявления</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {bizAds.map(a => <AdCard key={a.id} ad={a} compact onClick={() => nav.push('b_adDetail', { adId: a.id })} />)}
        </div>
        <SectionTitle>Отзывы блогеров</SectionTitle>
        <ReviewList reviews={bizAds[0]?.reviews || []} />
        <BottomSpacer />
      </div>
    </ScreenScroll>
  );
}

function EmptyState({ icon, title, text }) {
  return (
    <div style={{ padding: '50px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', boxShadow: 'inset 0 0 0 1px var(--line)' }}><Icon name={icon} size={28} /></div>
      <div style={{ fontSize: 16, fontWeight: 800 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--text-3)', fontWeight: 500, lineHeight: 1.45, maxWidth: 240 }}>{text}</div>
    </div>
  );
}

Object.assign(window, { BFeed, BAdDetail, BDeals, BDealDetail, BQR, BProfile, BBizProfile, SettingRow, EmptyState });
