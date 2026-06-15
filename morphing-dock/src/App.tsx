import { useRef, useState } from "react";
import { HomeIcon, GoalIcon, RecordsIcon, ProfileIcon } from "./icons/NavIcons";
import { MorphingDock, type DockLevel } from "./MorphingDock";
import { Dashboard } from "./screens/Dashboard";
import { Insights } from "./screens/Insights";
import "./App.css";

/* BioBuddy MVP shell. Two home pages — Dashboard and Insights — swipe
   horizontally; pagination dots track the active page. The dock floats over
   both as the top-level wayfinder. */

const PAGES = ["Dashboard", "Insights"];

export function App() {
  const [tab, setTab] = useState("dashboard");
  const [page, setPage] = useState(0);
  const pagerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = pagerRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== page) setPage(next);
  }

  function goToPage(i: number) {
    const el = pagerRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  const home: DockLevel = {
    id: "home",
    title: "BioBuddy",
    actions: [
      { id: "dashboard", icon: HomeIcon, label: "Home", active: tab === "dashboard", onPress: () => setTab("dashboard") },
      { id: "goals", icon: GoalIcon, label: "Goals", active: tab === "goals", onPress: () => setTab("goals") },
      { id: "records", icon: RecordsIcon, label: "Records", active: tab === "records", onPress: () => setTab("records") },
      { id: "profile", icon: ProfileIcon, label: "Profile", active: tab === "profile", onPress: () => setTab("profile") },
    ],
  };

  return (
    <div className="app-root">
      <div className="app-screen">
        <div className="app-pager" ref={pagerRef} onScroll={handleScroll}>
          <div className="app-page">
            <Dashboard />
          </div>
          <div className="app-page">
            <Insights />
          </div>
        </div>

        <div className="app-bottom">
          <div className="app-bottom__fade" aria-hidden />
          <div className="dots">
            {PAGES.map((name, i) => (
              <button
                key={name}
                className={i === page ? "dot dot--active" : "dot"}
                aria-label={`Go to ${name}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => goToPage(i)}
              />
            ))}
          </div>
          <MorphingDock
            stack={[home]}
            onBack={() => {}}
            onChat={() => console.log("Open BioBuddy chat")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
