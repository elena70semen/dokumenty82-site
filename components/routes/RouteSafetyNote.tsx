import { BrandIcon } from "@/components/brand/BrandIcon";

type RouteSafetyNoteProps = {
  note: string;
};

export function RouteSafetyNote({ note }: RouteSafetyNoteProps) {
  return (
    <section
      className="dimmed-page-section py-8"
      aria-label="Важное уточнение"
    >
      <div className="container-premium">
        <div className="dark-glass-card grid gap-4 rounded-[8px] p-5 md:grid-cols-[48px_1fr] md:items-center">
          <span className="dark-glass-icon">
            <BrandIcon name="shield" size={24} />
          </span>
          <p className="text-base font-semibold leading-7 text-[color:var(--text-inverse-muted)]">{note}</p>
        </div>
      </div>
    </section>
  );
}
