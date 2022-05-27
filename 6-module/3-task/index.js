import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    const carousel = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner"></div>
      </div>
    `)

    const inner = carousel.querySelector('.carousel__inner');

    inner.innerHTML += slides.map(slide => {
      return `
        <div class="carousel__slide" data-id=${slide.id}>
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">${'€' + slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `
    }).join('');

    const arrowRight = carousel.querySelector('.carousel__arrow_right');
    const arrowLeft = carousel.querySelector('.carousel__arrow_left');

    let positionX = 0;

    arrowLeft.style.display = 'none';

    carousel.addEventListener('click', () => {
      arrowLeft.style.display = (positionX === 0) ? 'none' : '';
      arrowRight.style.display = (positionX === -inner.offsetWidth * (slides.length - 1) ) ? 'none' : '';
    });

    arrowRight.addEventListener('click', () => inner.style.transform = `translateX(${positionX -= inner.offsetWidth}px)`);
    arrowLeft.addEventListener('click', () => inner.style.transform = `translateX(${positionX += inner.offsetWidth}px)`);

    const buttons = carousel.querySelectorAll('.carousel__button');

    for (let button of buttons) {
      button.addEventListener('click', () => {
        const productAdd = new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true,
        });
  
        carousel.dispatchEvent(productAdd);
      });
    }
    
    this.slides = slides;
    this.carousel = carousel;
  }

  get elem() {
    return this.carousel;
  }
}
