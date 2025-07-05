// Simple slider logic for the main page image slider
const slides = document.querySelectorAll('#mainSlider img');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
function showSlide(idx) {
  slides.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
}
if (slides.length && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
  // Optional: auto-slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
  // Show the first slide initially
  showSlide(currentSlide);
} 