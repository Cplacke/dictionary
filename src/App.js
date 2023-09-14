import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useDebounce } from 'usehooks-ts';
import { SearchPage, AboutPage, GamePage } from './routes'
import { getWordOfDay } from './services/word-of-day.service'
import './App.css';
import './Animation.css';
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext({})

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
])


const App = () => {

  const [ searchTerm, setSearchTerm ] = useState(getWordOfDay());
  const [ data, setData ] = useState([]);
  const [ src, setSrc ] = useState('');
  const [ themeColor, setThemeColor ] = useState('pink');
  const [ backEnabled, setBackEnabled ] = useState(false);
  const [ navStack, setNavStack ] = useState(new Set());

  useEffect(() => {
      navStack.add(searchTerm)
      setNavStack(navStack)
      if (navStack.size > 1) {
          setBackEnabled(true);
      }
  }, [ useDebounce(searchTerm, 1000) ])

  const navigateBack = () => {
      if (navStack.size > 1) {
          navStack.delete(searchTerm)
          const history = [ ... navStack.values() ];
          setNavStack(new Set(history));
          setSearchTerm(history[history.length-1]);
      } 
      if (navStack.size <= 1) {
          setBackEnabled(false);
      }
  }

  return (
    <div id="cplacke-portfolio">
      <AppContext.Provider value={{
        searchTerm, setSearchTerm,
        data, setData,
        src, setSrc,
        themeColor, setThemeColor,
        navStack, setNavStack,
        backEnabled, navigateBack
      }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );

}

export default App;
