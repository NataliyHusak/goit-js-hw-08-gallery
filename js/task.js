"use strict";

import images from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lighrboxImage = lightbox.querySelector(".lightbox__image");
const closeModalBtn = lightbox.querySelector(
  '.lightbox__button[data-action="close-lightbox"]'
);
const lightboxBackdrop = lightbox.querySelector(".lightbox__content");
function createGalleryItem({ preview, original, description }) {
  const galleryItem = `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />

    <span class="gallery__icon">
      <i class="material-icons">zoom_out_map</i>
    </span>
  </a>
</li>`;

  return galleryItem;
}

function createGallery(imagesList) {
  return imagesList.map(image => createGalleryItem(image)).join("");
}
const markup = createGallery(images);

gallery.insertAdjacentHTML("afterbegin", markup);

function handleOpenModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  lightbox.classList.add("is-open");
  const sourceWay = event.target.getAttribute("data-source");
  const deccription = event.target.getAttribute("alt");
  lighrboxImage.setAttribute("src", sourceWay);
  lighrboxImage.setAttribute("alt", deccription);
  window.addEventListener("keydown", handleKeyPress);
}
function handleCloseModal() {
  lightbox.classList.remove("is-open");
  window.removeEventListener("keydown", handleKeyPress);
  lighrboxImage.setAttribute("src", " ");
  lighrboxImage.setAttribute("alt", " ");
}
function handleClickOverlay({ target, currentTarget }) {
  if (target !== currentTarget) {
    return;
  }
  handleCloseModal();
}
function handleKeyPress({ code }) {
  if (code !== "Escape") {
    return;
  }
  handleCloseModal();
}

gallery.addEventListener("click", handleOpenModal);
closeModalBtn.addEventListener("click", handleCloseModal);
lightboxBackdrop.addEventListener("click", handleClickOverlay);

const imageLoad = target => {
  const element = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("src", entry.target.src);
        observer.disconnect();
      }
    });
  });
  element.observe(target);
};
const imagesGallery = document.querySelectorAll(".gallery img");
imagesGallery.forEach(image => {
  imageLoad(image);
});
