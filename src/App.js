import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Footer from './components/Footer'
import { HomePage } from './routes/HomePage'
import './App.css';
import './Animation.css';
import { createContext, Component, useState, useContext, useEffect } from "react";

export const AppContext = createContext({})

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => (redirect('/dict')) ,
  },
  {
    path: '/word-of-the-day',
    element: <HomePage />,
  },
  {
    path: '/dict',
    element: <HomePage />,
  },
  {
    path: '/about',
    // element: (
      
    // ),
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
        <Footer />
      </AppContext.Provider>
    </div>
  );

}

export default App;
