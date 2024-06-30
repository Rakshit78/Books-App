import { createContext } from 'react';

const GlobalContext = createContext({
  favData: [],
  setFavData: (user) => [],
});

export default GlobalContext;
