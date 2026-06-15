import {
  IconSearch,
  IconBrain,
  IconRefresh,
  IconHeart,
  IconApple,
  IconMoon,
  IconActivity,
  type IconProps,
} from "@tabler/icons-react";
import type { ComponentType } from "react";
import "./Insights.css";

/* Insights — the second home page (swipe right from the dashboard).
   6 category cards using the pillar card gradients (Figma 892:7343). */

type Card = {
  title: string;
  sub: string;
  icon: ComponentType<IconProps>;
  /** a .card-grad-* class, or undefined when `background` is set inline */
  gradClass?: string;
  background?: string;
};

const CARDS: Card[] = [
  { title: "Mental health", sub: "Understanding your body and hormonal cycle", icon: IconBrain, gradClass: "card-grad-mental" },
  { title: "Fertility support", sub: "What fertility specialists wish patients knew.", icon: IconRefresh, gradClass: "card-grad-fertility" },
  { title: "Healthy habits", sub: "Understanding your body and hormonal cycle", icon: IconHeart, gradClass: "card-grad-lifestyle" },
  { title: "Nutrition insight", sub: "Foods that support reproductive wellness.", icon: IconApple, gradClass: "card-grad-nutrition" },
  { title: "Sleep better", sub: "Why quality sleep matters more than hours.", icon: IconMoon, gradClass: "card-grad-sleep" },
  {
    title: "Mental balance",
    sub: "Navigating uncertainty in your fertility journey.",
    icon: IconActivity,
    // 6th card uses a distinct blue -> cream radial (Figma 892:7379)
    background:
      "radial-gradient(100% 100% at 39% 34%, #b3c1de 0%, #c0cbe3 50%, #dcdac0 100%)",
  },
];

export function Insights() {
  return (
    <div className="insights">
      <header className="insights-header">
        <h1 className="insights-title">Insights</h1>
        <button className="dash-iconbtn" aria-label="Search">
          <IconSearch size={20} stroke={2} aria-hidden />
        </button>
      </header>

      <div className="insights-grid">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.title}
              className={`insight-card${c.gradClass ? " " + c.gradClass : ""}`}
              style={c.background ? { background: c.background } : undefined}
            >
              <div className="insight-chip">
                <Icon size={24} stroke={2} aria-hidden />
              </div>
              <div>
                <div className="insight-card__title">{c.title}</div>
                <div className="insight-card__sub">{c.sub}</div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Insights;
