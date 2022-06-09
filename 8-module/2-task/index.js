import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
    `);

    this.addProductCards(this.products);
  }

  addProductCards(products) {
    const cards = this.elem.querySelector('.products-grid__inner');

    for (let product of products) {
      const card = new ProductCard(product);
      cards.append(card.elem);
    }
  }

  updateFilter(filters) {
    for (let filter in filters){
      this.filters[filter] = filters[filter];
    }

    const filter = new Filters(this.filters, this.products);

    const results = filter.products;

    const cards = this.elem.querySelector('.products-grid__inner');
    cards.innerHTML = '';

    for (let result of results) {
      const card = new ProductCard(result);
      cards.append(card.elem);     
    }
  }
}

class Filters {
  constructor(filters, products) {
    this.filters = filters;
    this.products = products;

    for (let filter in filters) {
      if (filter === 'noNuts') {
        this.except(filters[filter]);
      }

      if (filter === 'vegeterianOnly') {
        this.only(filters[filter]);
      }

      if (filter === 'maxSpiciness') {
        this.lessThen(filters[filter]);
      }

      if (filter === 'category') {
        this.category(filters[filter]);
      }
    }
  }

  only(filter) {
    if (filter) {
      this.products = this.products.filter(elem => elem.vegeterian === true);
    }
  }

  except(filter) {
    if (filter) {
      this.products = this.products.filter(elem => !(elem.nuts === true));
    }
  }

  lessThen(filter) {
    this.products = this.products.filter(elem => elem.spiciness <= filter);
  }

  category(filter) {
    if (filter) {
      this.products = this.products.filter(elem => elem.category === filter);
    }
  }
}