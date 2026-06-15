import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="section-pad dimmed-page-section">
        <div className="container-premium grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow-line">404</p>
            <h1 className="display-serif mt-6 text-6xl font-semibold leading-[0.98] text-[color:var(--text-inverse)] md:text-8xl">
              Страница
              <br />
              <span className="script-accent">не найдена</span>
            </h1>
            <p className="mt-7 text-xl leading-9 text-[color:var(--text-inverse-muted)]">Проверьте адрес или вернитесь на главную страницу.</p>
            <Link href="/" className="mt-9 inline-flex rounded-full bg-[var(--lime-signal)] px-7 py-4 text-sm font-black text-[color:var(--lime-text)]">
              На главную
            </Link>
          </div>
          <img src="/assets/images/office-reception.png" alt="Офис центра подготовки документов" className="rounded-[8px] shadow-[0_24px_74px_rgba(22,40,68,0.16)]" />
        </div>
      </section>
    </main>
  );
}
