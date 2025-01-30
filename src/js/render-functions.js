export function renderGallery(images) {
  const gallery = document.querySelector('#gallery');
  const markup = images
    .map(
      image => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" />
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

  new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function clearGallery() {
  document.querySelector('#gallery').innerHTML = '';
}

export function toggleLoader(show) {
  document.querySelector('#loader').classList.toggle('hidden', !show);
}

export function smoothScroll() {
  window.scrollBy({ top: 400, behavior: 'smooth' });
}
