import { useContext } from "react"
import { AppContext } from "../../App"

export const SearchBar = () => {
    
    const { searchTerm, setSearchTerm } = useContext(AppContext)

    return (
        <div className="flex text-2xl text-pink-500">
            <div className="card card-sm bg-stripped inline-block md:w-4/6 mt-8 mx-auto">
                <div className="flex align-center bg-white">
                    <span className="text-3xl material-symbols-outlined p-1 mr-1">search</span>
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