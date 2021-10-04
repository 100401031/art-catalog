import { createStore, createLogger } from 'vuex';
import artworks from './modules/artworks';

const debug = process.env.NODE_ENV === 'develop';

export default createStore({
  modules: {
    artworks,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
