const photosList = document.querySelector('.photos__list');

if (photosList) {
  const documentWidth = parseInt(document.documentElement.clientWidth, 10);
  const windowsWidth = parseInt(window.innerWidth, 10);
  const scrollbWidth = windowsWidth - documentWidth;
  const panoramaPhotoLink = document.querySelector('.photo--panorama .photo__image-link');
  panoramaPhotoLink.style.setProperty('--scrollWidth', `${scrollbWidth}px`);

  photosList.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('photo__like-button')) {
      return;
    }

    const likeButton = evt.target;
    const likesNumberElement = likeButton.nextElementSibling.querySelector('.photo__like-number');
    let likesNumber = Number(likesNumberElement.textContent);
    if (likeButton.classList.contains('photo__like-button--active')) {
      likeButton.classList.remove('photo__like-button--active');
      likesNumberElement.textContent = --likesNumber;
      likeButton.querySelector('span').textContent = 'Поставить лайк.';
    } else {
      likeButton.classList.add('photo__like-button--active');
      likesNumberElement.textContent = ++likesNumber;
      likeButton.querySelector('span').textContent = 'Убрать лайк.';
    }
  });
}
