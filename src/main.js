import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  toggleLoader,
} from './js/render-functions.js';

let query = '';
let page = 1;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = document.querySelector('#search-input').value.trim();
  if (!query) return;

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

    if (data.hits.length < 15) {
      loadMoreBtn.classList.add('hidden');
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error loading more images:', error);
    toggleLoader(false);
    alert('Something went wrong. Please try again.');
  }
});
