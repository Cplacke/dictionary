import { useContext} from 'react'
import { AppContext } from '../../App'
import { Icon } from './index'
import { getWordOfDay } from '../../services/word-of-day.service'

export const SettingsModal = ({
    close
}) => {

    const { 
        setSearchTerm,
        setData,
        setSrc,
        setThemeColor,
        themeColor
    } = useContext(AppContext)

    const setAndClose = (term) => {
        setSearchTerm(term);
        setData([]);
        close();
    }

    return (
        <div className="p-2 bg-gray-50 h-full w-full">
            <div className="flex text-pink-500"> 
                <span className="w-full md:ml-3 text-4xl md:text-5xl"> Control Panel </span>
                <span className="inline material-symbols-outlined px-2 text-4xl ml-auto cursor-pointer hover:bg-pink-100 rounded-full"
                    onClick={() => close()}
                > close </span>
            </div>

            <div className="py-2 mt-2 text-gray-800 text-3xl md:text-4xl">
                <div className="py-1 mb-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setAndClose(''); }}
                > 
                    <Icon icon="search" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Search
                    <Flare className="bg-red-400" text="New"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { 
                        setAndClose(getWordOfDay()); 
                    }}
                > 
                    <Icon icon="today" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Word of the Day
                    <Flare className="bg-purple-400" text="Beta"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <Icon icon="joystick" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Games
                    <Flare className="bg-yellow-500" text="FUN"/>
                    <Flare className="bg-blue-400" text="Coming Soon!"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <Icon icon="bookmark" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    My Words
                    <Flare className="bg-blue-400" text="Coming Soon!"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setThemeColor('yellow') }}
                > 
                    <Icon icon="settings" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Settings
                </div>
            </div>

            <div className="text-center text-base md:text-lg mt-auto">
                <div className="w-full mx-auto font-mono text-gray-800 mt-24"> version: v0.1.0 </div>
            </div>
        </div>
    )
}

const Flare = ({ className, text }) => {
    return (
        <span className={"px-2 mx-1 shadow-sm rounded-full text-white text-xs md:text-sm uppercase "+className}>
            { text }
        </span>
    )
}
