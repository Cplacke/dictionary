import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useDebounce } from 'usehooks-ts';
import { SearchPage, AboutPage, GamePage, ThemeProvider } from './routes'
import { getWordOfDay } from './services/word-of-day.service'
import { getDataSets, getDataSetByName } from './services/backend-service'
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
  
  const [ dataSetNames, setDataSetNames ] = useState(['SAT Terms']);
  const [ selectedDataSetName, setSelectedDataSetName ] = useState('SAT Terms');
  const [ dataSet, setDataSet ] = useState([]);
  
  const [ src, setSrc ] = useState('');
  const [ themeColor, setThemeColor ] = useState('Rose');
  const [ backEnabled, setBackEnabled ] = useState(false);
  const [ navStack, setNavStack ] = useState(new Set());

  useEffect(() => {
    const getDataSetOptions = async() => {
      setDataSetNames( await getDataSets() );
    }
    getDataSetOptions();
  }, [])

  useEffect(() => {
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
    <div id="cplacke-portfolio">
      <AppContext.Provider value={{
        searchTerm, setSearchTerm,
        data, setData,
        dataSet, setDataSet,
        dataSetNames, setDataSetNames,
        selectedDataSetName, setSelectedDataSetName,
        src, setSrc,
        themeColor, setThemeColor,
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
