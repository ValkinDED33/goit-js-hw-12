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
const perPage = 15;
const loader = document.getElementById('loader');
const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');
const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');
let loadedImageIds = new Set();

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
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page, perPage);
    toggleLoader(false);

    if (data.hits.length === 0) {
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
    lightbox.refresh();
    smoothScroll();
    loadMoreBtn.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading images:', error);
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page, perPage);
    toggleLoader(false);

    const uniqueImages = data.hits.filter(
      image => !loadedImageIds.has(image.id)
    );
    uniqueImages.forEach(image => loadedImageIds.add(image.id));

    renderGallery(uniqueImages);
    lightbox.refresh();
    smoothScroll();

    if (data.hits.length < perPage) {
      iziToast.warning({
        title: 'Warning',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    toggleLoader(false);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
});
