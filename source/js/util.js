const isOutsideClick = (evt, elementSelector) => !evt.target.closest(elementSelector);

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isOutsideClick, isEscapeKey };
