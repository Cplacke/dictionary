import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import Modal from 'react-modal'
import { SettingsModal } from '../components/functional'

export const Navigation = () => {

    const [ showMenu, setShowMenu ] = useState(false);

    return (
        <div className="uppercase shadow-md text-xl text-pink-500 bg-gray-100 flex items-center sticky top-0 z-10 w-full relative py-2">
            
            <span className={
                "text-3xl inline material-symbols-outlined cursor-pointer uppercase ml-3 px-2"+
                "hover:text-pink-700 hover:bg-gray-200 rounded-lg transition-colors duration-500"
            }
                onClick={() => setShowMenu(true)}
            > home </span>
                <Modal
                    className="card bg-stripped"
                    isOpen={showMenu}
                    ariaHideApp={false}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={{
                        content: {
                            margin: 'auto',
                            marginTop: '8rem',
                            marginBottom: '2rem',
                            padding: '0',
                            width: '70%',
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            zIndex: '20'
                        }
                    }}
                    contentLabel="Settings"
                >
                    <SettingsModal close={() => setShowMenu(false)}/>
                </Modal>
            
            <NavLink to="/" className={"uppercase p-2 ml-1 md:px-2 hover:text-pink-700 hover:bg-gray-200 rounded-lg transition-colors duration-500"}>
                DICTIONARY 
            </NavLink>
            <NavLink to="/dict" className={"uppercase p-2 ml-1 md:px-2 hover:text-pink-700 hover:bg-gray-200 rounded-lg transition-colors duration-500"}>
                WORD OF THE DAY 
            </NavLink>

        </div>
    );
}
