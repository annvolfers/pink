class AddPhoto {
  constructor(blockElement) {
    this.form = blockElement.querySelector('.add-photo__form');
    this.photoChooser = this.form.querySelector('.add-photo__photo-chooser');
    this.photoChooserInput = this.form.querySelector('[name="image"]');
    this.filterButtons = this.form.querySelector('.add-photo__filters');
    this.filterButtonActive = this.filterButtons.querySelector('.add-photo__filter-button--active');
    this.cropRange = this.filterButtons.querySelector('[name="crop"]');
    this.saturationRange = this.filterButtons.querySelector('[name="saturation"]');
    this.contrastRange = this.filterButtons.querySelector('[name="contrast"]');

    this.setListeners();
  }

  setListeners() {
    this.filtersClickHandler = this.filtersClickHandler.bind(this);
    this.cropInputHandler = this.cropInputHandler.bind(this);
    this.saturationInputHandler = this.saturationInputHandler.bind(this);
    this.contrastInputHandler = this.contrastInputHandler.bind(this);
    this.photoChangeHandler = this.photoChangeHandler.bind(this);
    this.formResetHandler = this.formResetHandler.bind(this);

    this.filterButtons.addEventListener('click', this.filtersClickHandler);
    this.cropRange.addEventListener('input', this.cropInputHandler);
    this.saturationRange.addEventListener('input', this.saturationInputHandler);
    this.contrastRange.addEventListener('input', this.contrastInputHandler);
    this.photoChooserInput.addEventListener('change', this.photoChangeHandler);
    this.form.addEventListener('reset', this.formResetHandler);
  }

  filtersClickHandler(evt) {
    if (!evt.target.classList.contains('add-photo__filter-button')) {
      return;
    }

    const filter = evt.target;

    this.filterButtonActive.classList.remove('add-photo__filter-button--active');
    filter.classList.add('add-photo__filter-button--active');
    this.filterButtonActive = filter;
  }

  cropInputHandler() {
    this.photoChooser.style.setProperty('--size', `${this.cropRange.value}%`);
  }

  saturationInputHandler() {
    this.photoChooser.style.setProperty('--saturation', `${0.98 + (this.saturationRange.value - 49) / 100 * 2}`);
  }

  contrastInputHandler() {
    this.photoChooser.style.setProperty('--contrast', `${0.99 + (this.contrastRange.value - 49) / 100}`);
  }

  photoChangeHandler() {
    const file = this.photoChooserInput.files[0];
    const fileName = file.name.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].some((fileType) => fileName.endsWith(fileType))) {
      return;
    }

    this.clearFilters();
    this.photoChooser.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }

  formResetHandler(evt) {
    evt.preventDefault();

    this.clearFilters();
  }

  clearFilters() {
    this.cropRange.value = 100;
    this.saturationRange.value = 50;
    this.contrastRange.value = 50;

    this.photoChooser.style.setProperty('--size', '100%');
    this.photoChooser.style.setProperty('--saturation', 1);
    this.photoChooser.style.setProperty('--contrast', 1);
  }
}

export { AddPhoto };
