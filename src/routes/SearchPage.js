import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'
import SearchResults from '../components/SearchResults'

export const SearchPage = () => { 
    return (
        <div>
            <Navigation/>
            <SearchResults/>
            <Footer/>
        </div>
    );
}
