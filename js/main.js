import"./mobile-menu.js";import"./map.js";import{Slider}from"./slider.js";import"./photos.js";import{AddPhoto}from"./add-photo.js";import"./form.js";const sliders=document.querySelectorAll(".slider");sliders.forEach((o=>{new Slider(o)}));const addPhoto=document.querySelectorAll(".add-photo");addPhoto.forEach((o=>{new AddPhoto(o)}));