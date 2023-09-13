import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { HomePage, AboutPage } from './routes'
import './App.css';
import './Animation.css';
import { createContext, useState, useEffect } from "react";

export const AppContext = createContext({})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
])


const App = () => {

  const [ searchTerm, setSearchTerm ] = useState('dictionary');
  const [ searchStack, setSearchStack ] = useState(new Set());
  const [ data, setData ] = useState([]);
  const [ src, setSrc ] = useState('');
  const [ themeColor, setThemeColor ] = useState('pink');

  useEffect(() => {
    searchStack.add(searchTerm);
    console.info({ searchStack });
  }, [ searchTerm ]);


  return (
    <div id="cplacke-portfolio">
      <AppContext.Provider value={{
        searchTerm, setSearchTerm,
        data, setData,
        src, setSrc,
        themeColor, setThemeColor
      }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );

}

export default App;
