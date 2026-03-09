export function Card({ children, className = "" }) {
  return (
    <div className={`bg-koodCard rounded-xl border border-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div className="p-8 pb-0 flex items-start justify-between gap-6">
      <div>
        <div className="text-gray-400 text-sm mb-2">Mandatory</div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle ? (
          <p className="text-gray-300 mt-3 max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({ children }) {
  return <div className="p-8 pt-6">{children}</div>;
}

export function Button({ children, onClick, variant = "primary", className = "" }) {
  const base =
    "px-5 py-3 rounded-lg font-semibold transition active:scale-[0.99]";
  const styles =
    variant === "primary"
      ? "bg-koodAccent text-black hover:brightness-95"
      : "bg-[#2a3645] text-white border border-gray-700 hover:bg-[#324155]";
  return (
    <button className={`${base} ${styles} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function Pill({ children, tone = "neutral" }) {
  const map = {
    neutral: "bg-[#243241] text-gray-200 border-gray-700",
    core: "bg-[#243241] text-white border-gray-700",
    advanced: "bg-[#1f2b21] text-white border-[#2b6b3f]",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs ${map[tone]}`}
    >
      {children}
    </span>
  );
}