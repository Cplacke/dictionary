import { useContext, useEffect, useState } from 'react'
import { Icon } from '..'
import { GameContext } from '../../routes'
import { searchGiphy } from '../../services/backend-service'
import { generateQuestionSet } from '../../services/game-questoin-service'

export const VocabColosseum = () => {

    const { data, questionIndex } = useContext(GameContext)
    const [ questionSet, setQuestionSet ] = useState([])

    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        let set = generateQuestionSet(data, 5)
        console.info({
            set
        });
        setQuestionSet(set)
    }, [ data ])

    return (
        <div className="w-full">
            <div className="text-gray-400 text-3xl md:text-4xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl md:text-5xl opacity-70"/>
            </div>
            <div className="my-8 mr-2">
                {
                    questionSet.map((questionConfig, i) => {
                        if (i>questionIndex) {
                            return null;
                        }
                        return <ColosseumQuestion key={i} index={i} questionConfig={questionConfig} />
                    })
                } 
            </div>
        </div>
    )
}

export const ColosseumQuestion = ({ questionConfig, index }) => {

    const [src, setSrc] = useState(null)
    const answerTerm = questionConfig.find((option) => (option.answer === true));

    useEffect(() => {
        const getSrc = async() => {
            const res = await searchGiphy(answerTerm.word)
            setSrc(
                res[Math.round(Math.random()*res.length-1)]
            )
        }
        getSrc()
    }, [])

    return (
        <div className="card bg-stripped w-full my-8"> 
            <div className="p-2 md:p-4 bg-pink-100">
                <div className="text-pink-700 text-2xl md:text-3xl flex items-center mb-4"> 
                    Which term best matches?
                    {/* <Icon icon="question_mark" className="ml-auto text-4xl text-pink-500 opacity-70 relative"/> */}
                    <div className="text-2xl text-black opacity-100 ml-auto"> #{index+1}</div>
                </div>
                <AnswerHint term={answerTerm} src={src} />
                <img className="md:hidden w-auto mx-auto h-64 my-4 rounded-sm"
                    src={`https://media.giphy.com/media/${src}/giphy.gif`}
                />
                <AnswerOptions questionConfig={questionConfig}/>
            </div>
        </div>
    )
}

export const AnswerHint = ({ term, src }) => {
    return (
        // <div className="flex items-center">
        //     <div className="w-full md:">{
                term.defs.slice(0, 2).map((def, i) => (
                    <div className="text-xl md:text-2xl text-black" key={i}>
                        <div dangerouslySetInnerHTML={{ __html: def.text }}></div>
                        { 
                            def.samples &&
                            <div className="ml-2 text-gray-700" dangerouslySetInnerHTML={{ __html: def.samples[0] }}></div> 
                        }
                    </div>
                ))
        //     }</div>
        //     <img className="hidden md:flex w-2/5 mx-auto h-64 mt-4 rounded-sm"
        //         src={`https://media.giphy.com/media/${src}/giphy.gif`}
        //     />
        // </div>
    )
}

export const AnswerOptions = ({ questionConfig, onAnswered }) => {

    const { questionIndex, setQuestionIndex } = useContext(GameContext)
    const [ answered, setAnswered ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState(null)
    // const answerOption = questionConfig.find((term) => (term.answer))

    const handleAnswerSelect = (selectedOption) => {
        if (answered) {
            return;
        }
        setSelectedOption(selectedOption);
        setQuestionIndex(questionIndex+1);
        setAnswered(true);
    }

    const scoredClass = (option) => {
        if (option.answer) {
            return 'correct-answer'
        }
        const { word, partOfSpeech } = selectedOption;
        if (option.word === word && option.partOfSpeech === partOfSpeech) {
            return 'wrong-answer'
        }
        return '';
    }

    return (
        <div className="mr-4 -ml-2 md:ml-0 mt-6 text-xl md:text-2xl">
            <div className="block md:flex items-center">
                { 
                    questionConfig.slice(0, 2).map((option,i) => (
                        <AnswerButton key={'option'+i}
                            className={answered && scoredClass(option)} 
                            term={option} 
                            onClick={handleAnswerSelect} 
                        />
                    ))
                }
            </div>
            <div className="block md:flex items-center">
                { 
                    questionConfig.slice(2, 4).map((option,i) => (
                        <AnswerButton key={'option'+(i+2)}
                            className={answered && scoredClass(option)} 
                            term={option} 
                            onClick={handleAnswerSelect} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

const AnswerButton = ({ onClick, term, className="" }) => {

    // const answeredStyle = 

    return (
        <div className="card card-sm bg-pink-200 w-full m-2 cursor-pointer"
            onClick={() => onClick(term)}
        >
            <div className={className+" text-gray-800 bg-gray-200 p-1 px-2"}>
                { `${term.word} - ${term.partOfSpeech}` }
            </div>
        </div>
    )
}