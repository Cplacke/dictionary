import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useDebounce } from 'usehooks-ts';
import { SearchPage, AboutPage, GamePage, ThemeProvider } from './routes'
import { getWordOfDay } from './services/word-of-day.service'
import { getDataSets, getDataSetByName } from './services/backend-service'
import { getLocalStorage } from './services/local-storage-service'
import './App.css';
import './Animation.css';
import { createContext, useState, useEffect, useContext } from "react";

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
  
  const [ dataSetNames, setDataSetNames ] = useState([]);
  const [ selectedDataSetName, setSelectedDataSetName ] = useState('');
  const [ dataSet, setDataSet ] = useState([]);
  
  const [ src, setSrc ] = useState('');
  const [ themeColor, setThemeColor ] = useState('');
  const [ darkMode, setDarkMode ] = useState('');
  const [ gold, setGold ] = useState(null);
  const [ backEnabled, setBackEnabled ] = useState(false);
  const [ navStack, setNavStack ] = useState(new Set());

  useEffect(() => {
    const getDataSetOptions = async() => {
      const localSetting = getLocalStorage();
      setThemeColor(localSetting.themeColor);
      setDarkMode(localSetting.darkMode);
      setGold(localSetting.gold);
      setSelectedDataSetName(localSetting.dataSetName);
      setDataSetNames( await getDataSets() );
    }
    getDataSetOptions();
  }, [])

  useEffect(() => {
    if (!selectedDataSetName) {
      return;
    }
    const getDataSet = async() => {
        setDataSet( await getDataSetByName(selectedDataSetName) );
    }
    getDataSet();
  }, [ selectedDataSetName ])

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
    <div id="app">
      <AppContext.Provider value={{
        searchTerm, setSearchTerm,
        data, setData,
        dataSet, setDataSet,
        dataSetNames, setDataSetNames,
        selectedDataSetName, setSelectedDataSetName,
        src, setSrc,
        themeColor, setThemeColor,
        darkMode, setDarkMode,
        gold, setGold,
        navStack, setNavStack,
        backEnabled, navigateBack,
      }}>

        <ThemeProvider />
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );

}

export default App;
