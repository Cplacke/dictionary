import React, { useState } from "react";
import Modal from 'react-modal'
import { SettingsModal } from '../index'

export const Navigation = () => {

    const [ showMenu, setShowMenu ] = useState(false);
    const getRandomName = () => {
        const names = [
            { title:"GIFopedia", subtitle: "The Ultimate GIF Encyclopedia" },
            { title:"GIFfinity", subtitle: "A World of Animated Expressions" },
            { title:"GIFLexicon", subtitle: "Where GIFs Define the Conversation" },
            { title:"GIFHub", subtitle: "Your Guide to the GIF Universe" },
            { title:"GIFMastery", subtitle: "The Art of Animated Communication" },
            { title:"GIFlopedia", subtitle: "Discover, Share, and Learn with GIFs" },
            { title:"GIFagram", subtitle: "Your Visual Language Companion" },
            { title:"GIFVault", subtitle: "Unlocking the Secrets of Animated Images" },
            { title:"GIFWizardry", subtitle: "Mastering the GIF Language" },
            { title:"GIFtropolis", subtitle: "Navigating the City of Animated Expressions" },
            { title:"GIFGalaxy", subtitle: "Explore the GIF Universe" },
            { title:"GIFScape", subtitle: "Your Animated World of Knowledge" },
            { title:"GIFVoyage", subtitle: "Navigating GIFs with Ease" },
            { title:"GIFWonders", subtitle: "Unveiling the Magic of GIFs" },
            { title:"GIFMastermind", subtitle: "The GIF Enthusiast's Haven" },
            { title:"GIFJunction", subtitle: "Where GIFs Meet Meaning" },
            { title:"GIFHorizon", subtitle: "Expanding Your Animated Vocabulary" },
            { title:"GIFOracle", subtitle: "Your Guide to Animated Insights" },
            { title:"GIFVenture", subtitle: "Embark on an Animated Journey" },
            { title:"GIFAlchemy", subtitle: "Transforming Words into GIFs" },
            { title:"GIFExplorium", subtitle: "Discover the World of Animated Art" },
            { title:"GIFRevolution", subtitle: "Where Expressions Come to Life" },
            { title:"GIFPulse", subtitle: "Stay in Sync with Animated Trends" },
            { title:"GIFHarbor", subtitle: "Anchoring Your GIF Knowledge" },
            { title:"GIFMasterclass", subtitle: "Elevate Your Animated Language" },
            { title:"GIFEmporium", subtitle: "Your One-Stop Shop for GIFs" },
            { title:"GIFQuest", subtitle: "Embarking on Animated Adventures" },
            { title:"GIFAlchemy", subtitle: "Transforming Words into Animated Art" },
            { title:"GIFSensei", subtitle: "Master the Art of Animated Expression" },
            { title:"GIFMosaic", subtitle: "Piecing Together Animated Conversations" },
        ]
        const selection = names[
            Math.round(Math.random()*names.length-1)
        ];
        return (
            <span>
                <span>{ selection.title }</span>
                <span className="hidden md:inline text-gray-600 text-base"> : { selection.subtitle }</span>
            </span>
        )
    }

    return (
        <div className="shadow-md text-xl text-pink-500 bg-gray-100 flex items-center sticky top-0 z-10 w-full relative py-2 opacity-90">
            <span className={
                "text-3xl inline material-symbols-outlined cursor-pointer uppercase ml-3 px-2 "+
                "bg-pink-600 text-white hover:bg-pink-700 hover:text-gray-200 opacity-100 "+
                "rounded-lg transition-colors duration-500"
            }
                onClick={() => setShowMenu(true)}
            > menu </span>
                <Modal
                    className="card bg-stripped"
                    isOpen={showMenu}
                    ariaHideApp={false}
                    className="w-11/12 sm:w-8/12 md:w-6/12"
                    style={{
                        content: {
                            height: '100vh',
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

            <span className="display-none md:inline ml-2" >
                { getRandomName() }
            </span>
        </div>
    );
}
