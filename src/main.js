import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoader,
} from './js/render-functions.js';

let query = '';
let page = 1;

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreBtn = document.querySelector('#load-more');
const gallery = document.querySelector('#gallery');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = searchInput.value.trim();

  if (!query) {
    alert('Please enter a search term.');
    return;
  }

  clearGallery();
  page = 1;
  loadMoreBtn.classList.add('hidden');
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    toggleLoader(false);

    if (data.hits.length === 0) {
      alert('No images found. Try another query.');
      return;
    }

    renderGallery(data.hits);
    loadMoreBtn.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching images:', error);
    toggleLoader(false);
    alert('Something went wrong. Please try again.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page);
    toggleLoader(false);

    renderGallery(data.hits);

    // Плавна прокрутка
    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    toggleLoader(false);
    alert('Something went wrong. Please try again.');
  }
});
