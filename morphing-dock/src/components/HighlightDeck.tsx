import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  IconBrain,
  IconMoon,
  IconApple,
  IconHeart,
  IconRefresh,
  IconActivity,
  IconChevronUp,
} from "@tabler/icons-react";
import "./HighlightDeck.css";

/* The three onboarding highlight cards. Collapsed they sit as a stacked deck;
   tapping expands them into a vertical list (Figma 834:6891). */

const SPRING = { type: "spring" as const, stiffness: 500, damping: 30 };
const CHIP_ICONS = [IconBrain, IconMoon, IconApple, IconHeart, IconRefresh, IconActivity];

function TalkCard() {
  return (
    <article className="hl-card">
      <div className="hl-blob" aria-hidden />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 className="hl-card__title">Talk to BioBuddy</h3>
        <p className="hl-card__sub">
          The more context you share, the more personalised your experience becomes.
        </p>
      </div>
      <button className="btn-pill" onClick={() => console.log("Open chat")}>
        Open chat
      </button>
    </article>
  );
}

function InsightsCard() {
  return (
    <article className="hl-card">
      <div>
        <h3 className="hl-card__title">Check out the insights page</h3>
        <p className="hl-card__sub">
          You can open the chat on any article to discuss it directly with BioBuddy
        </p>
      </div>
      <div className="hl-chips">
        {CHIP_ICONS.map((Icon, i) => (
          <span className="hl-chip" key={i}>
            <Icon size={16} stroke={2} aria-hidden />
          </span>
        ))}
      </div>
    </article>
  );
}

function RecordsCard() {
  return (
    <article className="hl-card">
      <div className="hl-blob" aria-hidden />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 className="hl-card__title">Add your health records</h3>
        <p className="hl-card__sub">
          Add exams and other health data so BioBuddy can support you better
        </p>
      </div>
      <button className="btn-pill" onClick={() => console.log("Add records")}>
        Add records
      </button>
    </article>
  );
}

export function HighlightDeck() {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0.15 } : SPRING;

  return (
    <section aria-label="Highlights">
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="list"
            className="hl-list"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.07 } }}
            exit={{ opacity: 0 }}
          >
            {[<TalkCard key="t" />, <InsightsCard key="i" />, <RecordsCard key="r" />].map(
              (card, idx) => (
                <motion.div
                  key={idx}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={transition}
                >
                  {card}
                </motion.div>
              )
            )}
            <button className="hl-collapse" onClick={() => setExpanded(false)}>
              <IconChevronUp size={16} stroke={2} aria-hidden />
              Show less
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="stack"
            className="hl-stack"
            role="button"
            tabIndex={0}
            aria-label="Expand highlights"
            onClick={() => setExpanded(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded(true);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            transition={transition}
          >
            <span className="hl-peek hl-peek--back" aria-hidden />
            <span className="hl-peek hl-peek--mid" aria-hidden />
            <TalkCard />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HighlightDeck;
