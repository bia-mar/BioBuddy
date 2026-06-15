import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { IconChevronLeft } from "@tabler/icons-react";
import { ChatIcon, type DockIcon } from "./icons/NavIcons";

/* ============================================================
   BioBuddy — MorphingDock
   A bottom navigation dock that MORPHS by depth. Layout (matches Figma):
     LEFT   → Chat (BioBuddy), always present — the anchor, never moves
     MIDDLE → back button slot, expands only when deeper than level 1
     RIGHT  → a pill that re-contents itself per level
   The pill keeps a constant outer shape so the dock reads as ONE object
   reshaping, not two screens swapping.
   ============================================================ */

/* ---------- Tunable tokens (motion + visual) ---------- */
// Liquid/bouncy spring — overshoots once and settles.
// Prototype reference cubic-bezier(0.34, 1.56, 0.64, 1).
const SPRING: Transition = { type: "spring", stiffness: 500, damping: 28 };
// prefers-reduced-motion fallback: a quick fade, no spring.
const REDUCED: Transition = { duration: 0.15, ease: "easeOut" };
// Pill content "pop" — scales up from this; the spring supplies the overshoot
// (~1.06) on the way to 1. Keep < 1 so it grows into place.
const POP_SCALE_FROM = 0.82;

const CIRCLE = 54; // px — back + chat circle diameter
const GAP = 10; // px — gap between the pill and each circle
const SLOT_W = CIRCLE + GAP; // collapsed(0) -> expanded width of the LEFT slot
const TAP_MIN = 44; // px — minimum tap target
const ICON = 24; // px — icon size

// Design-system tokens — matches the Figma app nav (teal).
const COLOR = {
  fill: "var(--primary-100)", // pill + circle fill  (#e7f5f7)
  icon: "var(--primary-1000)", // dark-navy default icon (inactive / back / chat) (#001b30)
  activeBg: "var(--primary-600)", // filled active circle (#149aaf)
  activeIcon: "var(--neutral-100)", // light icon on the active circle (#f5f5f5)
} as const;

// Cap: a focused page toolbar is 2–3 actions. 4 is the L1 wayfinder ceiling.
// More than 3 is a design smell — we warn but still render (hard cap 4).
const SOFT_MAX = 3;
const HARD_MAX = 4;

/* ---------- Public types ---------- */
export type { DockIcon };

export type DockAction = {
  id: string;
  icon: DockIcon; // an icon component from ./icons/NavIcons (or compatible)
  label: string; // aria-label
  active?: boolean; // highlighted (darker) icon
  onPress: () => void;
};

export type DockLevel = {
  id: string;
  title: string;
  actions: DockAction[]; // what the pill shows at this level
};

export type MorphingDockProps = {
  stack: DockLevel[]; // depth = stack.length; top = last item
  onBack: () => void; // pop one level
  onChat: () => void; // chat is constant, separate handler
  className?: string;
};

/* ---------- Round icon button (back / chat circles) ---------- */
function CircleButton({
  label,
  onClick,
  children,
  transition,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  transition: Transition;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={transition}
      className="flex items-center justify-center rounded-full"
      style={{
        width: CIRCLE,
        height: CIRCLE,
        minWidth: TAP_MIN,
        minHeight: TAP_MIN,
        background: COLOR.fill,
        color: COLOR.icon,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ---------- A single action icon inside the pill ---------- */
function PillAction({ action }: { action: DockAction }) {
  const Icon = action.icon;
  const isActive = !!action.active;
  return (
    <button
      type="button"
      aria-label={action.label}
      aria-pressed={isActive}
      onClick={action.onPress}
      className="flex items-center justify-center rounded-full transition-colors"
      style={{
        width: TAP_MIN,
        height: TAP_MIN,
        background: isActive ? COLOR.activeBg : "transparent",
        color: isActive ? COLOR.activeIcon : COLOR.icon,
      }}
    >
      <Icon size={ICON} stroke={2} aria-hidden />
    </button>
  );
}

export function MorphingDock({
  stack,
  onBack,
  onChat,
  className,
}: MorphingDockProps) {
  const reduce = useReducedMotion();
  const transition = reduce ? REDUCED : SPRING;

  const top = stack[stack.length - 1];
  const showBack = stack.length > 1;

  // Cap the actions; flag the design smell without crashing.
  let actions = top?.actions ?? [];
  if (actions.length > SOFT_MAX) {
    // eslint-disable-next-line no-console
    console.warn(
      `[MorphingDock] Level "${top?.id}" has ${actions.length} actions. ` +
        `A focused dock shows ${SOFT_MAX} or fewer — rendering the first ${HARD_MAX}.`
    );
  }
  actions = actions.slice(0, HARD_MAX);

  // Pop animation for the pill's contents (disabled when reduced).
  const popInitial = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: POP_SCALE_FROM };
  const popAnimate = reduce ? { opacity: 1 } : { opacity: 1, scale: 1 };
  const popExit = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: POP_SCALE_FROM };

  return (
    <nav
      aria-label="App navigation dock"
      className={className}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="flex items-center">
        {/* LEFT chat circle — the anchor; never animates position (matches Figma) */}
        <div style={{ marginRight: GAP }}>
          <CircleButton label="Chat with BioBuddy" onClick={onChat} transition={transition}>
            <ChatIcon size={ICON} aria-hidden />
          </CircleButton>
        </div>

        {/* BACK slot — expands between chat and pill when deeper than level 1 */}
        <AnimatePresence initial={false}>
          {showBack && (
            <motion.div
              key="back-slot"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: SLOT_W, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={transition}
              className="overflow-hidden shrink-0"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <div style={{ marginRight: GAP }}>
                <CircleButton
                  label="Go back"
                  onClick={onBack}
                  transition={transition}
                >
                  <IconChevronLeft size={ICON} stroke={2} aria-hidden />
                </CircleButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTER pill — constant outer shape; width animates to fit content */}
        <motion.div
          layout
          transition={transition}
          className="flex items-center rounded-full"
          style={{
            background: COLOR.fill,
            paddingInline: 8,
            paddingBlock: 5,
            minHeight: CIRCLE,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={top?.id ?? "empty"}
              initial={popInitial}
              animate={popAnimate}
              exit={popExit}
              transition={transition}
              className="flex items-center"
              style={{ gap: 4 }}
            >
              {actions.map((a) => (
                <PillAction key={a.id} action={a} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </nav>
  );
}

export default MorphingDock;
