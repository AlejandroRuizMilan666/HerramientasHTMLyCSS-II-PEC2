/**
 * Import dependencies from node_modules
 */
import { Collapse } from "bootstrap";

/**
 * Expand / collapse all accordion items — used in libre.html
 */
(function initAccordionControls() {
  const expandBtn = document.getElementById("expandAll");
  const collapseBtn = document.getElementById("collapseAll");
  if (!expandBtn || !collapseBtn) return;

  const collapses = document.querySelectorAll(".accordion-collapse");

  expandBtn.addEventListener("click", () => {
    collapses.forEach((el) => {
      Collapse.getOrCreateInstance(el, { toggle: false }).show();
    });
  });

  collapseBtn.addEventListener("click", () => {
    collapses.forEach((el) => {
      Collapse.getOrCreateInstance(el, { toggle: false }).hide();
    });
  });
})();

/**
 * Workshop filter logic — used in libre.html (agenda page)
 */
(function initWorkshopFilters() {
  const filterButtons = document.querySelectorAll(".agenda-filters__btn");
  if (!filterButtons.length) return;

  const workshopItems = document.querySelectorAll(".workshop-item");
  const visibleCount = document.getElementById("agenda-visible-count");
  const emptyMsg = document.getElementById("agenda-empty");

  /**
   * Filter workshops by category.
   * @param {string} category - The category slug or "all".
   */
  function filterWorkshops(category) {
    let count = 0;

    workshopItems.forEach((item) => {
      const matches = category === "all" || item.dataset.category === category;
      item.classList.toggle("is-hidden", !matches);
      if (matches) count++;
    });

    if (visibleCount) visibleCount.textContent = count;
    if (emptyMsg) emptyMsg.hidden = count > 0;
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update aria-pressed states
      filterButtons.forEach((b) => {
        b.setAttribute("aria-pressed", "false");
        b.classList.remove("agenda-filters__btn--active");
      });
      btn.setAttribute("aria-pressed", "true");
      btn.classList.add("agenda-filters__btn--active");

      filterWorkshops(btn.dataset.filter);
    });
  });
})();

