import './mobile-menu.js';
import './map.js';
import { Slider } from './slider.js';

const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider) => {
  new Slider(slider);
});
