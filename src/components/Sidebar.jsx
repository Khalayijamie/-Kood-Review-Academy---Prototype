import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { academy } from "../data/reviewAcademy";

function NavItem({ to, label, sub, isExpandable, isExpanded, onToggle, isCompleted }) {
  if (isExpandable) {
    return (
      <button
        onClick={onToggle}
        className="w-full px-3 py-2 rounded-lg text-sm transition text-left text-gray-400 hover:text-white hover:bg-[#1a232e] flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isCompleted && <span className="text-koodAccent text-lg shrink-0">✓</span>}
          <span className="truncate">{label}</span>
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-2">
          {sub ? <span>{sub}</span> : null}
          <span className="transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            ▼
          </span>
        </span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex px-3 py-2 rounded-lg text-sm transition items-center justify-between gap-3",
          isActive ? "bg-[#1a232e] text-white" : "text-gray-400 hover:text-white",
        ].join(" ")
      }
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {isCompleted && <span className="text-koodAccent text-lg shrink-0">✓</span>}
        <span className="truncate">{label}</span>
      </div>
      {sub ? <span className="text-xs text-gray-500">{sub}</span> : null}
    </NavLink>
  );
}

export default function Sidebar() {
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [completedModules, setCompletedModules] = useState(new Set());
  const location = useLocation();
  const nav = useNavigate();

  const steps = academy.modules.filter(
    (m) => m.id === "intro" || m.id === "categories" || m.type === "category" || m.id === "ground-rules"
  );

  // Track which module the user is visiting
  useEffect(() => {
    const pathname = location.pathname;
    let moduleId = null;

    if (pathname === "/") {
      moduleId = "intro";
    } else if (pathname === "/academy/categories") {
      moduleId = "categories";
    } else if (pathname === "/academy/ground-rules") {
      moduleId = "ground-rules";
    } else if (pathname.startsWith("/academy/")) {
      // Extract module id from paths like /academy/cat-functional or /academy/cat-functional/practice
      const match = pathname.match(/\/academy\/([^/]+)/);
      if (match) {
        const id = match[1];
        // Check if it's a valid category module
        const isCategory = ["cat-functional", "cat-errors", "cat-readability", "cat-architecture", "cat-perfsec"].includes(id);
        if (isCategory) {
          moduleId = id;
        }
      }
    }

    if (moduleId) {
      setCompletedModules((prev) => {
        if (prev.has(moduleId)) {
          return prev; // No change needed
        }
        const next = new Set(prev);
        next.add(moduleId);
        // Persist to localStorage
        localStorage.setItem("completedModules", JSON.stringify([...next]));
        return next;
      });
    }
  }, [location.pathname]);

  // Load completion state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("completedModules");
    if (saved) {
      try {
        setCompletedModules(new Set(JSON.parse(saved)));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const getLabel = (module) => {
    if (module.id === "intro") return "1. " + module.title;
    if (module.id === "categories") return "2. " + module.title;
    if (module.type === "category") {
      const categoryIndex = steps.filter((m) => m.type === "category").indexOf(module) + 1;
      return `2.${categoryIndex}. ${module.title}`;
    }
    if (module.id === "ground-rules") return "3. " + module.title;
    return module.title;
  };

  // Calculate progress
  const totalModules = steps.length;
  const completedCount = completedModules.size;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="w-72 bg-[#0b1117] border-r border-gray-800 p-5 flex flex-col">
      <div className="text-2xl font-bold mb-6">//kood</div>

      <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">
        {academy.sprintTitle}
      </div>

      {/* Progress Bar */}
      <div className="mb-4 pb-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-koodAccent font-semibold">{completedCount}/{totalModules}</span>
        </div>
        <div className="w-full bg-[#1a232e] rounded-full h-2 overflow-hidden">
          <div
            className="bg-koodAccent h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-1 overflow-y-auto pr-1">
        {steps.map((s) => {
          const isModuleCompleted = completedModules.has(s.id);

          // If it's a category item and categories are not expanded, skip rendering it
          if (s.type === "category" && !isCategoriesExpanded) {
            return null;
          }

          // If it's expandable (categories), show toggle UI
          if (s.id === "categories") {
            return (
              <NavItem
                key={s.id}
                label={getLabel(s)}
                sub={s.estimatedMins ? `${s.estimatedMins}m` : ""}
                isExpandable={true}
                isExpanded={isCategoriesExpanded}
                onToggle={() => {
                  nav("/academy/categories");
                  setIsCategoriesExpanded(true);
                }}
                isCompleted={isModuleCompleted}
              />
            );
          }

          // For sub-items, add extra padding to indicate nesting
          if (s.type === "category") {
            return (
              <div key={s.id} className="pl-4">
                <NavItem
                  to={`/academy/${s.id}`}
                  label={getLabel(s)}
                  sub={s.estimatedMins ? `${s.estimatedMins}m` : ""}
                  isCompleted={isModuleCompleted}
                />
              </div>
            );
          }

          // Regular items
          return (
            <NavItem
              key={s.id}
              to={s.id === "intro" ? "/" : `/academy/${s.id}`}
              label={getLabel(s)}
              sub={s.estimatedMins ? `${s.estimatedMins}m` : ""}
              isCompleted={isModuleCompleted}
            />
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-800 text-gray-500 text-sm">
        <div className="flex items-center justify-between">
          <span>Dark</span>
          <span className="text-xs">v/rc-864</span>
        </div>
        <div className="mt-3 text-gray-400">Jamie Nangulu</div>
        <div className="mt-1 text-gray-600">Log out</div>
      </div>
    </div>
  );
}