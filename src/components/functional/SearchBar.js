import { useContext } from "react"
import { AppContext } from "../../App"
import { Icon } from '../index'

export const SearchBar = () => {
    
    const { 
        searchTerm, setSearchTerm, 
        navigateBack, backEnabled
    } = useContext(AppContext);

    return (
        <div className="flex text-2xl text-primary-500">
            <div className="inline-block w-full md:w-1/2 mt-8 ml-4 mx-4 md:mx-auto">
                <div className="flex align-center">
                    <span className="flex items-center w-full bg-white rounded-full">
                        <Icon icon={backEnabled ? "undo" : "search"} 
                            className="text-3xl px-2 p-1 rounded-full hover:bg-primary-100 cursor-pointer"
                            onClick={() => {
                                if (backEnabled) {
                                    navigateBack();
                                }
                            }}
                        />
                        <input id="search-input" className="pl-1 w-full h-full" 
                            type="text" placeholder="search ..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                        <Icon icon="clear"
                            className={
                                (searchTerm && searchTerm.length > 0) ? 
                                "text-3xl rounded-full hover:bg-primary-100 cursor-pointer px-2 p-1 " :
                                "text-3xl text-white rounded-full hover:bg-primary-100 cursor-pointer px-2 p-1  "
                            }
                            onClick={() => {
                                setSearchTerm('');
                                document.getElementById('search-input').focus();
                            }}
                        />
                    </span>

                </div>
            </div>
        </div>
    )
}