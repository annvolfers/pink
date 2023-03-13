import './mobile-menu.js';
import './map.js';
import { Slider } from './slider.js';
import './photos.js';
import { AddPhoto } from './add-photo.js';
import './form.js';

const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => {
  new Slider(slider);
});

const addPhoto = document.querySelectorAll('.add-photo');
addPhoto.forEach((block) => {
  new AddPhoto(block);
});
