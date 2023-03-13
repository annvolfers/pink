import { sendData } from './api.js';
import { Modal } from './modal.js';

const form = document.querySelector('.form');

if (form) {
  const pristine = new Pristine(form, {
    classTo: 'field',
    errorClass: 'field--error'
  });

  const fieldsToValidate = form.querySelectorAll('.field__input');
  const submitButton = form.querySelector('.form__button');

  const modalValidateError = new Modal('.modal--form-validate-error');
  const modalSendError = new Modal('.modal--form-send-error');
  const modalSuccess = new Modal('.modal--form-success');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate(fieldsToValidate);
    if (isValid) {
      submitButton.disabled = true;
      sendData(
        () => {
          modalSuccess.openModal();
          submitButton.disabled = false;

          form.reset();
          pristine.reset();
        },
        () => {
          modalSendError.openModal();
          submitButton.disabled = false;
        },
        new FormData(evt.target)
      );
    } else {
      modalValidateError.openModal();
    }
  });
}
