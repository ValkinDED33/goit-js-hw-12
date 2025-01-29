/**
 * Відображає зображення у галереї.
 * @param {Array} images - Масив зображень.
 */
export function renderGallery(images) {
  const gallery = document.querySelector('#gallery');
  const markup = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
render-functions.js
      
  <div class="info">
          <span><strong>Likes:</strong> ${image.likes}</span>
          <span><strong>Views:</strong> ${image.views}</span>
          <span><strong>Comments:</strong> ${image.comments}</span>
          <span><strong>Downloads:</strong> ${image.downloads}</span>
        </div>
      </a>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // Ініціалізація SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

/**
 * Очищає галерею.
 */
export function clearGallery() {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
}

/**
 * Показує або ховає завантажувач.
 * @param {boolean} show - Чи показувати завантажувач.
 */
export function toggleLoader(show) {
  const loader = document.querySelector('#loader');
  if (loader) {
    loader.classList.toggle('hidden', !show);
  }
}
