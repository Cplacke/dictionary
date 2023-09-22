import { Navigation, Footer, GameSelectionCard, VocabColosseum } from "../components"
import { getDataSetByName, getDataSets } from '../services/backend-service'
import { useState, createContext, useEffect, useContext } from "react"
import { AppContext } from "../App";
import { generateQuestionSet } from "../services/game-questoin-service";


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

    const { dataSet, setDataSet, gold, setGold } = useContext(AppContext)
    const [ page, setPage ] = useState('level-select');
    const [ selectedLevel, setSelectedLevel ] = useState(null);
    const [ questionSet, setQuestionSet ] = useState(0);
    const [ questionIndex, setQuestionIndex ] = useState(0);
    const [ correctCount, setCorrectCount ] = useState(0);
    const [ score, setScore ] = useState(0);

    const playGame = (gameTitle) => {
        console.info('paly game data set', {dataSet});
        const gameQuestions = generateQuestionSet(dataSet, 5);
        setQuestionSet(gameQuestions);
        setQuestionIndex(0);
        setPage(gameTitle);
    }

    const scoreQuestion = (selectedAnswer) => {
        if (selectedAnswer.answer === true) {
            setScore(score+1000);
            setGold(gold+75)
            setCorrectCount(correctCount+1);
        }
        setQuestionIndex(questionIndex+1);
    }

    const renderPage = () => {
        switch (page) {
            case 'level-select':
                return (
                    GameConfig.map((game, i) => ( 
                        <GameSelectionCard key={`game_${i}`}
                            title={game.title} term={game.term} 
                            icon={game.icon} description={game.description} 
                            play={() => playGame(game.title)}
                        /> 
                    ))
                )
            case "Vocab Colosseum":
                return (
                    <VocabColosseum questionSet={questionSet}/>
                )
            case "Sentence Sherlock":
                return (
                    <div className="text-center text-2xl text-primary-400"> Sentence Sherlock is in development</div>
                )
            case "Gif Detective Elite":
                return (
                    <div className="text-center text-2xl text-primary-400"> Gif Detective Elite is in development</div>
                )
            case "Words in the Bank":
                return (
                    <div className="text-center text-2xl text-primary-400"> Words in the Bank is in development</div>
                )
            case "Rabbit Hole":
                return (
                    <div className="text-center text-2xl text-primary-400"> Rabbit Hole is in development</div>
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
                    selectedLevel, setSelectedLevel,
                    questionIndex,
                    scoreQuestion,
                    questionSet,
                    score, setScore
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
