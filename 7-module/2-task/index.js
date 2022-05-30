import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this._createModal();
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.modal.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');

    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }

  _createModal() {
    const modal = createModal();
    const closeButton = modal.querySelector('.modal__close');

    closeButton.addEventListener('click', () => this.close());

    document.documentElement.addEventListener('keydown', event => {
      if(event.code === 'Escape') {
        this.close();
      }
    });

    return modal;

    function createModal() {
      return createElement(`
        <div class="modal">
          <!--Прозрачная подложка перекрывающая интерфейс-->
          <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <!--Кнопка закрытия модального окна-->
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>

              <h3 class="modal__title">
                Вот сюда нужно добавлять заголовок
              </h3>
            </div>

            <div class="modal__body">
              A сюда нужно добавлять содержимое тела модального окна
            </div>
          </div>

        </div>
      `);
    }
  }
}
