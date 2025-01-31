import axios from 'axios';

const API_KEY = '48211039-b5a5e94b0d08467a34362de56';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(
  query,
  page = 1,
  category = '',
  colors = '',
  imageType = 'all'
) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: imageType,
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  if (category) params.category = category;
  if (colors) params.colors = colors;

  try {
    const response = await axios.get(BASE_URL, { params });

    if (response.data.hits.length === 0) {
      toastr.warning('No images found for your query. Try something else.');
    }

    return response.data;
  } catch (error) {
    toastr.error('Something went wrong. Please try again.');
    console.error(error);
    throw new Error('Failed to fetch images.');
  }
}
