import axios from 'axios';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoader,
  smoothScroll,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
const perPage = 29;
const loader = document.getElementById('loader');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');
const gallery = document.querySelector('.gallery');

let loadedImageIds = new Set();
const lightbox = new SimpleLightbox('.gallery a', { scrollZoom: false }); // ✅ Виправлено: створено один раз у глобальній області

document.addEventListener('touchstart', () => {}, { passive: true });
document.addEventListener('touchmove', () => {}, { passive: true });

function showLoader() {
  loader.innerHTML = '<div class="spinner"></div>';
  loader.style.display = 'block';
}

function hideLoader() {
  loader.innerHTML = '';
  loader.style.display = 'none';
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = document.querySelector('#search-input').value.trim();
  if (!query) {
    iziToast.info({ title: 'Info', message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  loadedImageIds.clear();
  page = 1;
  loadMoreBtn.classList.add('hidden');
  showLoader();

  try {
    const data = await fetchImages(query, page, '', '', 'all', perPage);
    hideLoader();

    if (!data.hits.length) {
      iziToast.warning({
        title: 'Warning',
        message: 'Nothing found! Try another search.',
      });
      return;
    }

    const uniqueImages = data.hits.filter(
      image => !loadedImageIds.has(image.id)
    );
    uniqueImages.forEach(image => loadedImageIds.add(image.id));

    renderGallery(uniqueImages);
    lightbox.refresh(); // ✅ Виправлено: оновлюємо Lightbox після додавання нових зображень

    if (data.hits.length >= perPage) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error loading images:', error);
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page, '', '', 'all', perPage);
    hideLoader();

    const uniqueImages = data.hits.filter(
      image => !loadedImageIds.has(image.id)
    );
    uniqueImages.forEach(image => loadedImageIds.add(image.id));

    if (uniqueImages.length) {
      renderGallery(uniqueImages);
      lightbox.refresh(); // ✅ Виправлено: оновлюємо Lightbox після вставки
      smoothScroll();
    }

    if (data.hits.length < perPage) {
      loadMoreBtn.classList.add('hidden');
      iziToast.warning({
        title: 'Warning',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
});
