const currentYear = document.querySelector("#year");
const revealItems = document.querySelectorAll(".reveal");
const slides = document.querySelectorAll(".project-slide");
const previousButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const currentSlideLabel = document.querySelector(".progress-current");
const progressBar = document.querySelector(".progress-track i");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active-slide", slideIndex === activeSlide);
  });
  if (currentSlideLabel) currentSlideLabel.textContent = String(activeSlide + 1).padStart(2, "0");
  if (progressBar) progressBar.style.width = `${((activeSlide + 1) / slides.length) * 100}%`;
}

previousButton?.addEventListener("click", () => showSlide(activeSlide - 1));
nextButton?.addEventListener("click", () => showSlide(activeSlide + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(activeSlide - 1);
  if (event.key === "ArrowRight") showSlide(activeSlide + 1);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
