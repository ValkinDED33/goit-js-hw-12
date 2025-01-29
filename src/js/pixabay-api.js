import axios from 'axios';

const API_KEY = '48211039-b5a5e94b0d08467a34362de56';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Выполняет запрос к API Pixabay.
 * @param {string} query - Поисковый запрос.
 * @param {number} page - Номер страницы.
 * @returns {Promise<Object>} - Результаты запроса.
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

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
