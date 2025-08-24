import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  Store, Trees, Dumbbell, Handshake, ArrowUp, Calendar, Route, Flame
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "Жилой квартал «Республика» — пгт Гвардейское, Симферопольский район";

  const meta = [
    { name: "description", content: "ЖК «Республика» в Гвардейском (Симферопольский район): масштабный квартал комфорт‑класса — 22 дома по 9 этажей, благоустроенные дворы, спорт и детские зоны, наземные парковки, индивидуальное газовое отопление. Первая очередь — сдана, следующие очереди — ориентир 2026 г. ДДУ 214‑ФЗ, эскроу." },
    { property: "og:title", content: "ЖК «Республика» — Гвардейское, Симферополь" },
    { property: "og:description", content: "Квартиры от студий до 3‑комнатных. Ландшафтные дворы, детские и спортивные площадки, собственная инфраструктура. Планировки и цены — по запросу." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-respublika.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"; // городской квартал — заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#E2D4BA", backgroundColor: "#FFFFFF", color: "#1A1410" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #B45309 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#6B5B46" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#E2D4BA", backgroundColor: "#FFF8EE", color: "#1A1410" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#FFF8EE", color: "#1A1410", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: мягкие песочные волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FAF0DB 0%, #FFF8EE 45%, #FFF8EE 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#E2D4BA" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#F0E4CC" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: просторные кнопки + grid (не липнут) */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(255,248,238,0.9)", borderColor: "#E2D4BA" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#1A1410", color: "#FAF0DB" }}>R</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">ЖК «Республика»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#6B5B46" }}>
                <MapPin size={12} className="inline mr-1" /> пгт Гвардейское, Симферопольский район · ул. Курганная, 31
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О квартале", "Планировки", "Инженерия", "Локация", "Этапы", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#plans','#tech','#location','#phases','#faq'][i]} className="hover:text-amber-800 whitespace-nowrap transition-colors" style={{ color: "#6B5B46" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#DCC7A5", color: "#1A1410" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#B45309", color: "#FFF8EE" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#E2D4BA' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О квартале','#about'],['Планировки','#plans'],['Инженерия','#tech'],['Локация','#location'],['Этапы','#phases'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-amber-50" style={{ color: '#6B5B46' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#DCC7A5', color: '#1A1410' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#B45309', color: '#FFF8EE' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#1A1410", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Республика» — квартал для жизни и семьи
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#6B5B46", maxWidth: 700 }}>
              Масштабный проект комфорт‑класса в Гвардейском: 22 дома по 9 этажей, ландшафтные дворы без транзита, детские и спортивные площадки, наземные парковки. Первая очередь введена в эксплуатацию, следующие — в работе.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["22 дома", <Building2 size={18} key="b" />],["9 этажей", <Building2 size={18} key="b2" />],["Индивидуальное газовое отопление", <Flame size={18} key="f" />],["ДДУ 214‑ФЗ, эскроу", <ShieldCheck size={18} key="s" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#E2D4BA", color: "#1A1410" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#B45309", color: "#FFF8EE" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#DCC7A5", color: "#1A1410" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#E2D4BA" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(226,212,186,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop" alt="Городской квартал комфорт‑класса" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="14,5 га" label="Территория" sub="по данным каталога" icon={<Trees size={18} />} /></div>
          <div className="h-full"><Stat value="22 дома" label="Масштаб" sub="средняя этажность — 9" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="I очередь — сдана" label="Статус" sub="следующие — ориентир 2026" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="Комфорт" label="Класс" sub="ДДУ, эскроу" icon={<ShieldCheck size={18} />} /></div>
        </div>
      </section>

      {/* О КВАРТАЛЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О квартале</h2>
            <p className="mt-4" style={{ color: '#6B5B46' }}>
              «Республика» формирует новый жилой район рядом с Симферополем. В проекте — дворы без транзитного движения, ландшафтное озеленение, детские и спортивные площадки, коммерческие помещения для сервисов у дома. Квартиры предлагаются с предчистовой отделкой (white box) или без отделки — под ваш сценарий.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировки', t: 'Студии, 1‑, 2‑ и 3‑комнатные варианты; кухни‑гостиные, лоджии.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Индивидуальное газовое отопление, современные лифты и системы доступа.', icon: <CircuitBoard size={18} /> },
                { h: 'Парковки', t: 'Наземные парковочные пространства по периметру и во дворах‑карманах.', icon: <ParkingSquare size={18} /> },
                { h: 'Право и девелопер', t: 'ДДУ 214‑ФЗ, эскроу. Девелопер: ГК «ИнтерСтрой» / ООО СЗ «Гвардейское».', icon: <ShieldCheck size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#E2D4BA', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#1A1410' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#6B5B46' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#F0E4CC', borderColor: '#E2D4BA' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#1A1410' }}>
              <Route size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#6B5B46' }}>
              <li><MapPin size={14} className="inline mr-2" /> пгт Гвардейское, ул. Курганная, 31</li>
              <li><Calendar size={14} className="inline mr-2" /> Первая очередь введена: декабрь 2024</li>
              <li><FileText size={14} className="inline mr-2" /> Застройщик: ООО СЗ «Гвардейское» (ГК «ИнтерСтрой»)</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#B45309', color: '#FFF8EE' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ИНЖЕНЕРИЯ И ДВОРЫ */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#FAF0DB' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Инженерия и благоустройство</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#6B5B46' }}>
              {[
                { t: 'Индивидуальные газовые котлы в квартирах', icon: <Flame size={16} /> },
                { t: 'Ландшафтные дворы, зоны отдыха и спортивные площадки', icon: <Trees size={16} /> },
                { t: 'Современные лифты и системы контроля доступа', icon: <CircuitBoard size={16} /> },
                { t: 'Коммерческие помещения для магазинов и сервисов', icon: <Store size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2D4BA' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#1A1410' }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#6B5B46' }}>
              {["Комфорт‑класс и благоустройство", "Собственная инфраструктура", "Отопление под ваш сценарий", "Ипотека, эскроу"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#FFF8EE', borderColor: '#E2D4BA' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и метражи</h2>
          <p className="mt-3" style={{ color: '#6B5B46' }}>
            Квартиры от студий до 3‑комнатных. По запросу пришлём PDF‑подборку с актуальными планировками, этажами и видами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Рациональные метражи и сценарии хранения", icon: <Home size={18} /> },
              { t: "1–2‑комнатные", d: "Кухни‑гостиные, лоджии, угловые решения", icon: <Home size={18} /> },
              { t: "3‑комнатные", d: "Семейные форматы с просторными гостиными", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2D4BA' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#1A1410' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#6B5B46' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#92400E' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#FAF0DB' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#6B5B46' }}>
              {[
                '10–15 минут на авто до центра Симферополя',
                'В 5 минутах — выезд на трассу «Таврида»',
                'В пешей доступности остановки общественного транспорта',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Route size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#E2D4BA' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=34.102%2C45.061&z=16&text=%D0%9A%D1%83%D1%80%D0%B3%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F%2031%20%D0%93%D0%B2%D0%B0%D1%80%D0%B4%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%B5" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ЭТАПЫ И СРОКИ */}
      <section id="phases" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Этапы и сроки</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { t: "I очередь", d: "введена в эксплуатацию (декабрь 2024)", icon: <FileText size={18} /> },
              { t: "II очередь", d: "продажи открыты, ориентир сдачи — 2026", icon: <FileText size={18} /> },
              { t: "III очередь", d: "подготовка/строительство, ориентир — 2026", icon: <FileText size={18} /> },
              { t: "Формат сделки", d: "ДДУ 214‑ФЗ, расчёты через эскроу", icon: <ShieldCheck size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2D4BA' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#1A1410' }}>{s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#6B5B46' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#FAF0DB' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где находится квартал?", a: "Республика Крым, Симферопольский район, пгт Гвардейское, ул. Курганная, 31." },
              { q: "Какая этажность и масштаб?", a: "Средняя этажность — 9 этажей; в составе квартала около 22 домов." },
              { q: "Есть ли отопление в каждой квартире?", a: "Да, предусмотрено индивидуальное газовое отопление (по домам/секциям)." },
              { q: "Что с парковкой?", a: "Наземные парковки организованы по периметру и во дворовых карманах." },
              { q: "Какой срок сдачи следующих очередей?", a: "По открытым данным и маркетплейсам — ориентир 2026 год." },
              { q: "По какому договору покупка?", a: "ДДУ по 214‑ФЗ, расчёты осуществляются через эскроу‑счета." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#E2D4BA' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#1A1410' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#6B5B46' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где находится квартал?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, Симферопольский район, пгт Гвардейское, ул. Курганная, 31." } },
            { "@type": "Question", "name": "Какая этажность и масштаб?", "acceptedAnswer": { "@type": "Answer", "text": "Средняя этажность — 9; в составе квартала 22 дома." } },
            { "@type": "Question", "name": "Есть ли отопление в каждой квартире?", "acceptedAnswer": { "@type": "Answer", "text": "Предусмотрено индивидуальное газовое отопление (по домам/секциям)." } },
            { "@type": "Question", "name": "Что с парковкой?", "acceptedAnswer": { "@type": "Answer", "text": "Наземные парковки по периметру и во дворовых карманах." } },
            { "@type": "Question", "name": "Какой срок сдачи следующих очередей?", "acceptedAnswer": { "@type": "Answer", "text": "Ориентир 2026 год." } },
            { "@type": "Question", "name": "По какому договору покупка?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ 214‑ФЗ, расчёты через эскроу‑счета." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#6B5B46' }}>
              Пришлём PDF с планировками и этажами, действующие цены, условия ипотеки и статус очередей.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#DCC7A5', color: '#1A1410' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#E2D4BA' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#1A1410' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#6B5B46' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#1A1410' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#6B5B46' }}>
                  Оставьте контакты — вышлем актуальные предложения по ЖК «Республика».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#E2D4BA' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#E2D4BA' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#E2D4BA' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#E2D4BA' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#B45309', color: '#FFF8EE' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#8A7358' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#8A7358' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#E2D4BA' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#6B5B46' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#1A1410' }}>
              <Home size={16} /> Жилой квартал «Республика»
            </div>
            <p className="mt-2">Республика Крым, Симферопольский район, пгт Гвардейское, ул. Курганная, 31</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Девелопер: ГК «ИнтерСтрой» / ООО СЗ «Гвардейское».</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "ЖК «Республика»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Курганная, 31",
          "addressLocality": "пгт Гвардейское",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#B45309", color: "#FFF8EE", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
