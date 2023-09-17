import { Navigation, Footer, GameSelectionCard, VocabColosseum } from "../components"
import { getDataSetByName, getDataSets } from '../services/backend-service'
import { useState, createContext, useEffect } from "react"

export const GameContext = createContext();
export const GameConfig = [
    {
        title: "Vocab Colosseum" ,
        term: "Colosseum", icon: "swords",
        description: "A simple, no-time-limit, challenging ride of selecting the work that best matches the shown definition. Do you know what the word means and look for clues?",
        page: 'vocab'
    },{
        title: "Sentence Sherlock" ,
        term: "Sherlock", icon: "extension",
        description: "For those that fancy themselves 'academics' and 'English experts' alike, to match a given phrase with context clues and identify the part of speech.",
        page: 'sentence'
    },{
        title: "Gif Detective Elite" ,
        term: "Detective", icon: "psychology",
        description: "A rough and tumble game for the unexpected, matching terms and words to images that are found matching the term.",
        page: 'gif'
    },{
        title: "Words in the Bank", 
        term: "Piggy Bank", icon: "savings",
        description: "Classic word based game where the player matches 5 definitions and the words that correspond. Just like in elementary school; are you smarter than a 5th grader, can you get them all? ",
        page: 'bank'
    },{
        title: "Rabbit Hole", 
        term: "rabbit hole", icon: "cruelty_free",
        description: "Dive into the language head-first and use reference links to move as far as you can without repeating a word/term in 2 mins.",
        page: 'rabbit_hole'
    }
];

export const GamePage = () => {

    const [ page, setPage ] = useState('level-select');
    const [ selectedLevel, setSelectedLevel ] = useState(null);
    const [ data, setData ] = useState([]);
    // const [ answerIndexes, setAnswerIndexes ] = useState([]);
    const [ questionIndex, setQuestionIndex ] = useState(0);

    // useEffect(() => {
    //     setAnswerIndexes(
    //         data.map((d) => ( Math.round(Math.random()*0) ))
    //     );
    // },[ data ])

    useEffect(() => {
        const getGameSet = async() => {
            const opts = await getDataSets()
            const set = await getDataSetByName(opts[
                Math.round(Math.random()*opts.length-1)
            ])
            setData(set);
        }
        getGameSet();
    }, [ selectedLevel ])

    const renderPage = () => {
        switch (page) {
            case 'level-select':
                return (
                    GameConfig.map((game, i) => ( 
                        <GameSelectionCard key={`game_${i}`}
                            title={game.title} term={game.term} 
                            icon={game.icon} description={game.description} 
                            play={() => setPage(game.page)}
                        /> 
                    ))
                )
            case 'vocab':
                return (
                    <VocabColosseum data={data} />
                )
            case 'sentence':
                return (
                    <VocabColosseum data={data} />
                )
            case 'gif':
                return (
                    <VocabColosseum data={data} />
                )
            case 'bank':
                return (
                    <VocabColosseum data={data} />
                )
            case 'rabbit_hole':
                return (
                    <VocabColosseum data={data} />
                )
        
            default:
                break;
        }
    }

    return (
        <div className="w-full">
            <GameContext.Provider
                value={{
                    page, setPage,
                    data, setData,
                    selectedLevel, setSelectedLevel,
                    questionIndex, setQuestionIndex
                }}
            >
                <Navigation />
                <div className="flex flex-wrap my-8 mx-4 md:w-10/12 md:mx-auto">                
                    { renderPage() }
                </div>
                <Footer />
            </GameContext.Provider>
        </div>
    )
}
