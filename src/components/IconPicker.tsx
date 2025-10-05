// components/IconPicker.tsx
import { useMemo, useState } from "react";
import { icons } from "lucide-react"; // мапа всіх іконок
import { createElement } from "react";

type IconKey = keyof typeof icons;

type IconPickerProps = {
  value?: IconKey | null;
  onChange: (name: IconKey) => void;
  popular?: IconKey[]; // необов'язково: можна передати список «топ» іконок
};

const DEFAULT_POPULAR: IconKey[] = [
  "Code",
  "Wrench",
  "Globe",
  "Server",
  "Zap",
  "Settings",
  "Shield",
  "Database",
  "Smartphone",
  "Monitor",
  "Palette",
  "PenTool",
  "Link",
  "Cloud",
  "Bug",
];

export default function IconPicker({
  value,
  onChange,
  popular = DEFAULT_POPULAR,
}: IconPickerProps) {
  const [query, setQuery] = useState("");

  const allIconNames = useMemo(() => Object.keys(icons) as IconKey[], []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return popular; // показуємо популярні за замовчуванням
    return allIconNames
      .filter((n) => n.toLowerCase().includes(q))
      .slice(0, 100);
  }, [query, allIconNames, popular]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Поиск иконки (например: code, cloud)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          aria-label="Поиск иконки"
        />
        {value && (
          <div className="flex items-center gap-2 px-3 py-2 border rounded bg-gray-50">
            <span className="text-sm text-gray-600">Выбрано:</span>
            {createElement(icons[value], { size: 20 })}
            <span className="text-sm">{value}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-10">
        {filtered.map((name) => {
          const IconComp = icons[name];
          const selected = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`flex flex-col items-center gap-1 p-2 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400
                ${selected ? "border-blue-500" : "border-gray-200"}`}
              aria-pressed={selected}
              title={name}
            >
              {createElement(IconComp, { size: 24 })}
            </button>
          );
        })}
      </div>
    </div>
  );
}
