/**
 * Отображает изображения в галерее.
 * @param {Array} images - Массив изображений.
 */
export function renderGallery(images) {
  const gallery = document.querySelector('#gallery');
  const markup = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200"/>
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

  // Инициализация SimpleLightbox
  new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

/**
 * Очищает галерею.
 */
export function clearGallery() {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
}

/**
 * Показывает или скрывает загрузчик.
 * @param {boolean} show - Показывать загрузчик или нет.
 */
export function toggleLoader(show) {
  const loader = document.querySelector('#loader');
  if (loader) {
    loader.classList.toggle('hidden', !show);
  }
}
