import { Navigation } from "../components/Navigation"
import { Footer } from "../components/Footer"
import { Icon } from "../components/functional"
import { VocabColosseum } from "../components/game/VocabColosseum"

export const GamePage = () => {
    return (
        <div className="w-full">
            <Navigation />
            <div className="flex flex-col my-8 ml-4 mr-6 md:w-8/12 md:mx-auto">
                <VocabColosseum />
                <GameCard 
                    title="Vocab Colosseum" icon="swords"
                    description="A simple, no-time-limit, challenging ride of selecting the work that best matches the shown definition. Do you know what the word means and look for clues?"
                />
                <GameCard 
                    title="Sentence Sherlock" icon="extension"
                    description="For those that fancy themselves 'academics' and 'English experts' alike, to match a given phrase with context clues and identify the part of speech."
                />
                <GameCard 
                    title="Gif Detective Elite" icon="psychology"
                    description="A rough and tumble game for the unexpected, matching terms and words to images that are found matching the term."
                />
                <GameCard 
                    title="Words in the Bank" icon="savings"
                    description="Classic word based game where the player matches 5 definitions and the words that correspond. Just like in elementary school; are you smarter than a 5th grader, can you get them all? "
                />
                <GameCard 
                    title="Rabbit Hole" icon="cruelty_free"
                    description="Dive into the language head-first and use reference links to move as far as you can without repeating a word/term in 2 mins."
                />
            </div>
            <Footer />
        </div>
    )
}

export const GameCard = ({
    title,
    icon,
    description
}) => {
    return (
        <div className="card mb-8 bg-stripped w-full">
            <div className="bg-pink-100">
                <div className="text-pink-700 p-2 text-2xl flex items-center"> 
                    { title } 
                    <Icon icon={icon} className="ml-auto text-4xl opacity-70"/>
                </div>
                <div className="text-gray-800 p-2 pt-0"> { description } </div>
                <div className="flex align-end"> 
                    <div className="card card-sm inline-block ml-auto mr-4 my-2"> 
                        <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-center cursor-pointer">
                            PLAY
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}