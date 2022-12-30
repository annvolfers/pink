const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

class Slider {
  constructor(blockElement) {
    this.sliderElement = blockElement.querySelector('.slider__list');
    if (!this.sliderElement) {
      return;
    }

    this.sliderButtonPrev = blockElement.querySelector('.slider__button-prev');
    this.sliderButtonNext = blockElement.querySelector('.slider__button-next');

    this.sliderTogglers = blockElement.querySelectorAll('.togglers .togglers__control');
    this.slidesNumber = this.sliderTogglers.length;

    this.step = Number((100 / this.slidesNumber).toFixed(2));
    this.sliderElement.style.setProperty('--slides', `${this.slidesNumber}`);

    if (this.slidesNumber < 2) {
      this.setButtonsAvailability(false);
      return;
    }

    for (let i = 0; i < this.sliderTogglers.length; i++) {
      if (this.sliderTogglers[i].classList.contains('togglers__control--current')) {
        this.activeSlideIndex = i;
      }
    }

    this.setListeners();
  }

  setListeners() {
    for (let i = 0; i < this.sliderTogglers.length; i++) {
      this.sliderTogglers[i].addEventListener('click', () => {
        this.setNewSlide(this.activeSlideIndex, i);
      });
    }

    if (this.sliderButtonPrev) {
      this.sliderButtonPrev.addEventListener('click', this.setPreviousSlide.bind(this));
    }

    if (this.sliderButtonNext) {
      this.sliderButtonNext.addEventListener('click', this.setNextSlide.bind(this));
    }

    if (isMobile) {
      const minTouchMoveDistance = 30;
      let touchstartPosition;
      let touchendPosition;

      this.sliderElement.addEventListener('touchstart', (evt) => {
        touchstartPosition = evt.touches[0].clientX;
      });

      this.sliderElement.addEventListener('touchend', (evt) => {
        touchendPosition = evt.changedTouches[0].clientX;

        if (Math.abs(touchendPosition - touchstartPosition) > minTouchMoveDistance) {
          if (touchendPosition > touchstartPosition) {
            this.setPreviousSlide();
          } else {
            this.setNextSlide();
          }
        }
      });
    }
  }

  setNewSlide(prevSlide, nextSlide) {
    this.sliderElement.style.setProperty('--transform', `translateX(-${this.step * nextSlide}%)`);

    this.sliderTogglers[prevSlide].classList.remove('togglers__control--current');
    this.sliderTogglers[nextSlide].classList.add('togglers__control--current');

    this.activeSlideIndex = nextSlide;

    this.setButtonsAvailability();
  }

  setPreviousSlide() {
    if (this.activeSlideIndex > 0) {
      this.setNewSlide(this.activeSlideIndex, this.activeSlideIndex - 1);
    }
  }

  setNextSlide() {
    if (this.activeSlideIndex < this.slidesNumber - 1) {
      this.setNewSlide(this.activeSlideIndex, this.activeSlideIndex + 1);
    }
  }

  setButtonsAvailability(availability = true) {
    if (!this.sliderButtonPrev || !this.sliderButtonNext) {
      return;
    }

    if (!availability) {
      this.sliderButtonPrev.disabled = true;
      this.sliderButtonNext.disabled = true;
      return;
    }

    switch (this.activeSlideIndex) {
      case 0:
        this.sliderButtonPrev.disabled = true;
        break;
      case this.slidesNumber - 1:
        this.sliderButtonNext.disabled = true;
        break;
      default:
        this.sliderButtonPrev.disabled = false;
        this.sliderButtonNext.disabled = false;
        break;
    }
  }
}

export { Slider };
