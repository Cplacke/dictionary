import {  
    Navigation,
    Footer,
    SearchResults,
} from '../components'
import { AppContext } from '../App'
import { useEffect, useContext } from "react";

export const SearchPage = () => { 

    const {
        setSearchTerm,
    } = useContext(AppContext)

    useEffect(() => {
        const queryTerm = /term=(.*)/i.exec(
            window.location.search
        );
        if (queryTerm && queryTerm.length > 1) {
            setSearchTerm(queryTerm[1])
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
