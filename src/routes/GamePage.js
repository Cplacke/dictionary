import { Navigation } from "../components/Navigation"
import { Footer } from "../components/Footer"
import { Icon } from "../components/functional"
import { VocabColosseum } from "../components/game/VocabColosseum"
import { searchGiphy } from "../services/backend-service"
import { useEffect, useState } from "react"

export const GamePage = () => {
    return (
        <div className="w-full">
            <Navigation />
            <div className="flex flex-wrap my-8 mx-4 md:w-10/12 md:mx-auto">                
                <GameCard 
                    title="Vocab Colosseum" term="Colosseum" icon="swords"
                    description="A simple, no-time-limit, challenging ride of selecting the work that best matches the shown definition. Do you know what the word means and look for clues?"
                />
                {/* <div className="m-4 p-4 border rounded-lg border-pink-500">
                    <VocabColosseum />
                </div> */}
                <GameCard 
                    title="Sentence Sherlock" term="Sherlock" icon="extension"
                    description="For those that fancy themselves 'academics' and 'English experts' alike, to match a given phrase with context clues and identify the part of speech."
                />
                <GameCard 
                    title="Gif Detective Elite" term="Detective" icon="psychology"
                    description="A rough and tumble game for the unexpected, matching terms and words to images that are found matching the term."
                />
                <GameCard 
                    title="Words in the Bank" term="Piggy Bank" icon="savings"
                    description="Classic word based game where the player matches 5 definitions and the words that correspond. Just like in elementary school; are you smarter than a 5th grader, can you get them all? "
                />
                <GameCard 
                    title="Rabbit Hole" term="rabbit hole" icon="cruelty_free"
                    description="Dive into the language head-first and use reference links to move as far as you can without repeating a word/term in 2 mins."
                />
            </div>
            <Footer />
        </div>
    )
}

export const GameCard = ({
    title,
    term,
    icon,
    description
}) => {

    return (
        <div className="card mb-8 bg-stripped w-full flex md:w-5/12 md:mx-auto ">
            <div className="bg-pink-100 bg-contain" 
                // style={{ 
                //     backgroundImage: `url("${src}")` || '',
                //     backgroundPositionX: '50%'
                // }}
            >
                <div className="text-pink-700 p-2 text-2xl flex items-center"> 
                    { title } 
                    <Icon icon={icon} className="ml-auto text-gray-500 text-4xl opacity-70"/>
                </div>
                <div className="text-black p-2 pt-0"> { description } </div>
                <div className="flex align-end ml-2"> 
                        {/* <img src={src} className="mx-auto" /> */}
                    <div className="card card-sm block ml-auto mr-4 my-2"> 
                        <div className="text-white bg-pink-500 hover:bg-pink-600 px-20 py-2 text-center cursor-pointer">
                            PLAY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}