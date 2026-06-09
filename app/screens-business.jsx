/* VIP Person — Business environment screens. */

// ─── Business home / my ads ─────────────────────────────────
function BizAds({ nav }) {
  const { ads } = window.DATA;
  const myAds = nav.bizAds;
  const statusMap = { active: { tone: 'success', label: 'Активное' }, moderation: { tone: 'gold', label: 'На модерации' }, inactive: { tone: 'muted', label: 'Неактивное' } };
  const totalResp = myAds.reduce((s, a) => s + a.responses, 0);
  return (
    <ScreenScroll>
      <Header large title="Объявления" sub="Bonjour Coffee"
        right={<IconBtn name="bell" badge={2} onClick={() => nav.push('biz_notifs')} />} />

      {/* Free trial banner */}
      <div style={{ padding: '0 18px 14px' }}>
        <div style={{ borderRadius: 18, padding: 16, position: 'relative', overflow: 'hidden', background: 'linear-gradient(120deg, #2A1E16, #1A1714)', boxShadow: 'inset 0 0 0 1px rgba(224,182,92,0.3)' }}>
          <div style={{ position: 'absolute', right: -12, top: -12, opacity: 0.12 }}><Icon name="crown" size={96} style={{ color: 'var(--gold)' }} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <Icon name="bolt" size={16} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.02em' }}>FREE TRIAL · 2 дня осталось</span>
          </div>
          <div style={{ fontSize: 14.5, color: 'var(--text-2)', fontWeight: 600, marginBottom: 13, lineHeight: 1.4 }}>Полный доступ к профилям блогеров. Использовано 4 из 10 объявлений.</div>
          <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 13 }}><div style={{ width: '40%', height: '100%', background: 'var(--gold)' }} /></div>
          <Btn variant="gold" size="sm" icon="crown" onClick={() => nav.tab('biz_subscription')}>Оформить подписку</Btn>
        </div>
      </div>

      {/* mini dashboard */}
      <div style={{ padding: '0 18px 16px', display: 'flex', gap: 10 }}>
        {[['Активных', myAds.filter(a => a.status === 'active').length, 'feed'], ['Откликов', totalResp, 'user'], ['Рейтинг', '9.4', 'star']].map(([l, v, ic]) => (
          <Card key={l} pad={13} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', display: 'flex', justifyContent: 'center', marginBottom: 6 }}><Icon name={ic} size={19} /></div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, lineHeight: 1, color: 'var(--text)' }}>{v}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-3)', fontWeight: 600, marginTop: 4 }}>{l}</div>
          </Card>
        ))}
      </div>

      <div style={{ padding: '0 18px' }}><SectionTitle>Мои объявления</SectionTitle></div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {myAds.map(ma => {
          const ad = ads.find(a => a.id === ma.adId);
          const st = statusMap[ma.status];
          return (
            <Card key={ma.adId} onClick={() => nav.push('biz_adManage', { adId: ma.adId })} pad={0} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 12, padding: 13 }}>
                <Placeholder label={ad.photo.split(' ')[0]} height={62} radius={12} style={{ width: 62, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <Badge tone={st.tone}>{st.label}</Badge>
                    {ma.top && <Badge tone="gold" icon="crown">ТОП</Badge>}
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="user" size={13} />{ma.responses} откликов</span>
                    <PayBadge pay={ad.pay} amount={ad.amount} />
                  </div>
                </div>
                <Icon name="next" size={16} style={{ color: 'var(--text-3)', alignSelf: 'center' }} />
              </div>
            </Card>
          );
        })}
      </div>
      <BottomSpacer />

      {/* FAB */}
      <button onClick={() => nav.push('biz_createAd')} style={{
        position: 'absolute', right: 22, bottom: 100, zIndex: 45, width: 58, height: 58, borderRadius: 19, border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg, #F0824E, #E0612F)', color: '#fff', boxShadow: '0 10px 26px rgba(216,94,48,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="plus" size={28} stroke={2.4} /></button>
    </ScreenScroll>
  );
}

// ─── Create ad ──────────────────────────────────────────────
function BizCreateAd({ nav }) {
  const [pay, setPay] = React.useState('Платно');
  const [content, setContent] = React.useState('Reels');
  const [audience, setAudience] = React.useState('Блогер');
  const [urgent, setUrgent] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const Chips = ({ opts, value, onChange }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {opts.map(o => { const on = o === value; return <button key={o} onClick={() => onChange(o)} style={{ padding: '10px 15px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, background: on ? 'var(--accent-soft)' : 'var(--surface)', color: on ? 'var(--accent)' : 'var(--text-2)', boxShadow: on ? 'inset 0 0 0 1.5px rgba(232,106,58,0.4)' : 'inset 0 0 0 1px var(--line)' }}>{o}</button>; })}
    </div>
  );
  const Lab = ({ children }) => <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', margin: '20px 2px 10px', letterSpacing: '0.01em' }}>{children}</div>;
  return (
    <ScreenScroll>
      <Header title="Новое объявление" onBack={() => nav.pop()} />
      <div style={{ padding: '6px 18px' }}>
        <Lab>Фото объявления</Lab>
        <div style={{ borderRadius: 16, height: 130, background: 'repeating-linear-gradient(135deg, #1E1A15 0 11px, #191510 11px 22px)', boxShadow: 'inset 0 0 0 1px var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, color: 'var(--text-3)', cursor: 'pointer' }} onClick={() => nav.toast('Загрузка фото')}>
          <Icon name="plus" size={26} /><span style={{ fontSize: 12.5, fontWeight: 700 }}>Загрузить изображение</span>
        </div>

        <Lab>Заголовок</Lab>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Напр. Reels к открытию нового зала" className="vp-input" />

        <Lab>Описание задачи</Lab>
        <textarea placeholder="Что снять, посыл, референсы…" className="vp-textarea" />

        <Lab>Тип сотрудничества</Lab>
        <Chips opts={['Платно', 'Бартер', 'Услуга']} value={pay} onChange={setPay} />

        {pay === 'Платно' && <>
          <Lab>Сумма вознаграждения</Lab>
          <div style={{ display: 'flex', gap: 10 }}>
            <input placeholder="800 000" className="vp-input" style={{ flex: 1 }} />
            <button onClick={() => nav.toast('Сумма: Договоримся')} style={{ padding: '0 16px', borderRadius: 13, border: 'none', cursor: 'pointer', background: 'var(--surface)', color: 'var(--text-2)', boxShadow: 'inset 0 0 0 1px var(--line)', fontFamily: 'inherit', fontWeight: 700, fontSize: 13.5, whiteSpace: 'nowrap' }}>Договоримся</button>
          </div>
        </>}

        <Lab>Тип контента</Lab>
        <Chips opts={['Пост', 'Reels', 'Stories']} value={content} onChange={setContent} />

        <Lab>Кого ищем</Lab>
        <Chips opts={['Блогер', 'UGC-креатор']} value={audience} onChange={setAudience} />

        <div style={{ marginTop: 26, marginBottom: 6 }}><SectionTitle>Критерии отбора блогеров</SectionTitle></div>
        <Card style={{ padding: '4px 16px' }}>
          <CritEdit icon="pin" label="Город" value="Ташкент" onClick={() => nav.toast('Выбор города')} />
          <CritEdit icon="user" label="Мин. подписчиков" value="5 000" onClick={() => nav.toast('Мин. подписчиков')} />
          <CritEdit icon="eye" label="Мин. охват" value="8 000" onClick={() => nav.toast('Мин. охват')} />
          <CritEdit icon="grid" label="Ниша" value="Lifestyle, Food" onClick={() => nav.toast('Выбор ниши')} />
          <CritEdit icon="heart" label="Пол" value="Не важно" onClick={() => nav.toast('Выбор пола')} last />
        </Card>

        <div onClick={() => setUrgent(!urgent)} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, padding: '14px 16px', borderRadius: 15, background: 'var(--surface)', boxShadow: 'inset 0 0 0 1px var(--line)', cursor: 'pointer' }}>
          <div style={{ color: 'var(--accent)' }}><Icon name="flame" size={20} /></div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 700 }}>Срочное объявление</div><div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>Пометка «Срочно» в ленте</div></div>
          <div style={{ width: 46, height: 28, borderRadius: 14, background: urgent ? 'var(--accent)' : 'var(--surface-2)', padding: 3, transition: 'background .2s', boxShadow: urgent ? 'none' : 'inset 0 0 0 1px var(--line)' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', transform: urgent ? 'translateX(18px)' : 'translateX(0)', transition: 'transform .2s' }} />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <Btn size="lg" full icon="send" onClick={() => { nav.toast('Объявление отправлено на модерацию'); nav.pop(); }}>Отправить на модерацию</Btn>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3)', marginTop: 12, lineHeight: 1.5 }}>Объявление появится в ленте после проверки модератором</p>
        <BottomSpacer h={24} />
      </div>
    </ScreenScroll>
  );
}

function CritEdit({ icon, label, value, onClick, last }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 0', cursor: 'pointer', borderBottom: last ? 'none' : '1px solid var(--line)' }}>
      <div style={{ color: 'var(--text-3)' }}><Icon name={icon} size={18} /></div>
      <span style={{ flex: 1, fontSize: 14, color: 'var(--text-2)', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 700 }}>{value}</span>
      <Icon name="next" size={15} style={{ color: 'var(--text-3)' }} />
    </div>
  );
}

// ─── Ad manage (responses) ──────────────────────────────────
function BizAdManage({ nav, params }) {
  const { ads, bloggers, responses } = window.DATA;
  const ad = ads.find(a => a.id === params.adId);
  const respIds = responses[params.adId] || ['madina'];
  return (
    <ScreenScroll>
      <Header title="Управление" sub={ad.title} onBack={() => nav.pop()}
        right={<IconBtn name="edit" onClick={() => nav.toast('Редактирование объявления')} />} />
      <div style={{ padding: '8px 18px' }}>
        <Card pad={0} style={{ overflow: 'hidden', marginBottom: 8 }}>
          <Placeholder label={ad.photo} height={120} radius={0} />
          <div style={{ padding: 14 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 9 }}><Badge tone="success">Активное</Badge>{ad.top && <Badge tone="gold" icon="crown">ТОП</Badge>}</div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>{ad.title}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <Btn variant="dark" size="sm" full icon="crown" onClick={() => nav.tab('biz_subscription')}>Поднять в Топ</Btn>
              <Btn variant="danger" size="sm" full icon="x" onClick={() => nav.toast('Объявление отменено')}>Отменить</Btn>
            </div>
          </div>
        </Card>

        <div style={{ margin: '18px 0 4px' }}><SectionTitle>Отклики · {respIds.length}</SectionTitle></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {respIds.map(id => {
            const b = bloggers[id];
            return (
              <Card key={id} onClick={() => nav.push('biz_bloggerProfile', { bloggerId: id })} pad={13}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={b.initials} color={b.color} size={48} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>{b.name}{b.penalty === 0 && <Icon name="shield" size={13} style={{ color: 'var(--success)' }} />}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 600 }}>{b.user} · {(b.followers / 1000).toFixed(1)}K</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 7 }}>
                      <Badge tone="gold" icon="star">{b.rating}</Badge>
                      <Badge tone="muted">{b.type}</Badge>
                    </div>
                  </div>
                  <Icon name="next" size={16} style={{ color: 'var(--text-3)' }} />
                </div>
              </Card>
            );
          })}
        </div>
        <BottomSpacer />
      </div>
    </ScreenScroll>
  );
}

// ─── Blogger profile (viewed by business) ───────────────────
function BizBloggerProfile({ nav, params }) {
  const b = window.DATA.bloggers[params.bloggerId];
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <div style={{ height: '100%', position: 'relative', background: 'var(--bg)' }}>
      <ScreenScroll>
        <div style={{ position: 'relative', height: 152, background: `linear-gradient(120deg, ${b.color}55, var(--bg))` }}>
          <div style={{ position: 'absolute', top: 68, left: 18 }}><IconBtn name="back" onClick={() => nav.pop()} style={{ background: 'rgba(12,11,10,0.5)' }} /></div>
        </div>
        <div style={{ padding: '0 18px', marginTop: -48 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 14 }}>
            <Avatar initials={b.initials} color={b.color} size={80} ring />
            <div style={{ paddingBottom: 6, flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 5 }}>{b.name}<Icon name="checkCircle" size={16} style={{ color: 'var(--gold)' }} /></div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>{b.user}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
            <Badge tone="accent" icon="instagram">{b.type}</Badge>
            <Badge tone="gold" icon="star">{b.rating}</Badge>
            <Badge tone="muted" icon="pin">{b.city}</Badge>
            <Badge tone={b.penalty === 0 ? 'success' : 'danger'} icon="shield">{b.penalty} штр.</Badge>
          </div>

          <Card pad={0} style={{ display: 'flex', marginBottom: 16 }}>
            <Stat label="Подписчиков" value={(b.followers / 1000).toFixed(1) + 'K'} />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat label="Сделок" value={b.deals} />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat label="Рейтинг" value={b.rating} accent />
          </Card>

          <SectionTitle>Охваты</SectionTitle>
          <Card pad={0} style={{ display: 'flex', marginBottom: 16 }}>
            <Stat label="Пост" value={b.reach.post ? (b.reach.post / 1000).toFixed(1) + 'K' : '—'} />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat label="Reels" value={b.reach.reels ? (b.reach.reels / 1000).toFixed(1) + 'K' : '—'} />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat label="Stories" value={b.reach.stories ? (b.reach.stories / 1000).toFixed(1) + 'K' : '—'} />
          </Card>

          <SectionTitle>Аудитория</SectionTitle>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', height: 36, borderRadius: 11, overflow: 'hidden' }}>
              <div style={{ width: `${b.audience.f}%`, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff' }}>♀ {b.audience.f}%</div>
              <div style={{ width: `${b.audience.m}%`, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'var(--text-2)' }}>♂ {b.audience.m}%</div>
            </div>
          </Card>

          <SectionTitle>Прайс</SectionTitle>
          <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
            <Field icon="instagram" label="Пост" value={b.price.post + ' сум'} />
            <div style={{ height: 1, background: 'var(--line)' }} />
            <Field icon="instagram" label="Reels" value={b.price.reels + ' сум'} />
          </Card>

          <SectionTitle>Портфолио</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
            {['Охваты', 'Reels', 'Работа', 'Работа', 'Работа'].map((p, i) => <Placeholder key={i} label={p} height={86} radius={12} />)}
          </div>

          <SectionTitle>Оценки от бизнесов</SectionTitle>
          <Card style={{ marginBottom: 16 }}><CriteriaList items={b.crit} /></Card>
          <SectionTitle>Отзывы</SectionTitle>
          <ReviewList reviews={b.reviews} />
          <BottomSpacer h={120} />
        </div>
      </ScreenScroll>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 18px 30px', background: 'linear-gradient(transparent, var(--bg) 22%)' }}>
        {confirmed
          ? <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--accent-soft)', boxShadow: 'inset 0 0 0 1px rgba(232,106,58,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="checkCircle" size={20} style={{ color: 'var(--accent)' }} /><span style={{ fontSize: 14, fontWeight: 800 }}>Контакты открыты</span></div>
              <Field icon="phone" label="Телефон" value="+998 90 123 45 67" />
              <Field icon="instagram" label="Instagram" value={b.user} />
              <Btn full icon="qr" onClick={() => nav.push('biz_scan', {})}>Сканировать QR прибытия</Btn>
            </Card>
          : <Btn size="lg" full icon="checkCircle" onClick={() => { setConfirmed(true); nav.toast('Блогер подтверждён · Контакты открыты'); }}>Подтвердить блогера</Btn>}
      </div>
    </div>
  );
}

// ─── Business deals ─────────────────────────────────────────
function BizDeals({ nav }) {
  const [tab, setTab] = React.useState('active');
  const deals = nav.bizDeals;
  const active = deals.filter(d => !['closed', 'moderation', 'done'].includes(d.status));
  const past = deals.filter(d => ['closed', 'moderation', 'done'].includes(d.status));
  const list = tab === 'active' ? active : past;
  return (
    <ScreenScroll>
      <Header large title="Сделки" sub={`${active.length} активных`} />
      <div style={{ padding: '4px 18px 14px' }}>
        <Segmented value={tab} onChange={setTab} options={[{ value: 'active', label: `Активные · ${active.length}` }, { value: 'past', label: `Архив · ${past.length}` }]} />
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(d => <DealRow key={d.id} deal={d} side="business" onClick={() => nav.push('biz_dealDetail', { dealId: d.id })} />)}
      </div>
      <BottomSpacer />
    </ScreenScroll>
  );
}

// ─── Business deal detail ───────────────────────────────────
function BizDealDetail({ nav, params }) {
  const { ads, bloggers, STATUS } = window.DATA;
  const deal = nav.bizDeals.find(d => d.id === params.dealId);
  const ad = ads.find(a => a.id === deal.adId);
  const b = bloggers[deal.blogger];
  const order = ['responded', 'awaiting', 'confirmed', 'arrived', 'working', 'review', 'done', 'closed'];
  const idx = order.indexOf(deal.status);
  return (
    <ScreenScroll>
      <Header title={b.name} sub={ad.title} onBack={() => nav.pop()} />
      <div style={{ padding: '8px 18px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }} onClick={() => nav.push('biz_bloggerProfile', { bloggerId: b.id })}>
          <Avatar initials={b.initials} color={b.color} size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800 }}>{b.name}</div>
            <div style={{ marginTop: 5 }}><Badge tone={STATUS[deal.status].tone}>{STATUS[deal.status].biz}</Badge></div>
          </div>
          <Rating value={b.rating} />
        </Card>

        <SectionTitle>Этапы сделки</SectionTitle>
        <Card style={{ marginBottom: 16 }}><StatusTimeline status={deal.status} side="business" /></Card>

        {idx >= order.indexOf('confirmed') && (
          <>
            <SectionTitle>Контакты блогера</SectionTitle>
            <Card style={{ marginBottom: 16, padding: '4px 16px' }}>
              <Field icon="phone" label="Телефон" value="+998 90 123 45 67" />
              <div style={{ height: 1, background: 'var(--line)' }} />
              <Field icon="instagram" label="Instagram" value={b.user} />
            </Card>
          </>
        )}

        {deal.status === 'awaiting' && <Btn size="lg" full icon="checkCircle" onClick={() => { nav.setBizStatus(deal.id, 'confirmed'); nav.toast('Блогер подтверждён · Контакты открыты'); }}>Подтвердить блогера</Btn>}
        {deal.status === 'confirmed' && <Btn size="lg" full icon="scan" onClick={() => nav.push('biz_scan', { dealId: deal.id })}>Сканировать QR прибытия</Btn>}
        {deal.status === 'working' && <Card style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13.5, fontWeight: 600 }}>Блогер выполняет задание. Ожидайте публикацию.</Card>}
        {deal.status === 'review' && <Btn size="lg" full icon="checkCircle" onClick={() => { nav.setBizStatus(deal.id, 'done'); nav.toast('Задание принято'); }}>Принять выполненное задание</Btn>}
        {deal.status === 'done' && <Btn size="lg" full variant="gold" icon="star" onClick={() => nav.push('biz_review', { dealId: deal.id })}>Оставить отзыв о блогере</Btn>}
        <BottomSpacer h={40} />
      </div>
    </ScreenScroll>
  );
}

// ─── QR scanner ─────────────────────────────────────────────
function BizScan({ nav, params }) {
  const [scanning, setScanning] = React.useState(true);
  return (
    <div style={{ height: '100%', background: '#080706', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 58, paddingLeft: 18, paddingRight: 18, display: 'flex', alignItems: 'center', gap: 12, zIndex: 5 }}>
        <IconBtn name="back" onClick={() => nav.pop()} style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 800 }}>Сканер QR</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <div style={{ position: 'relative', width: 250, height: 250, borderRadius: 28, background: 'repeating-linear-gradient(135deg, #14110d 0 14px, #100e0b 14px 28px)', overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}>
          {/* corners */}
          {[[0, 0, '14px 0 0 0', 'top left'], [1, 0, '0 14px 0 0', 'top right'], [0, 1, '0 0 0 14px', 'bottom left'], [1, 1, '0 0 14px 0', 'bottom right']].map((c, i) => (
            <div key={i} style={{ position: 'absolute', [i < 2 ? 'top' : 'bottom']: 16, [i % 2 ? 'right' : 'left']: 16, width: 34, height: 34, border: '3px solid var(--accent)', borderRadius: c[2], ...(i < 2 ? { borderBottom: 'none' } : { borderTop: 'none' }), ...(i % 2 ? { borderLeft: 'none' } : { borderRight: 'none' }) }} />
          ))}
          {scanning && <div className="vp-scanline" style={{ position: 'absolute', left: 16, right: 16, height: 2, background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', boxShadow: '0 0 12px var(--accent)' }} />}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, fontWeight: 600, marginTop: 24, textAlign: 'center', maxWidth: 250, lineHeight: 1.45 }}>Наведите камеру на QR-код блогера для подтверждения прибытия</div>
      </div>
      <div style={{ padding: '0 24px 44px' }}>
        <Btn size="lg" full icon="checkCircle" onClick={() => {
          setScanning(false);
          if (params.dealId) nav.setBizStatus(params.dealId, 'arrived');
          nav.toast('QR верифицирован · Прибытие подтверждено');
          setTimeout(() => nav.pop(), 400);
        }}>Симулировать сканирование</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { BizAds, BizCreateAd, BizAdManage, BizBloggerProfile, BizDeals, BizDealDetail, BizScan, CritEdit });
