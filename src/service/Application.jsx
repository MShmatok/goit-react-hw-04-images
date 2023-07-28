import axios from 'axios';

const key = '37231533-205413eb498832325c7945ce4';

const pixabay = axios.create({
  baseURL: `https://pixabay.com/api`,
});

const getImages = async (searchText, page, per_page) => {
  const { data } = await pixabay(
    `?key=${key}&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return data;
};

const App = {
  getImages,
};

export default App;
