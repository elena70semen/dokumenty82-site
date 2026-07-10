(() => {
  const feed = document.querySelector("[data-news-feed]");
  const controls = document.querySelector("[data-news-feed-controls]");
  if (!feed || !controls) return;

  const cards = Array.from(feed.querySelectorAll(".news-card"));
  const previousButton = controls.querySelector("[data-news-feed-prev]");
  const nextButton = controls.querySelector("[data-news-feed-next]");
  const position = controls.querySelector("[data-news-feed-position]");
  if (!cards.length || !previousButton || !nextButton || !position) return;

  controls.hidden = false;

  function cardOffset(card) {
    return card.offsetLeft;
  }

  function currentIndex() {
    return cards.reduce((bestIndex, card, index) => {
      const currentDistance = Math.abs(cardOffset(card) - feed.scrollLeft);
      const bestDistance = Math.abs(cardOffset(cards[bestIndex]) - feed.scrollLeft);
      return currentDistance < bestDistance ? index : bestIndex;
    }, 0);
  }

  function updateControls() {
    const index = currentIndex();
    position.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    previousButton.disabled = feed.scrollLeft <= 4;
    nextButton.disabled = feed.scrollLeft + feed.clientWidth >= feed.scrollWidth - 4;
  }

  function goToCard(index) {
    const target = cards[Math.max(0, Math.min(cards.length - 1, index))];
    feed.scrollTo({ left: cardOffset(target), behavior: "smooth" });
  }

  previousButton.addEventListener("click", () => goToCard(currentIndex() - 1));
  nextButton.addEventListener("click", () => goToCard(currentIndex() + 1));
  feed.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goToCard(currentIndex() + (event.key === "ArrowRight" ? 1 : -1));
  });
  feed.addEventListener("scroll", updateControls, { passive: true });

  if ("ResizeObserver" in window) {
    new ResizeObserver(updateControls).observe(feed);
  }

  updateControls();
})();
