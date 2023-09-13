import { useContext } from "react"
import { AppContext } from "../../App"
import { Icon } from './index'

export const SearchBar = () => {
    
    const { searchTerm, setSearchTerm } = useContext(AppContext)

    return (
        <div className="flex text-2xl text-pink-500">
            <div className="inline-block w-full md:w-1/2 mt-8 ml-4 mx-4 md:mx-auto">
                <div className="flex align-center bg-white rounded-full pr-6">
                    <Icon icon="search" className="text-3xl p-1 pl-2" />
                    <input className="pl-1 w-full" 
                        type="text" placeholder="search ..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                    />
                </div>
            </div>
        </div>
    )
}