import { useContext, useEffect, useState } from "react"
import { useDebounce } from 'usehooks-ts';
import { AppContext } from "../../App"
import { Icon } from './index'

export const SearchBar = () => {
    
    const { searchTerm, setSearchTerm } = useContext(AppContext);
    const [ backEnabled, setBackEnabled ] = useState(false);
    const [ stack, setStack ] = useState(new Set());

    useEffect(() => {
        stack.add(searchTerm)
        setStack(stack)
        if (stack.size > 1) {
            setBackEnabled(true);
        }
    }, [ useDebounce(searchTerm, 1000) ])

    const navigateBack = () => {
        if (stack.size > 1) {
            stack.delete(searchTerm)
            const history = [ ... stack.values() ];
            setStack(new Set(history));
            setSearchTerm(
                history[history.length-1]
            );
        } else {
            setBackEnabled(false);
        }
    }

    return (
        <div className="flex text-2xl text-pink-500">
            <div className="inline-block w-full md:w-1/2 mt-8 ml-4 mx-4 md:mx-auto">
                <div className="flex align-center">
                    { backEnabled && <Icon icon="undo"
                        className="text-3xl text-pink-400 p-1 rounded-full hover:bg-pink-100 cursor-pointer" 
                        onClick={navigateBack}
                    /> }

                    <span className="flex w-full bg-white rounded-full pr-6">
                        <Icon icon="search" className="text-3xl p-1 pl-2" />
                        <input className="pl-1 w-full" 
                            type="text" placeholder="search ..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                    </span>

                </div>
            </div>
        </div>
    )
}