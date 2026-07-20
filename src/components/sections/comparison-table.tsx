import { Check, Minus } from "lucide-react";
import type { ComparisonRow } from "@/types/pricing";

const ROWS: ComparisonRow[] = [
  { feature: "Weekly structured lessons", group: true, private: true },
  { feature: "Class size", group: "Up to 6 students", private: "1:1" },
  { feature: "Personalised to weak areas", group: false, private: true },
  { feature: "Progress reports", group: "Termly", private: "Per session" },
  { feature: "First session available as a trial", group: true, private: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-emerald-600" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-muted/40" />
    );
  }
  return <span className="text-sm text-ink/80">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-cream-dark/60">
            <th className="px-5 py-4 font-semibold text-navy">Feature</th>
            <th className="px-5 py-4 text-center font-semibold text-navy">Group Tuition</th>
            <th className="px-5 py-4 text-center font-semibold text-navy">Private Tuition</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-cream/40"}>
              <td className="px-5 py-3.5 font-medium text-ink/85">{row.feature}</td>
              <td className="px-5 py-3.5 text-center">
                <Cell value={row.group} />
              </td>
              <td className="px-5 py-3.5 text-center">
                <Cell value={row.private} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
