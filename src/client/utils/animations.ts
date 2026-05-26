function revealOnScroll(root: ParentNode) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-animate]"));

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupHeaderMenu(root: ParentNode) {
  const header = root.querySelector<HTMLElement>("[data-header]");
  const toggle = root.querySelector<HTMLButtonElement>("[data-header-toggle]");
  const panel = root.querySelector<HTMLElement>("[data-header-panel]");
  const links = Array.from(root.querySelectorAll<HTMLElement>("[data-header-link]"));

  if (!header || !toggle) {
    return;
  }

  const isDesktopViewport = () => window.innerWidth > 980;

  const setOpen = (isOpen: boolean) => {
    const isDesktop = isDesktopViewport();
    const nextState = !isDesktop && isOpen;

    header.classList.toggle("site-header--menu-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
    toggle.setAttribute("aria-label", nextState ? "Fechar menu" : "Abrir menu");

    if (panel) {
      panel.setAttribute("aria-hidden", String(!isDesktop && !nextState));
    }
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.contains("site-header--menu-open");
    setOpen(!isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (isDesktopViewport() || !header.classList.contains("site-header--menu-open")) {
      return;
    }

    if (event.target instanceof Node && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (isDesktopViewport()) {
      setOpen(false);
    }
  });

  setOpen(false);
}

function setupProgramCarousel(root: ParentNode) {
  const carousels = Array.from(root.querySelectorAll<HTMLElement>("[data-program-carousel]"));

  carousels.forEach((carousel) => {
    const viewport = carousel.querySelector<HTMLElement>("[data-program-viewport]");
    const slides = Array.from(carousel.querySelectorAll<HTMLElement>("[data-program-slide]"));
    const dots = Array.from(carousel.querySelectorAll<HTMLButtonElement>("[data-program-dot]"));
    const prevButton = carousel.querySelector<HTMLButtonElement>("[data-program-prev]");
    const nextButton = carousel.querySelector<HTMLButtonElement>("[data-program-next]");
    const counter = carousel.querySelector<HTMLElement>("[data-program-counter]");

    if (!viewport || slides.length === 0 || !prevButton || !nextButton || !counter) {
      return;
    }

    let activeIndex = 0;

    const update = (nextIndex: number) => {
      activeIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
      const left = slides[activeIndex]?.offsetLeft ?? 0;

      viewport.scrollTo({
        left,
        behavior: "smooth"
      });

      counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      prevButton.disabled = activeIndex === 0;
      nextButton.disabled = activeIndex === slides.length - 1;

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
    };

    prevButton.addEventListener("click", () => update(activeIndex - 1));
    nextButton.addEventListener("click", () => update(activeIndex + 1));

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => update(index));
    });

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        update(activeIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        update(activeIndex + 1);
      }
    });

    update(0);
  });
}

export function setupInteractiveUi(root: ParentNode = document) {
  revealOnScroll(root);
  setupHeaderMenu(root);
  setupProgramCarousel(root);
}
