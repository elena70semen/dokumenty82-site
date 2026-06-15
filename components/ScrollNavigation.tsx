"use client";

function scrollToPosition(top: number) {
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth"
  });
}

function move(direction: "up" | "down") {
  if (direction === "up") {
    scrollToPosition(0);
    return;
  }

  const footer = document.querySelector<HTMLElement>("footer");
  const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : document.documentElement.scrollHeight;
  scrollToPosition(footerTop);
}

export function ScrollNavigation() {
  const navLabel =
    "\u0411\u044b\u0441\u0442\u0440\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f \u043f\u043e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435";
  const previousLabel =
    "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0448\u0430\u043f\u043a\u0435";
  const nextLabel =
    "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u043a \u0444\u0443\u0442\u0435\u0440\u0443";

  return (
    <nav
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
      aria-label={navLabel}
      data-no-reveal
    >
      <button
        type="button"
        className="grid size-11 place-items-center rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(10,16,26,0.68)] text-xl font-semibold text-[color:var(--text-inverse)] shadow-[0_14px_34px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[14px] transition hover:-translate-y-0.5 hover:border-[rgba(159,203,22,0.36)] hover:bg-[rgba(14,23,34,0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
        aria-label={previousLabel}
        onClick={() => move("up")}
      >
        <span aria-hidden="true">{"\u2191"}</span>
      </button>
      <button
        type="button"
        className="grid size-11 place-items-center rounded-[8px] border border-[rgba(255,255,255,0.14)] bg-[rgba(10,16,26,0.68)] text-xl font-semibold text-[color:var(--text-inverse)] shadow-[0_14px_34px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[14px] transition hover:translate-y-0.5 hover:border-[rgba(159,203,22,0.36)] hover:bg-[rgba(14,23,34,0.78)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-on-dark)]"
        aria-label={nextLabel}
        onClick={() => move("down")}
      >
        <span aria-hidden="true">{"\u2193"}</span>
      </button>
    </nav>
  );
}
