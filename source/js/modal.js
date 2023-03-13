import { isOutsideClick, isEscapeKey } from './util.js';

class Modal {
  constructor(selector) {
    this.modal = document.querySelector(selector);
    this.modalContentSelector = '.modal__content';
    this.modalButton = this.modal.querySelector('.modal__button');
  }

  openModal() {
    this.modal.classList.add('modal--open');
    document.body.classList.add('page--do-not-scroll');
    this.modal.addEventListener('click', this.modalButtonClickHandler.bind(this));
    document.addEventListener('click', this.outsideClickHandler.bind(this));
    document.addEventListener('keydown', this.escKeydownHandler.bind(this));
  }

  closeModal() {
    this.modal.classList.remove('modal--open');
    document.body.classList.remove('page--do-not-scroll');
    this.modal.removeEventListener('click', this.modalButtonClickHandler.bind(this));
    document.removeEventListener('click', this.outsideClickHandler.bind(this));
    document.removeEventListener('keydown', this.escKeydownHandler.bind(this));
  }

  outsideClickHandler(evt) {
    if (isOutsideClick(evt, this.modalContentSelector)) {
      this.closeModal();
    }
  }

  modalButtonClickHandler(evt) {
    if (evt.target === this.modalButton) {
      this.closeModal();
    }
  }

  escKeydownHandler(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.closeModal();
    }
  }
}

export { Modal };
