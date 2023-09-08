import { useState, useContext} from 'react'
import { AppContext } from '../../App'

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
                    <span className="inline material-symbols-outlined text-4xl px-2"> search </span>
                    Search
                    {/* <span className="px-2 mx-1 shadow-sm rounded-full bg-green-400 text-white text-sm">GRAND OPENING</span> */}
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-red-400 text-white text-sm">NEW</span>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setAndClose('Principal'); }}
                > 
                    <span className="inline material-symbols-outlined text-4xl px-2"> today </span>
                    Word of the Day
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-red-400 text-white text-sm">NEW</span>
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-purple-400 text-white text-sm">BETA</span>

                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <span className="inline material-symbols-outlined text-4xl px-2"> joystick </span>
                    Games
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-red-400 text-white text-sm">NEW</span>
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-blue-400 text-white text-sm">COMING SOON!</span>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"> 
                    <span className="inline material-symbols-outlined text-4xl px-2"> bookmark </span>
                    My Words
                    <span className="px-2 mx-1 shadow-sm rounded-full bg-blue-400 text-white text-sm">COMING SOON!</span>
                </div>
                <div className="py-1 cursor-pointer hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={() => { setThemeColor('yellow') }}
                > 
                    <span className="inline material-symbols-outlined text-4xl px-2"> settings </span>
                    Settings
                </div>
            </div>

            <div className="text-center text-lg mt-auto">
                <div className="w-full mx-auto font-mono text-gray-800 mt-24"> version: v0.1.0 </div>
            </div>
        </div>
    )
}
