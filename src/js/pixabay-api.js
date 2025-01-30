import axios from 'axios';

const API_KEY = '48211039-b5a5e94b0d08467a34362de56';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Виконує запит до API для отримання зображень.
 * @param {string} query - Пошуковий запит.
 * @param {number} page - Номер сторінки.
 * @returns {Promise<Object>} - Результати запиту або помилка.
 */
export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images. Please try again later.');
  }
}
