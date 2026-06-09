/* VIP Person — mock data. Plain JS, assigns to window.DATA. */
(function () {
  const CATEGORIES = [
    'Кафе и рестораны', 'Магазины одежды', 'Клиники', 'Салоны красоты',
    'Учебные центры', 'Маркетплейсы', 'Аптеки', 'Event-агентства',
  ];
  const CITIES = ['Ташкент', 'Самарканд', 'Бухара', 'Андижан', 'Фергана', 'Наманган'];

  // 7 rating criteria
  const BIZ_CRIT = ['Приятное общение', 'Чёткое ТЗ', 'Оплата вовремя', 'Уважение к работе', 'Гибкие условия', 'Быстрый отклик', 'Честные условия'];
  const BLOG_CRIT = ['Приятное общение', 'Выполнил в срок', 'Качественный контент', 'Креативный подход', 'Пунктуальность', 'Активная аудитория', 'Профессионализм'];

  // ── Businesses ───────────────────────────────────────────
  const businesses = {
    bonjour: { id: 'bonjour', name: 'Bonjour Coffee', cat: 'Кафе и рестораны', city: 'Ташкент', color: '#C2643A', initials: 'BC', rating: 9.4, deals: 38, verified: true, desc: 'Сеть авторских кофеен в центре Ташкента. Третья волна кофе, сезонное меню и уютная атмосфера.', followers: 1240 },
    plov:    { id: 'plov',    name: 'Plov Bar',      cat: 'Кафе и рестораны', city: 'Ташкент', color: '#A8762E', initials: 'PB', rating: 9.1, deals: 52, verified: true, desc: 'Современный ресторан национальной кухни. 6 филиалов по городу.', followers: 2890 },
    lola:    { id: 'lola',    name: 'Lola Fashion',  cat: 'Магазины одежды', city: 'Самарканд', color: '#9C5566', initials: 'LF', rating: 8.7, deals: 21, verified: true, desc: 'Локальный бренд женской одежды. Капсульные коллекции каждый сезон.', followers: 760 },
    glow:    { id: 'glow',    name: 'GlowUp Beauty', cat: 'Салоны красоты', city: 'Ташкент', color: '#B0567E', initials: 'GU', rating: 9.6, deals: 44, verified: true, desc: 'Премиальная сеть бьюти-студий. Уход, макияж, бровист, ногтевой сервис.', followers: 3120 },
    medline: { id: 'medline', name: 'MedLine Clinic', cat: 'Клиники', city: 'Ташкент', color: '#3E7E86', initials: 'ML', rating: 8.9, deals: 17, verified: true, desc: 'Многопрофильный медицинский центр. Современное оборудование, врачи высшей категории.', followers: 540 },
  };

  // ── Ads (business posts → blogger feed) ──────────────────
  const ads = [
    {
      id: 'ad1', biz: 'bonjour', title: 'Reels к открытию нового зала',
      desc: 'Снять атмосферный Reels на открытии второго зала: интерьер, напитки, лёгкая дегустация. Нужен живой, тёплый контент в вашем стиле.',
      pay: 'Платно', amount: 800000, content: 'Reels', audience: 'Блогер',
      deadline: '20 июня', urgent: true, top: true,
      crit: { city: 'Ташкент', minFollowers: 5000, niche: 'Lifestyle / Food', gender: 'Не важно', reach: 8000 },
      photo: 'Интерьер кофейни',
      ratings: [['Приятное общение', 12], ['Чёткое ТЗ', 9], ['Оплата вовремя', 11]],
      reviews: ['Всё чётко, оплатили в день съёмки. Приятная команда.', 'Дали свободу в кадре, не диктовали. Рекомендую.'],
    },
    {
      id: 'ad2', biz: 'plov', title: 'Пост-дегустация сезонного меню',
      desc: 'Приглашаем на дегустацию нового сезонного меню. Нужен пост в ленте с честным отзывом и качественными фото блюд.',
      pay: 'Платно', amount: 1200000, content: 'Пост', audience: 'Блогер',
      deadline: '25 июня', urgent: false, top: false,
      crit: { city: 'Ташкент', minFollowers: 10000, niche: 'Food / Lifestyle', gender: 'Не важно', reach: 15000 },
      photo: 'Блюда ресторана',
      ratings: [['Приятное общение', 18], ['Оплата вовремя', 15], ['Уважение к работе', 14]],
      reviews: ['Большой стол, всё угостили. Оплата без задержек.', 'Чёткое ТЗ, прислали референсы заранее.'],
    },
    {
      id: 'ad3', biz: 'lola', title: 'UGC-съёмка летней коллекции',
      desc: 'Ищем UGC-креатора для съёмки лукбука летней капсулы. 5–7 образов, фото + короткие видео для нашей страницы.',
      pay: 'Бартер', amount: 0, content: 'Reels', audience: 'UGC',
      deadline: '18 июня', urgent: false, top: true,
      crit: { city: 'Самарканд', minFollowers: 0, niche: 'Fashion', gender: 'Женский', reach: 0 },
      photo: 'Образы коллекции',
      ratings: [['Креативный подход', 7], ['Чёткое ТЗ', 6]],
      reviews: ['Отдали вещи в подарок + гонорар. Приятно работать.'],
    },
    {
      id: 'ad4', biz: 'medline', title: 'Stories ко Дню открытых дверей',
      desc: 'Серия Stories о Дне открытых дверей клиники: атмосфера, бесплатные консультации, розыгрыш чек-апа.',
      pay: 'Услуга', amount: 0, content: 'Stories', audience: 'Блогер',
      deadline: '22 июня', urgent: true, top: false,
      crit: { city: 'Ташкент', minFollowers: 8000, niche: 'Lifestyle / Family', gender: 'Не важно', reach: 6000 },
      photo: 'Холл клиники',
      ratings: [['Приятное общение', 5], ['Честные условия', 4]],
      reviews: ['Дали бесплатный чек-ап как услугу. Всё прозрачно.'],
    },
    {
      id: 'ad5', biz: 'glow', title: 'Reels: промо новой линейки ухода',
      desc: 'Премьера новой линейки ухода. Нужен эстетичный Reels с распаковкой и процедурой в студии.',
      pay: 'Платно', amount: 900000, content: 'Reels', audience: 'Блогер',
      deadline: '28 июня', urgent: false, top: false,
      crit: { city: 'Ташкент', minFollowers: 7000, niche: 'Beauty / Lifestyle', gender: 'Женский', reach: 10000 },
      photo: 'Линейка ухода',
      ratings: [['Качественный контент', 10], ['Оплата вовремя', 9], ['Приятное общение', 11]],
      reviews: ['Студия топ, процедуру сделали бесплатно + гонорар.', 'Очень довольна, всё на высшем уровне.'],
    },
  ];

  // ── Bloggers (for business browsing / responses) ─────────
  const bloggers = {
    madina: {
      id: 'madina', name: 'Madина Каримова', user: '@madina.life', initials: 'MK', color: '#B0567E',
      type: 'Блогер', followers: 24300, city: 'Ташкент', niche: ['Lifestyle', 'Food'],
      reach: { post: 9200, reels: 18400, stories: 6100 },
      price: { post: '500–700K', reels: '800K–1.2M', stories: '300–450K' },
      audience: { f: 78, m: 22 }, rating: 9.3, deals: 31, penalty: 0, coop: 'Платно / бартер',
      crit: [['Приятное общение', 14], ['Выполнил в срок', 12], ['Качественный контент', 13]],
      reviews: ['Контент выше ожиданий, сдала раньше дедлайна.', 'Очень живая подача, аудитория реально откликается.'],
    },
    jasur: {
      id: 'jasur', name: 'Jasur Tech', user: '@jasur.tech', initials: 'JT', color: '#3E7E86',
      type: 'Блогер', followers: 41200, city: 'Ташкент', niche: ['Tech', 'Lifestyle'],
      reach: { post: 14000, reels: 31000, stories: 9800 },
      price: { post: '700K–1M', reels: '1.2–1.8M', stories: '400–600K' },
      audience: { f: 35, m: 65 }, rating: 9.0, deals: 27, penalty: 3, coop: 'Платно',
      crit: [['Профессионализм', 11], ['Активная аудитория', 13], ['Выполнил в срок', 9]],
      reviews: ['Чёткий, по делу. Хорошие охваты на Reels.'],
    },
    nigora: {
      id: 'nigora', name: 'Nigora UGC', user: '@nigora.makes', initials: 'NU', color: '#A8762E',
      type: 'UGC', followers: 3800, city: 'Самарканд', niche: ['Fashion', 'Beauty'],
      reach: { post: 0, reels: 0, stories: 0 },
      price: { post: '300–500K', reels: '500–800K', stories: '200–350K' },
      audience: { f: 90, m: 10 }, rating: 9.5, deals: 19, penalty: 0, coop: 'Платно / бартер',
      crit: [['Качественный контент', 16], ['Креативный подход', 14], ['Пунктуальность', 12]],
      reviews: ['Портфолио огонь. Сняла лукбук за один день.', 'Профи в UGC, материал готовый к публикации.'],
    },
  };

  // ── Deal status model ────────────────────────────────────
  // step keys: responded, awaiting, confirmed, arrived, working, review, done, moderation, closed
  const STATUS = {
    responded:  { blog: 'Ожидает ответа компании', biz: 'Новый отклик', tone: 'gold' },
    awaiting:   { blog: 'Ожидает подтверждения',   biz: 'Подтвердить блогера', tone: 'gold' },
    confirmed:  { blog: 'Контакты открыты',        biz: 'Контакты открыты', tone: 'accent' },
    arrived:    { blog: 'Прибытие подтверждено',   biz: 'Прибытие подтверждено', tone: 'accent' },
    working:    { blog: 'Выполняю задание',        biz: 'Блогер работает', tone: 'accent' },
    review:     { blog: 'Жду подтверждения',       biz: 'Проверить задание', tone: 'gold' },
    done:       { blog: 'Оставить отзыв',          biz: 'Оставить отзыв', tone: 'success' },
    moderation: { blog: 'Отзыв на модерации',      biz: 'Отзыв на модерации', tone: 'muted' },
    closed:     { blog: 'Сделка закрыта',          biz: 'Сделка закрыта', tone: 'muted' },
  };
  const STATUS_ORDER = ['responded', 'awaiting', 'confirmed', 'arrived', 'working', 'review', 'done', 'closed'];

  // ── Deals (blogger view: my responses) ───────────────────
  const deals = [
    { id: 'd1', adId: 'ad5', biz: 'glow', blogger: 'madina', status: 'confirmed' },
    { id: 'd2', adId: 'ad2', biz: 'plov', blogger: 'madina', status: 'review' },
    { id: 'd3', adId: 'ad1', biz: 'bonjour', blogger: 'madina', status: 'responded' },
    { id: 'd4', adId: 'ad4', biz: 'medline', blogger: 'madina', status: 'done' },
  ];

  // business-side responses on one ad
  const responses = {
    ad1: ['madina', 'jasur', 'nigora'],
  };

  // ── Tariffs / Coins ──────────────────────────────────────
  const tariffs = [
    { id: 'pro',   name: 'PRO',   tagline: 'Для малого бизнеса', ads: 15, coins: 0, price: 290000, popular: false },
    { id: 'max',   name: 'MAX',   tagline: 'Для активного бизнеса', ads: 40, coins: 200, price: 690000, popular: true },
    { id: 'ultra', name: 'ULTRA', tagline: 'Максимум возможностей', ads: 100, coins: 600, price: 1290000, popular: false },
  ];
  const topPeriods = [
    { days: 1, coins: 20 }, { days: 3, coins: 50 }, { days: 7, coins: 100 }, { days: 15, coins: 180 }, { days: 30, coins: 300 },
  ];
  const adPacks = [10, 20, 30, 50, 100];

  // ── Banners (home carousel) ──────────────────────────────
  const banners = [
    { id: 'b1', title: 'Тариф MAX — 200 Coins в подарок', sub: 'Оформи до 30 июня', color: '#E86A3A' },
    { id: 'b2', title: 'Подними объявление в Топ', sub: 'Больше откликов в 3 раза', color: '#A8762E' },
    { id: 'b3', title: 'Стань VIP-блогером месяца', sub: 'Рейтинг 9.5+ → бейдж', color: '#B0567E' },
  ];

  // ── Notifications ────────────────────────────────────────
  const notifs = {
    blogger: [
      { id: 'n1', icon: 'check', title: 'Отклик подтверждён', text: 'GlowUp Beauty открыл контакты. Reels: промо линейки ухода.', time: '5 мин', unread: true, tone: 'accent' },
      { id: 'n2', icon: 'star', title: 'Новое объявление', text: 'Plov Bar опубликовал новое объявление в вашей нише.', time: '1 ч', unread: true, tone: 'gold' },
      { id: 'n3', icon: 'bell', title: 'Напоминание о сделке', text: 'Не забудьте опубликовать контент по объявлению MedLine.', time: '3 ч', unread: false, tone: 'muted' },
      { id: 'n4', icon: 'warn', title: 'Дедлайн приближается', text: 'Lola Fashion — съёмка лукбука завтра.', time: '1 д', unread: false, tone: 'gold' },
    ],
    business: [
      { id: 'm1', icon: 'user', title: 'Новый отклик', text: 'Madина Каримова откликнулась на «Reels к открытию».', time: '12 мин', unread: true, tone: 'gold' },
      { id: 'm2', icon: 'check', title: 'Объявление одобрено', text: 'Модератор опубликовал ваше объявление в ленте.', time: '2 ч', unread: true, tone: 'success' },
      { id: 'm3', icon: 'qr', title: 'Прибытие подтверждено', text: 'Jasur Tech отсканировал QR. Статус: «Прибыл».', time: '5 ч', unread: false, tone: 'accent' },
      { id: 'm4', icon: 'warn', title: 'Free Trial истекает', text: 'Осталось 2 дня пробного периода. Оформите подписку.', time: '1 д', unread: false, tone: 'gold' },
    ],
  };

  window.DATA = {
    CATEGORIES, CITIES, BIZ_CRIT, BLOG_CRIT,
    businesses, ads, bloggers, deals, responses,
    STATUS, STATUS_ORDER, tariffs, topPeriods, adPacks, banners, notifs,
  };
  window.fmtSum = (n) => n === 0 ? 'Договоримся' : (n / 1000000 >= 1 ? (n / 1000000).toFixed(n % 1000000 ? 1 : 0) + ' млн' : (n / 1000).toFixed(0) + 'K') + ' сум';
})();
