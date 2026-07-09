import { useEffect, useRef, useState } from 'react'
import './App.css'

// ── 여기를 수정하세요 ──────────────────────────────────────────
const INFO = {
  groomName: '장경권',
  brideName: '이지우',
  groomFamily: '장영수 · 김영옥의 아들',
  brideFamily: '이한구 · 고윤옥의 딸',
  date: '2027년 01월 23일 토요일',
  time: '오전 11시 50분',
  venue: '천안 비렌티 매그넘홀',
  venueSub: '본관 3층',
  address: '충남 천안시 서북구 천안대로 1198-30',
  groomContact: '010-0000-0000',
  brideContact: '010-0000-0000',
}

const SHUTTLE = [
  {
    stop: '천안고속버스터미널',
    desc: '신세계백화점(아라리오광장) 옆 올리브영·스타벅스 건물 앞',
    times: ['10:50', '11:20'],
  },
  {
    stop: '두정역 1번출구',
    desc: '출구에서 오른쪽 50m 파란색 셔틀버스 승강장',
    times: ['10:55', '11:25'],
  },
]
// ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function Section({ className = '', children }) {
  const [ref, visible] = useInView()
  return (
    <section ref={ref} className={`section ${className} ${visible ? 'visible' : ''}`}>
      {children}
    </section>
  )
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        {src
          ? <img src={src} alt="사진 크게 보기" className="lightbox-img" />
          : <div className="lightbox-placeholder"><span>📷</span></div>
        }
        <button className="lightbox-close" onClick={onClose} aria-label="닫기">✕</button>
      </div>
    </div>
  )
}

function BotanicalCorner({ className }) {
  return (
    <svg className={`botanical ${className}`} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* main stem */}
      <path d="M 125 5 C 95 35 65 65 18 118" stroke="#c4a882" strokeWidth="0.9"/>
      {/* leaf 1 — upper */}
      <path d="M 98 28 C 114 12 122 32 104 37 C 91 29 98 28 Z" stroke="#c4a882" strokeWidth="0.7" fill="#c4a882" fillOpacity="0.1"/>
      {/* leaf 2 — mid */}
      <path d="M 65 62 C 80 45 88 65 70 70 C 58 63 65 62 Z" stroke="#c4a882" strokeWidth="0.7" fill="#c4a882" fillOpacity="0.1"/>
      {/* leaf 3 — lower */}
      <path d="M 36 94 C 22 81 26 98 40 97 C 42 90 36 94 Z" stroke="#c4a882" strokeWidth="0.6" fill="#c4a882" fillOpacity="0.1"/>
      {/* flower at tip */}
      <circle cx="18" cy="118" r="5" stroke="#c4a882" strokeWidth="0.7"/>
      <circle cx="18" cy="111" r="3.5" stroke="#c4a882" strokeWidth="0.5" fill="#c4a882" fillOpacity="0.12"/>
      <circle cx="12" cy="115" r="3.5" stroke="#c4a882" strokeWidth="0.5" fill="#c4a882" fillOpacity="0.12"/>
      <circle cx="24" cy="115" r="3.5" stroke="#c4a882" strokeWidth="0.5" fill="#c4a882" fillOpacity="0.12"/>
      <circle cx="18" cy="125" r="3.5" stroke="#c4a882" strokeWidth="0.5" fill="#c4a882" fillOpacity="0.12"/>
      {/* small berries */}
      <circle cx="110" cy="12" r="3" stroke="#c4a882" strokeWidth="0.6" fill="#c4a882" fillOpacity="0.18"/>
      <circle cx="120" cy="18" r="2" stroke="#c4a882" strokeWidth="0.5" fill="#c4a882" fillOpacity="0.18"/>
    </svg>
  )
}

function Divider() {
  return <div className="divider"><span>✦</span></div>
}

function Countdown({ dateStr }) {
  const [days, setDays] = useState(null)
  useEffect(() => {
    const target = new Date(dateStr)
    if (isNaN(target)) return
    const tick = () => {
      const diff = Math.ceil((target - Date.now()) / 86400000)
      setDays(diff > 0 ? diff : 0)
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [dateStr])
  if (days === null) return null
  return (
    <div className="countdown">
      <span className="countdown-num">{days}</span>
      <span className="countdown-label">일 후</span>
    </div>
  )
}

// photos 배열에 실제 이미지 추가: import p1 from './assets/photo1.jpg' 후 [p1, p2, ...]
const photos = []

function GallerySection() {
  const [selected, setSelected] = useState(null)
  const items = photos.length > 0 ? photos : Array(6).fill(null)

  return (
    <Section className="gallery">
      <h2 className="section-title">갤러리</h2>
      <div className="gallery-grid">
        {items.map((src, i) => (
          <button key={i} className="gallery-item" onClick={() => setSelected({ src, i })}>
            {src
              ? <img src={src} alt={`사진 ${i + 1}`} />
              : <span>📷</span>
            }
          </button>
        ))}
      </div>
      {selected !== null && (
        <Lightbox src={selected.src} onClose={() => setSelected(null)} />
      )}
    </Section>
  )
}

export default function App() {
  return (
    <main className="app">

      {/* ── HERO ── */}
      <section className="hero">
        <BotanicalCorner className="top-left" />
        <BotanicalCorner className="top-right" />
        <BotanicalCorner className="bottom-left" />
        <BotanicalCorner className="bottom-right" />
        <div className="hero-inner fade-up">
          <p className="hero-eyebrow">We're getting married</p>
          <h1 className="hero-names">
            <span>{INFO.groomName}</span>
            <span className="hero-amp">&amp;</span>
            <span>{INFO.brideName}</span>
          </h1>
          <p className="hero-date">{INFO.date}</p>
          <Countdown dateStr="2027-01-23" />
        </div>
      </section>

      {/* ── INVITATION ── */}
      <Section className="invite">
        <p className="invite-text">
          서로가 마주보며 다져온 사랑을<br />
          이제 함께 한 곳을 바라보며 걷고자 합니다.<br />
          <br />
          저희 두 사람이 사랑으로 하나 되는 자리에<br />
          오셔서 축복해 주시면 감사하겠습니다.
        </p>
        <Divider />
        <div className="family-info">
          <p>{INFO.groomFamily} <strong>{INFO.groomName}</strong></p>
          <p>{INFO.brideFamily} <strong>{INFO.brideName}</strong></p>
        </div>
      </Section>

      {/* ── DATE & VENUE ── */}
      <Section className="details">
        <h2 className="section-title">일시 &amp; 장소</h2>
        <ul className="details-list">
          <li>
            <span className="detail-icon">📅</span>
            <span>{INFO.date} {INFO.time}</span>
          </li>
          <li>
            <span className="detail-icon">📍</span>
            <span>
              {INFO.venue} <small className="venue-sub">{INFO.venueSub}</small><br />
              <small>{INFO.address}</small>
            </span>
          </li>
        </ul>

        {/* 지도 */}
        <div className="map-wrap">
          <iframe
            title="웨딩홀 위치"
            src="https://maps.google.com/maps?q=충남+천안시+서북구+천안대로+1198-30+비렌티&output=embed&hl=ko&z=15"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <a
          className="map-btn"
          href="https://map.kakao.com/link/search/천안비렌티웨딩"
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오맵으로 보기
        </a>
      </Section>

      {/* ── SHUTTLE ── */}
      <Section className="shuttle">
        <h2 className="section-title">셔틀버스 안내</h2>
        <p className="shuttle-note">예식 1시간 전부터 30분 간격 운행</p>
        <div className="shuttle-list">
          {SHUTTLE.map((s) => (
            <div key={s.stop} className="shuttle-card">
              <p className="shuttle-stop">🚌 {s.stop}</p>
              <p className="shuttle-desc">{s.desc}</p>
              <div className="shuttle-times">
                {s.times.map((t) => (
                  <span key={t} className="shuttle-time">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── GALLERY ── */}
      {/* 사진 추가: src/assets/ 에 이미지 넣고 photos 배열에 import 경로 추가 */}
      <GallerySection />

      {/* ── CONTACT ── */}
      <Section className="contact">
        <h2 className="section-title">마음 전하기</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <p className="contact-role">신랑</p>
            <p className="contact-name">{INFO.groomName}</p>
            <a className="contact-tel" href={`tel:${INFO.groomContact}`}>{INFO.groomContact}</a>
          </div>
          <div className="contact-card">
            <p className="contact-role">신부</p>
            <p className="contact-name">{INFO.brideName}</p>
            <a className="contact-tel" href={`tel:${INFO.brideContact}`}>{INFO.brideContact}</a>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>{INFO.groomName} &amp; {INFO.brideName}</p>
        <p className="footer-date">{INFO.date}</p>
      </footer>

    </main>
  )
}
