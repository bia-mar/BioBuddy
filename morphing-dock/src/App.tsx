import { useState } from "react";
import { HomeIcon, GoalIcon, RecordsIcon, ProfileIcon } from "./icons/NavIcons";
import { MorphingDock, type DockLevel } from "./MorphingDock";
import { Dashboard } from "./screens/Dashboard";
import "./App.css";

/* BioBuddy MVP shell. For now a single screen (Dashboard) at L1 with the dock
   as the top-level wayfinder. As more screens land, this grows into a stack. */

export function App() {
  const [tab, setTab] = useState("dashboard");

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
        <div className="app-scroll">
          <Dashboard />
        </div>

        <div className="app-bottom">
          <div className="app-bottom__fade" aria-hidden />
          <div className="dots" aria-hidden>
            <span className="dot dot--active" />
            <span className="dot" />
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
