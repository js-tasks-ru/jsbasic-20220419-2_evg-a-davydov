import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    if ( isVisible(this.elem) && isDesktop() ){
      
      if ( isNotMarginTop(this.elem) ) {
        const marginLeft = document.querySelector('.container').getBoundingClientRect().right + 20;
        const marginRight = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
        const position = Math.min(marginLeft, marginRight);

        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '50px',
          zIndex: 1e3,
          right: '10px',
          left: `${position}px`,
        });
      } else {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: '',
        });
      }
    }

    function isVisible(elem) {
      return elem.offsetWidth && elem.offsetHeight;
    }

    function isDesktop() {
      const documentWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );
      return documentWidth > 767;
    }

    function isNotMarginTop(elem) {
      return elem.getBoundingClientRect().top < window.pageYOffset;
    }
  }
}
