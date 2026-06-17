import { IconSearch, IconPlus, IconClock } from "@tabler/icons-react";
import { HighlightDeck } from "../components/HighlightDeck";
import "./Dashboard.css";

/* Dashboard / main — low-data onboarding state (Figma 834:6721).
   Mini charts are hand-built SVGs (the Figma chart assets are expiring URLs). */

function SleepBars() {
  // varied heights (out of 68) — a light sleep-stage rhythm
  const bars = [22, 38, 30, 52, 62, 36, 46];
  const w = 8;
  const gap = 11;
  return (
    <svg className="chart" height={68} viewBox={`0 0 ${bars.length * (w + gap) - gap} 68`} aria-hidden>
      {bars.map((h, i) => (
        <rect key={i} x={i * (w + gap)} y={68 - h} width={w} height={h} rx={4} fill="#364153" />
      ))}
    </svg>
  );
}

function HrvLine() {
  return (
    <svg className="chart" height={49} viewBox="0 0 150 49" fill="none" aria-hidden>
      <path
        d="M0 31 C 14 27, 22 19, 34 21 S 54 35, 66 31 S 88 15, 102 23 S 126 37, 138 27 L150 29"
        stroke="#364153"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Dashboard() {
  return (
    <div className="dash">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header__row">
          <h1 className="dash-hello">Hello Marta</h1>
          <button className="dash-iconbtn" aria-label="Search">
            <IconSearch size={20} stroke={2} aria-hidden />
          </button>
        </div>
        <p className="dash-quote">
          “I am strong, hopeful, and enough exactly as I am.”
        </p>
      </header>

      <div className="dash-content">
        {/* Stacked highlight deck — tap to expand */}
        <HighlightDeck />

        {/* Building your baseline */}
        <section className="card card-dark">
          <div className="card-dark__row">
            <span className="card-dark__title">Building your baseline</span>
            <span className="card-dark__meta">Day 2 of 30</span>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={2}
            aria-valuemin={0}
            aria-valuemax={30}
            aria-label="Baseline progress"
          >
            <div className="progress__fill" style={{ width: "7%" }} />
          </div>
          <p className="card-dark__text">
            Keep using the app, chatting, and wearing your device. Trends unlock
            on day 30.
          </p>
        </section>

        {/* Today's goal */}
        <section className="card card-goal">
          <div className="card-goal__head">
            <div className="card-goal__row">
              <h2 className="card-title card-title--lg">Today’s goal</h2>
              <span className="muted">0 goals</span>
            </div>
            <p className="muted">Build your routine with BioBuddy</p>
          </div>
          <button
            className="btn-pill btn-pill--sm"
            onClick={() => console.log("Add a goal")}
          >
            Add a goal
            <IconPlus size={16} stroke={2.5} aria-hidden />
          </button>
        </section>

        {/* Sleep + Glucose */}
        <div className="dash-row">
          <article className="metric metric--fixed metric--sleep">
            <div>
              <div className="metric__value">7h 20m</div>
              <div className="metric__label">Tonight’s sleep</div>
            </div>
            <SleepBars />
          </article>

          <article className="metric metric--grow metric--empty">
            <div>
              <div className="card-title">Glucose</div>
              <div className="metric__label metric__label--muted">
                Connect health records to track glucose
              </div>
            </div>
            <div className="metric__waiting">
              <IconClock size={12} stroke={2} aria-hidden />
              Waiting for records
            </div>
          </article>
        </div>

        {/* HRV + Fertility */}
        <div className="dash-row">
          <article className="metric metric--grow metric--hrv">
            <div>
              <div className="metric__value metric__value--xl">48 ms</div>
              <div className="metric__label">
                Recovery HRV ·<br />−6 vs baseline
              </div>
            </div>
            <HrvLine />
          </article>

          <article className="metric metric--grow metric--empty">
            <div>
              <div className="card-title card-title--lg">Fertility</div>
              <div className="metric__label metric__label--muted">
                Add your cycle info, records and tests
              </div>
            </div>
            <div className="metric__waiting">
              <IconClock size={12} stroke={2} aria-hidden />
              Waiting for data
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
