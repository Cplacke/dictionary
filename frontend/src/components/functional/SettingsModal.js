import { useContext} from 'react'
import { AppContext } from '../../App'
import { Icon } from './index'

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
        <div className="text-4xl p-4 bg-gray-50">
            <div className="flex text-5xl text-pink-500"> 
                <span className="w-full"> Control Panel </span>
                <span className="inline material-symbols-outlined px-2 text-5xl ml-auto cursor-pointer hover:bg-pink-100 rounded-full"
                    onClick={() => close()}
                > close </span>
            </div>

            <div className="py-2 mt-2 text-gray-800">
                <div className="py-1 mb-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setAndClose(''); }}
                > 
                    <Icon icon="search" className="text-4xl px-2" />
                    Search
                    <Flare className="bg-red-400" text="New"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setAndClose('Principal'); }}
                > 
                    <Icon icon="today" className="text-4xl px-2" />
                    Word of the Day
                    <Flare className="bg-red-400" text="New"/>
                    <Flare className="bg-purple-400" text="Beta"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <Icon icon="joystick" className="text-4xl px-2" />
                    Games
                    <Flare className="bg-red-400" text="New"/>
                    <Flare className="bg-blue-400" text="Coming Soon!"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <Icon icon="bookmark" className="text-4xl px-2" />
                    My Words
                    <Flare className="bg-blue-400" text="Coming Soon!"/>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setThemeColor('yellow') }}
                > 
                    <Icon icon="settings" className="text-4xl px-2" />
                    Settings
                </div>
            </div>

            <div className="text-center text-lg mt-auto">
                <div className="w-full mx-auto font-mono text-gray-800 mt-24"> version: v0.1.0 </div>
            </div>
        </div>
    )
}

const Flare = ({ className, text }) => {
    return (
        <span className={"px-2 mx-1 shadow-sm rounded-full text-white text-sm uppercase "+className}>
            { text }
        </span>
    )
}
