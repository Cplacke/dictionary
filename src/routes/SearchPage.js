import {  
    Navigation,
    Footer,
    SearchResults,
} from '../components'
import { AppContext } from '../App'
import { useEffect, useContext } from "react";

export const SearchPage = () => { 

    const {
        searchTerm, setSearchTerm,
    } = useContext(AppContext)

    useEffect(() => {
        const searchTerm = /term=(.*)/i.exec(
            window.location.search
        );
        if (searchTerm[1]) {
            setSearchTerm(searchTerm[1])
        }
    }, [])

    return (
        <div>
            <Navigation/>
            <SearchResults/>
            <Footer/>
        </div>
    );
}
