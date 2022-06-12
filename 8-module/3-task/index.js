export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
     // ваш код
    if ( !(product) ) {
      return;
    }

    if ( !(this.cartItems.find(cartItem => cartItem.product.id === product.id)) ) {
      this.cartItems.push({product, count: 1});
    } else {
      this.cartItems.forEach(cartItem => {
        if (cartItem.product.id === product.id) cartItem.count++
      });
    }
    
    this.cartItems.forEach(cartItem => {
      this.onProductUpdate(cartItem);
    })
  }

  updateProductCount(productId, amount) {
    // ваш код
    for (let cartItem of this.cartItems){
      if (cartItem.product.id === productId && amount > 0) {
        cartItem.count++;
      } else {
        cartItem.count--;

        if (cartItem.count === 0) {
          this.cartItems.splice(cartItem);
        }
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    // ваш код
    return !(this.cartItems.length);
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((totalCount, current) => {
      return totalCount + current.count;
    }, 0);
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((totalPrice, current) => {
      return totalPrice + current.product.price * current.count;
    }, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

