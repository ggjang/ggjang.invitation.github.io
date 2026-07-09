import { useEffect, useRef, useState } from 'react'
import './App.css'

// ── 여기를 수정하세요 ──────────────────────────────────────────
const INFO = {
  groomName: '장경권',      // 신랑 이름
  brideName: '이지우',      // 신부 이름
  groomFamily: '장경권의 아들',
  brideFamily: '이지우의 딸',
  date: '2027년 01월 23일 토요일',
  time: '오후 00시 00분',
  venue: '장소명',
  address: '서울특별시 ○○구 ○○로 00',
  groomContact: '010-0000-0000',
  brideContact: '010-0000-0000',
  kakaoMapUrl: '',          // 카카오맵 공유 URL (선택)
}
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

export default function App() {
  return (
    <main className="app">

      {/* ── HERO ── */}
      <section className="hero">
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
              {INFO.venue}<br />
              <small>{INFO.address}</small>
            </span>
          </li>
        </ul>
        {INFO.kakaoMapUrl && (
          <a className="map-btn" href={INFO.kakaoMapUrl} target="_blank" rel="noopener noreferrer">
            지도 보기
          </a>
        )}
      </Section>

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
