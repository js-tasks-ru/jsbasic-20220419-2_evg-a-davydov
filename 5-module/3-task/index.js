function initCarousel() {
  // ваш код...
  const carousel = document.querySelector('.carousel');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const inner = document.querySelector('.carousel__inner');
  let positionX = 0;

  arrowLeft.style.display = 'none';

  carousel.addEventListener('click', () => {
    arrowLeft.style.display = (positionX === 0) ? 'none' : '';
    arrowRight.style.display = (positionX === -inner.offsetWidth * 3) ? 'none' : '';
  });

  arrowRight.addEventListener('click', () => inner.style.transform = `translateX(${positionX -= inner.offsetWidth}px)`);

  arrowLeft.addEventListener('click', () => inner.style.transform = `translateX(${positionX += inner.offsetWidth}px)`);
}
