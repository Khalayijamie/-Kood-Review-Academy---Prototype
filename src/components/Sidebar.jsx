import { NavLink } from "react-router-dom";
import { academy } from "../data/reviewAcademy";

function NavItem({ to, label, sub }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "block px-3 py-2 rounded-lg text-sm transition",
          isActive ? "bg-[#1a232e] text-white" : "text-gray-400 hover:text-white",
        ].join(" ")
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span className="truncate">{label}</span>
        {sub ? <span className="text-xs text-gray-500">{sub}</span> : null}
      </div>
    </NavLink>
  );
}

export default function Sidebar() {
  const steps = academy.modules.filter(
    (m) => m.id === "intro" || m.id === "categories" || m.type === "category" || m.id === "ground-rules"
  );

  return (
    <div className="w-72 bg-[#0b1117] border-r border-gray-800 p-5 flex flex-col">
      <div className="text-2xl font-bold mb-6">//kood</div>

      <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">
        {academy.sprintTitle}
      </div>

      <div className="space-y-1 overflow-y-auto pr-1">
        {steps.map((s, idx) => (
          <NavItem
            key={s.id}
            to={s.id === "intro" ? "/" : `/academy/${s.id}`}
            label={`${idx + 1}. ${s.title}`}
            sub={s.estimatedMins ? `${s.estimatedMins}m` : ""}
          />
        ))}
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