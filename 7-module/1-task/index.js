import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbonMenu = this._createRibbonMenu();

    this._addRibbonItems(this.ribbonMenu, this.categories);
    this._addArrows(this.ribbonMenu);
    this._addSelectCategory(this.ribbonMenu);
  }

  get elem() {
    return this.ribbonMenu;
  }

  _createRibbonMenu() {
    return createElement(`
      <div class="ribbon">
        <nav class="ribbon__inner"></nav>
      </div>
    `);
  }

  _addRibbonItems(ribbonMenu, categories) {
    const inner = ribbonMenu.querySelector('.ribbon__inner');

    inner.innerHTML += categories.map(category => {
      return `<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`;
    }).join(''); 
  }

  _addArrows(ribbonMenu) {
    const inner = ribbonMenu.querySelector('.ribbon__inner');
    const arrowRight = createArrowRight();
    const arrowLeft = createArrowLeft();

    ribbonMenu.append(arrowRight);
    ribbonMenu.prepend(arrowLeft);

    inner.addEventListener('scroll', () => toggleDisplayArrow(inner));
    arrowRight.addEventListener('click', () => inner.scrollBy(350, 0));
    arrowLeft.addEventListener('click', () => inner.scrollBy(-350, 0));

    function createArrowRight() {
      return createElement(`
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      `);
    }

    function createArrowLeft() {
      return createElement(`
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      `);
    }

    function toggleDisplayArrow(inner) {
      const scrollWidth = inner.scrollWidth;
      const scrollLeft = inner.scrollLeft;
      const clientWidth = inner.clientWidth;

      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    }
  }

  _addSelectCategory(ribbonMenu) {
    const items = ribbonMenu.querySelectorAll('.ribbon__item');

    for (let item of items) {
      item.addEventListener('click', event => {
        event.preventDefault();
        addEventRibbonSelect(item);
        addToggleActiveStyle(item);
      });
    }

    function addEventRibbonSelect(item) {
      const ribbonSelect = new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true,
      });

      item.dispatchEvent(ribbonSelect);
    }

    function addToggleActiveStyle(item) {
      const otherItems = item.closest('.ribbon__inner').children;

      for (let otherItem of otherItems) {
        otherItem.classList.remove('ribbon__item_active');  
      }
      
      item.classList.add('ribbon__item_active');
    }
  }
}
