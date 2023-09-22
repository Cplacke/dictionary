import { useContext, useEffect, useState } from 'react'
import { NavLink} from 'react-router-dom'
import { AppContext } from '../../App'
import { Icon } from '../index'
import { patchLocalStorage } from '../../services/local-storage-service'
import { ThemeOptions } from '../../routes'

export const SettingsModal = ({
    close
}) => {

    const { 
        setSearchTerm,
        setData,
        setThemeColor,
        themeColor,
        darkMode,
        setDarkMode,
        dataSetNames,
        dataSet,
        selectedDataSetName,
        setSelectedDataSetName
    } = useContext(AppContext)

    const handleThemeColorChange = (e) => {
        const color = e.target.value;
        setThemeColor(color)
        patchLocalStorage({
            themeColor: color,
        })
    }

    const handleWordSetChange = (e) => {
        const set = e.target.value;
        setSelectedDataSetName(set)
        patchLocalStorage({
            dataSetName: set
        })
    }

    const handleDarkModeToggle = (e) => {
        const active = e.target.checked;
        setDarkMode(active)
        patchLocalStorage({
            darkMode: active
        })
    }

    let _dataSet = [];
    useEffect(() => { _dataSet = dataSet; },[ dataSet ]);
    const setAndClose = (term) => {
        if ( term === 'word-of-day' && _dataSet ) {
            setSearchTerm(
                _dataSet[
                    Math.round(Math.random()*dataSet.length-1)
                ].word
            );
        }
        setData([]);
        close();
    }

    return (
        <div className="p-2 bg-gray-50 h-full w-full bg-primary-50">
            <div className="flex text-primary-500 items-center"> 
                <span className="w-full md:ml-3 text-4xl md:text-5xl"> Control Panel </span>
                <span className="inline material-symbols-outlined text-4xl ml-auto cursor-pointer hover:bg-primary-100 rounded-full"
                    onClick={() => close()}
                > close </span>
            </div>

            <div className="py-2 mt-2 text-gray-800 text-3xl md:text-4xl">
                <NavLink className="py-1 px-2 -mx-2 mb-1 cursor-pointer hover:text-primary-500 hover:bg-primary-100 flex items-center"
                    to="/" onClick={() => {
                        setAndClose(''); 
                    }}
                > 
                    <Icon icon="search" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Search
                    <Flare color="red" className="ml-auto" text="New"/>
                </NavLink>
                <NavLink className="py-1 px-2 -mx-2 cursor-pointer hover:text-primary-500 hover:bg-primary-100 flex items-center"
                    to="/" onClick={() => { 
                        setAndClose('word-of-day'); 
                    }}
                > 
                    <Icon icon="today" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Word of the Day
                    <Flare color="purple" className="ml-auto" text="Beta"/>
                </NavLink>
                <NavLink className="py-1 px-2 -mx-2 cursor-pointer hover:text-primary-500 hover:bg-primary-100 flex items-center"
                    to="/game"
                > 
                    <Icon icon="joystick" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Games
                    <Flare color="yellow" className="ml-auto mr-0.5" text="fun"/>
                    <Flare color="red" className="mr-0.5" text="New"/>
                    <Flare color="purple" text="beta"/>
                </NavLink>
                <NavLink className="py-1 px-2 -mx-2 cursor-pointer hover:text-primary-500 hover:bg-primary-100 flex items-center"> 
                    <Icon icon="bookmark" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    My Words
                    <Flare color="blue" className="ml-auto" text="Coming Soon!"/>
                </NavLink>
                <NavLink className="py-1 px-2 -mx-2 cursor-pointer hover:text-primary-500 hover:bg-primary-100 flex items-center"> 
                    <Icon icon="settings" className="text-3xl md:text-4xl mr-2 md:ml-3" />
                    Settings
                </NavLink>
                <div className="ml-10 mr-1 text-xl">
                    <div className="text-primary-500"> Theme Color </div>
                    <select className="p-2 px-4 w-full hover:bg-primary-100 bg-primary-100 cursor-pointer"
                        value={themeColor}
                        onChange={handleThemeColorChange}
                    >
                        {
                            ThemeOptions.map((theme) => {
                                return (
                                    <option key={theme.name+'-option'}>
                                        { theme.name }
                                    </option>
                                )
                            })
                        }
                    </select>
                    <div className="mt-1 text-primary-500"> Inverted Theme / Dark </div>
                    <div className="flex pl-2 mt-1">
                        <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle}
                            className="p-2 px-4 mr-3 scale-2 bg-primary-100" 
                            style={{ scale: '1.5' }}
                        />
                        <Icon className={darkMode ? 'show' : 'hidden'} icon="dark_mode" />
                        <Icon className={darkMode ? 'hidden' : 'show'} icon="light_mode" />
                    </div>
                    <div className="mt-1 text-primary-500"> Word Set </div>
                    <select className="p-2 px-4 w-full hover:bg-primary-100 bg-primary-100 cursor-pointer"
                        value={selectedDataSetName}
                        onChange={handleWordSetChange}
                    >
                        {
                            dataSetNames.map((set) => {
                                return <option key={set+'-option'}>{
                                    set   
                                }</option>
                            })
                        }
                    </select>
                    <div className="mt-1 text-primary-500"> Urban Dictionary Search </div>
                    <div className="flex pl-2 mt-1 cursor-not-allowed">
                        <input type="checkbox" disabled className="p-2 px-4 mr-3 scale-2 bg-primary-100 cursor-not-allowed" style={{ scale: '1.5' }}/>
                        <span> Disabled </span>
                    </div>
                </div>
            </div>

            <div className="text-center text-base md:text-lg mt-auto">
                <div className="w-full mx-auto font-mono text-gray-800 mt-24"> version: v0.1.0 </div>
            </div>
        </div>
    )
}

const Flare = ({ color, className, text }) => {
    const { darkMode } = useContext(AppContext);
    const [ bgClass, setBgClass ] = useState('')

    useEffect(() => {
        setBgClass(darkMode ? `bg-${color}-300 ` : `bg-${color}-400 `)
    }, [darkMode, color])

    return (
        <span className={`
            px-2 shadow-sm rounded-full text-white text-xs md:text-sm uppercase
            ${bgClass} 
            ${className}
        `}>
            <span className={`hidden
                bg-red-300 bg-yellow-300 bg-purple-300 bg-blue-300 bg-green-300
                bg-red-400 bg-yellow-400 bg-purple-400 bg-blue-400 bg-green-400
            `}></span>
            { text }
        </span>
    )
}
