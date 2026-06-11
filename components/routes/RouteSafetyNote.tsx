import { BrandIcon } from "@/components/brand/BrandIcon";
import { brandTokens } from "@/lib/brand/brand-tokens";

type RouteSafetyNoteProps = {
  note: string;
};

export function RouteSafetyNote({ note }: RouteSafetyNoteProps) {
  return (
    <section
      className="bg-[var(--surface-raised)] py-8"
      aria-label="Важное уточнение"
      style={{ backgroundImage: brandTokens.gradients.quietAccent }}
    >
      <div className="container-premium">
        <div className="grid gap-4 rounded-[8px] border border-[var(--line)] bg-[var(--surface-raised-soft)] p-5 shadow-[var(--shadow-card-sm)] md:grid-cols-[48px_1fr] md:items-center">
          <span className="grid size-12 place-items-center rounded-[8px] bg-[var(--accent-navy-bg)] text-[color:var(--navy)]">
            <BrandIcon name="shield" size={24} />
          </span>
          <p className="text-base font-bold leading-7 text-[color:var(--text-secondary)]">{note}</p>
        </div>
      </div>
    </section>
  );
}
