"use client";

/* eslint-disable @next/next/no-img-element -- relative image URLs keep the static export portable on GitHub Pages */

import { FormEvent, useMemo, useState } from "react";

type ServiceKey = "sofa" | "corner" | "armchair" | "carpet" | "mattress";
type IconName =
  | "clock"
  | "wallet"
  | "shield"
  | "sofa"
  | "chair"
  | "rug"
  | "mattress"
  | "leaf"
  | "machine"
  | "receipt"
  | "photo"
  | "sparkles"
  | "phone"
  | "check"
  | "arrow";

const serviceOptions: Array<{
  key: ServiceKey;
  label: string;
  shortLabel: string;
  price: number;
  unit: string;
}> = [
  { key: "sofa", label: "Прямой диван", shortLabel: "Диван", price: 1900, unit: "шт." },
  { key: "corner", label: "Угловой диван", shortLabel: "Угловой диван", price: 2900, unit: "шт." },
  { key: "armchair", label: "Кресло", shortLabel: "Кресло", price: 900, unit: "шт." },
  { key: "carpet", label: "Ковёр", shortLabel: "Ковёр", price: 320, unit: "м²" },
  { key: "mattress", label: "Матрас", shortLabel: "Матрас", price: 1600, unit: "шт." },
];

const serviceCards: Array<{
  key: ServiceKey;
  icon: IconName;
  title: string;
  description: string;
  price: string;
  meta: string;
}> = [
  {
    key: "sofa",
    icon: "sofa",
    title: "Прямой диван",
    description: "Удалим бытовые пятна, пыль и запахи со всей поверхности.",
    price: "от 1 900 ₽",
    meta: "60–90 минут",
  },
  {
    key: "corner",
    icon: "sofa",
    title: "Угловой диван",
    description: "Глубокая чистка посадочных мест, спинки, подлокотников и угла.",
    price: "от 2 900 ₽",
    meta: "90–120 минут",
  },
  {
    key: "armchair",
    icon: "chair",
    title: "Кресло и стулья",
    description: "Освежим ткань и аккуратно обработаем труднодоступные места.",
    price: "от 900 ₽",
    meta: "от 30 минут",
  },
  {
    key: "carpet",
    icon: "rug",
    title: "Ковры и ковролин",
    description: "Вернём цвет и мягкость ворсу без липкого остатка моющего средства.",
    price: "от 320 ₽/м²",
    meta: "сушка 4–8 часов",
  },
];

const reviews = [
  {
    name: "Анна",
    place: "диван и два кресла",
    text: "Диван заметно посветлел, исчез запах и старое пятно от кофе. Мастер заранее назвал цену — после работы она не изменилась.",
  },
  {
    name: "Михаил",
    place: "угловой диван",
    text: "Приехали вовремя, всё аккуратно застелили и убрали после себя. Через несколько часов диван уже был почти сухой.",
  },
  {
    name: "Елена",
    place: "ковёр и матрас",
    text: "Особенно переживала из-за ребёнка и кота. Средство без резкого запаха, результат виден сразу. Очень довольна.",
  },
];

const faqs = [
  {
    question: "Сколько сохнет мебель после химчистки?",
    answer:
      "Обычно 4–8 часов. Точное время зависит от ткани, наполнителя, температуры и вентиляции в комнате.",
  },
  {
    question: "Вы сможете назвать цену заранее?",
    answer:
      "Да. Достаточно прислать фотографию мебели и описать загрязнения. Перед началом работы мастер подтверждает итоговую стоимость.",
  },
  {
    question: "Средства безопасны для детей и животных?",
    answer:
      "Используем профессиональные составы, подходящие для жилых помещений. После чистки тщательно удаляем средство экстрактором.",
  },
  {
    question: "Все пятна можно удалить?",
    answer:
      "Большинство бытовых загрязнений удаляется полностью. Результат зависит от происхождения пятна, ткани и давности; честно оцениваем это до начала работы.",
  },
  {
    question: "Нужно ли мне что-то подготовить?",
    answer:
      "Уберите мелкие вещи с мебели и обеспечьте доступ к розетке и воде. Остальное оборудование мастер привезёт с собой.",
  },
];

const priceFormatter = new Intl.NumberFormat("ru-RU");

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v5l3.2 1.8" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7.5h14.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A2.5 2.5 0 0 1 3 17V6a2 2 0 0 1 2-2h11" />
        <path d="M16 12h4v4h-4a2 2 0 0 1 0-4Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 4.5 6v5.3c0 4.6 3.1 7.8 7.5 9.7 4.4-1.9 7.5-5.1 7.5-9.7V6L12 3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    sofa: (
      <>
        <path d="M6.5 11V8.5A2.5 2.5 0 0 1 9 6h6a2.5 2.5 0 0 1 2.5 2.5V11" />
        <path d="M5 10.5a2 2 0 0 0-2 2V17h18v-4.5a2 2 0 0 0-2-2 1.5 1.5 0 0 0-1.5 1.5v2h-11v-2A1.5 1.5 0 0 0 5 10.5Z" />
        <path d="M5 17v2m14-2v2" />
      </>
    ),
    chair: (
      <>
        <path d="M7 11V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4" />
        <path d="M5 10v6h14v-6M7 16v4m10-4v4" />
      </>
    ),
    rug: (
      <>
        <path d="M5 5h14v14H5z" />
        <path d="M8 5V3m4 2V3m4 2V3M8 21v-2m4 2v-2m4 2v-2" />
        <path d="m8 9 4 2.5L16 9v6l-4-2.5L8 15Z" />
      </>
    ),
    mattress: (
      <>
        <path d="M4 8h16v9H4z" />
        <path d="M7 8V6h10v2M4 14h16M7 17v2m10-2v2" />
      </>
    ),
    leaf: (
      <>
        <path d="M19.5 4.5C12 4.5 6 8 6 13.2c0 3.1 2.2 5.3 5.4 5.3 5.4 0 8.1-5.6 8.1-14Z" />
        <path d="M4 20c2.7-4.6 6.4-7.5 11-9.5" />
      </>
    ),
    machine: (
      <>
        <path d="M7 8h10l2 12H5L7 8Z" />
        <path d="M9 8V5h6v3M8.5 14h7M16 4l3-1m-11 1L5 3" />
      </>
    ),
    receipt: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 8h6m-6 4h6" />
      </>
    ),
    photo: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m5 17 4-4 3 3 2-2 5 3" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4L12 3Z" />
        <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14ZM5 13l.8 2.2L8 16l-2.2.8L5 19l-.8-2.2L2 16l2.2-.8L5 13Z" />
      </>
    ),
    phone: (
      <path d="M7.1 3.5 4.3 5.1c-.8.5-.9 1.4-.6 2.2 2.1 5.5 6.5 9.9 12 12 .8.3 1.7.2 2.2-.6l1.6-2.8-4.4-2.2-1.3 2c-2.5-1.2-4.3-3-5.5-5.5l2-1.3-2.2-4.4Z" />
    ),
    check: <path d="m5 12.5 4.2 4.2L19 7" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <span className="brand" aria-label="ЧистоДом">
      <span className="brand-mark">
        <svg aria-hidden="true" viewBox="0 0 48 48">
          <path d="M7 22 24 8l17 14v18H7V22Z" />
          <path d="M17 40V27h14v13M14 18V9h7v3" />
          <path className="brand-star" d="m34 5 1.6 4.1L40 11l-4.4 1.6L34 17l-1.6-4.4L28 11l4.4-1.9L34 5Z" />
        </svg>
      </span>
      <span>
        Чисто<span>Дом</span>
      </span>
    </span>
  );
}

export default function Home() {
  const [service, setService] = useState<ServiceKey>("sofa");
  const [amount, setAmount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const activeService = useMemo(
    () => serviceOptions.find((item) => item.key === service) ?? serviceOptions[0],
    [service],
  );
  const estimate = activeService.price * amount;

  function chooseService(key: ServiceKey) {
    setService(key);
    setAmount(1);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  function openModal() {
    setSent(false);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSent(false);
  }

  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#top" aria-label="ЧистоДом — на главную">
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#services">Услуги</a>
            <a href="#works">Работы</a>
            <a href="#prices">Цены</a>
            <a href="#reviews">Отзывы</a>
          </nav>
          <button className="header-phone" type="button" onClick={openModal}>
            <span className="phone-icon"><Icon name="phone" size={21} /></span>
            <span>+7 (999) 123-45-67</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Icon name="sparkles" size={18} /> Чистота, которую видно сразу</div>
              <h1>Химчистка мебели с выездом на дом</h1>
              <p className="hero-lead">
                Вернём свежесть диванам, креслам и коврам за один визит. Без резкого запаха, безопасно для детей и животных.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#calculator">
                  Рассчитать стоимость <Icon name="arrow" size={21} />
                </a>
                <a className="button button-secondary" href="#works">Посмотреть работы</a>
              </div>

              <div className="hero-benefits" aria-label="Наши преимущества">
                <div><span><Icon name="clock" /></span><p>Выезд<br /><strong>сегодня</strong></p></div>
                <div><span><Icon name="wallet" /></span><p>Цена известна<br /><strong>до начала работ</strong></p></div>
                <div><span><Icon name="shield" /></span><p>Гарантия<br /><strong>результата</strong></p></div>
              </div>

              <div className="rating-row" aria-label="Рейтинг 4,9 на основе 186 отзывов">
                <span className="stars" aria-hidden="true">★★★★★</span>
                <strong>4,9</strong>
                <span>186 отзывов</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-glow" />
              <img
                src="images/hero-cleaning.png"
                alt="Мастер профессионально чистит светлый диван экстрактором"
              />
              <div className="hero-photo-badge">
                <span><Icon name="check" size={19} /></span>
                <p><strong>Без скрытых доплат</strong><br />Фиксируем цену заранее</p>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Ключевые показатели">
          <div className="container proof-grid">
            <div><strong>7 лет</strong><span>бережно чистим мебель</span></div>
            <div><strong>4,9</strong><span>средняя оценка клиентов</span></div>
            <div><strong>1 800+</strong><span>выполненных заказов</span></div>
            <div><strong>100%</strong><span>цена согласована заранее</span></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="section-kicker">Услуги и цены</span>
                <h2>Чистим всё, на чём вы отдыхаете</h2>
              </div>
              <p>Работаем с большинством мебельных тканей. Перед чисткой обязательно проверяем материал на незаметном участке.</p>
            </div>

            <div className="service-grid" id="prices">
              {serviceCards.map((item) => (
                <article className="service-card" key={item.title}>
                  <div className="service-icon"><Icon name={item.icon} size={30} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="service-card-bottom">
                    <div><strong>{item.price}</strong><span>{item.meta}</span></div>
                    <button aria-label={`Рассчитать стоимость: ${item.title}`} onClick={() => chooseService(item.key)} type="button">
                      <Icon name="arrow" size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section works-section" id="works">
          <div className="container">
            <div className="section-heading centered-heading">
              <span className="section-kicker">До и после</span>
              <h2>Результат без фильтров</h2>
              <p>Показываем, как меняется мебель и текстиль после глубокой экстракторной чистки.</p>
            </div>
            <div className="works-grid">
              <figure className="work-card">
                <div className="work-image">
                  <img src="images/work-sofa-before-after.png" alt="Светлый диван до и после химчистки" />
                  <span className="work-label work-label-before">До</span>
                  <span className="work-label work-label-after">После</span>
                </div>
                <figcaption><strong>Трёхместный диван</strong><span>Удалили общий налёт и бытовые пятна</span></figcaption>
              </figure>
              <figure className="work-card">
                <div className="work-image">
                  <img src="images/work-carpet-before-after.png" alt="Светлый ковёр до и после химчистки" />
                  <span className="work-label work-label-before">До</span>
                  <span className="work-label work-label-after">После</span>
                </div>
                <figcaption><strong>Ковёр с коротким ворсом</strong><span>Убрали пятно и восстановили цвет</span></figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section calculator-section" id="calculator">
          <div className="container calculator-shell">
            <div className="calculator-intro">
              <span className="section-kicker section-kicker-light">Онлайн-расчёт</span>
              <h2>Узнайте примерную стоимость за минуту</h2>
              <p>Выберите предмет и количество. Для точной оценки достаточно будет прислать фотографию.</p>
              <ul>
                <li><Icon name="check" size={18} />Никаких обязательств</li>
                <li><Icon name="check" size={18} />Цена не меняется в процессе</li>
                <li><Icon name="check" size={18} />Ответим на вопросы перед заказом</li>
              </ul>
            </div>

            <div className="calculator-card">
              <p className="calculator-step">1. Что нужно почистить?</p>
              <div className="service-tabs" role="group" aria-label="Выбор услуги">
                {serviceOptions.map((item) => (
                  <button
                    aria-pressed={service === item.key}
                    className={service === item.key ? "active" : ""}
                    key={item.key}
                    onClick={() => { setService(item.key); setAmount(1); }}
                    type="button"
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>

              <div className="amount-control">
                <div>
                  <p className="calculator-step">2. {service === "carpet" ? "Площадь ковра" : "Количество"}</p>
                  <span>{amount} {activeService.unit}</span>
                </div>
                <input
                  aria-label={service === "carpet" ? "Площадь ковра" : "Количество предметов"}
                  max={service === "carpet" ? 40 : 6}
                  min="1"
                  onChange={(event) => setAmount(Number(event.target.value))}
                  step="1"
                  type="range"
                  value={amount}
                />
                <div className="range-labels"><span>1</span><span>{service === "carpet" ? "40 м²" : "6 шт."}</span></div>
              </div>

              <div className="estimate-row">
                <div><span>Предварительная стоимость</span><strong>от {priceFormatter.format(estimate)} ₽</strong></div>
                <button className="button button-primary" onClick={openModal} type="button">Уточнить цену <Icon name="arrow" size={20} /></button>
              </div>
              <p className="calculator-note">Расчёт ориентировочный. Финальная цена зависит от размера, ткани и сложности загрязнений.</p>
            </div>
          </div>
        </section>

        <section className="section advantages-section">
          <div className="container">
            <div className="section-heading centered-heading narrow-heading">
              <span className="section-kicker">Почему ЧистоДом</span>
              <h2>Заботимся и о результате, и о вашем доме</h2>
            </div>
            <div className="advantages-grid">
              <article>
                <span><Icon name="leaf" size={30} /></span>
                <h3>Безопасные составы</h3>
                <p>Подбираем средство под ткань и тщательно удаляем его вместе с загрязнениями.</p>
              </article>
              <article>
                <span><Icon name="machine" size={30} /></span>
                <h3>Профессиональная техника</h3>
                <p>Экстрактор глубоко промывает материал и забирает большую часть влаги.</p>
              </article>
              <article>
                <span><Icon name="receipt" size={30} /></span>
                <h3>Честная стоимость</h3>
                <p>Согласуем цену до выезда. Если задача изменится — сначала обсудим это с вами.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="section-kicker">Как всё проходит</span>
                <h2>От фотографии до чистой мебели</h2>
              </div>
              <p>Вам не нужно разбираться в тканях и пятнах — зададим несколько вопросов и всё подготовим.</p>
            </div>
            <div className="steps-grid">
              {[
                ["01", "Присылаете фото", "Покажите мебель целиком и крупным планом загрязнения."],
                ["02", "Получаете расчёт", "Называем диапазон цены и удобное время приезда."],
                ["03", "Мастер выполняет чистку", "Проверяет ткань, удаляет пятна и промывает поверхность."],
                ["04", "Принимаете результат", "Осматриваете работу и оплачиваете согласованную сумму."],
              ].map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <div className="section-heading centered-heading">
              <span className="section-kicker">Отзывы</span>
              <h2>Нас рекомендуют друзьям</h2>
              <p>Клиенты ценят понятную цену, аккуратность и результат, который видно сразу.</p>
            </div>
            <div className="reviews-grid">
              {reviews.map((review) => (
                <article key={review.name}>
                  <div className="review-stars" aria-label="5 из 5">★★★★★</div>
                  <p>«{review.text}»</p>
                  <div className="review-author">
                    <span>{review.name[0]}</span>
                    <div><strong>{review.name}</strong><small>{review.place}</small></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-layout">
            <div className="faq-copy">
              <span className="section-kicker">Вопросы и ответы</span>
              <h2>Всё, что важно знать до приезда мастера</h2>
              <p>Не нашли ответ? Оставьте номер — перезвоним и подскажем.</p>
              <button className="text-button" onClick={openModal} type="button">Задать свой вопрос <Icon name="arrow" size={20} /></button>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="contacts">
          <div className="container final-cta-card">
            <div className="final-sparkles" aria-hidden="true">✦</div>
            <div>
              <span className="section-kicker section-kicker-light">Готовы вернуть мебели свежесть?</span>
              <h2>Пришлите фото — рассчитаем точную стоимость</h2>
              <p>Ответим в течение 10 минут и предложим ближайшее свободное время.</p>
            </div>
            <button className="button button-white" onClick={openModal} type="button">Получить расчёт <Icon name="arrow" size={21} /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div>
            <Brand />
            <p>Химчистка мебели и ковров с выездом на дом.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Услуги</a>
            <a href="#works">Работы</a>
            <a href="#calculator">Расчёт цены</a>
            <a href="#reviews">Отзывы</a>
          </div>
          <div className="footer-contact">
            <button onClick={openModal} type="button">+7 (999) 123-45-67</button>
            <span>Ежедневно, 08:00–22:00</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 ЧистоДом</span>
          <span>Демонстрационный проект: название, цены, контакты и отзывы условные</span>
        </div>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) closeModal(); }}>
          <div aria-labelledby="modal-title" aria-modal="true" className="modal" role="dialog">
            <button aria-label="Закрыть окно" className="modal-close" onClick={closeModal} type="button">×</button>
            {!sent ? (
              <>
                <span className="modal-icon"><Icon name="photo" size={28} /></span>
                <h2 id="modal-title">Рассчитаем точную стоимость</h2>
                <p>Оставьте контакты. В реальном проекте менеджер уточнит детали и попросит фотографию мебели.</p>
                <form onSubmit={submitDemo}>
                  <label>Ваше имя<input name="name" placeholder="Например, Анна" required /></label>
                  <label>Телефон<input inputMode="tel" name="phone" placeholder="+7 (___) ___-__-__" required /></label>
                  <button className="button button-primary" type="submit">Получить расчёт <Icon name="arrow" size={20} /></button>
                  <small>Демонстрационная форма — введённые данные никуда не отправляются.</small>
                </form>
              </>
            ) : (
              <div className="success-state">
                <span><Icon name="check" size={34} /></span>
                <h2 id="modal-title">Форма работает</h2>
                <p>Это демонстрационный сайт, поэтому данные не отправлены. В клиентском проекте здесь подключается Telegram, CRM или почта.</p>
                <button className="button button-secondary" onClick={closeModal} type="button">Понятно</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
