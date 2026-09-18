// Tandai bahwa JavaScript berhasil jalan.
document.documentElement.classList.add("js");

// ---------- Tahun otomatis di footer ----------
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---------- Menu mobile (hamburger) ----------
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu otomatis saat salah satu link diklik
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Tutup menu jika mengklik di luar area navbar
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- Flip card foto profil ----------
  const flipCard = document.getElementById("flipCard");

  if (flipCard) {
    let flipTimeout;

    const flipBack = () => {
      flipCard.classList.remove("flipped");
    };

    const doFlip = () => {
      // Kalau sedang terbalik dan diklik lagi, langsung balik ke depan
      if (flipCard.classList.contains("flipped")) {
        clearTimeout(flipTimeout);
        flipBack();
        return;
      }
      flipCard.classList.add("flipped");
      clearTimeout(flipTimeout);
      flipTimeout = setTimeout(flipBack, 3000);
    };

    flipCard.addEventListener("click", doFlip);

    // Aksesibilitas: bisa dipicu dengan keyboard (Enter / Spasi)
    flipCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        doFlip();
      }
    });
  }
});

// ---------- Reveal section saat discroll ----------
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));

  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }, 1500);
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}
