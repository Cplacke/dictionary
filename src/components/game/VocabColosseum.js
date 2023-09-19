import { useContext, useEffect, useState } from 'react'
import { Icon } from '..'
import { AppContext } from '../../App'
import { GameContext } from '../../routes'
import { searchGiphy } from '../../services/backend-service'
import { generateQuestionSet } from '../../services/game-questoin-service'

export const VocabColosseum = () => {

    const { questionIndex, setQuestionIndex } = useContext(GameContext)
    const { dataSet, setDataSet } = useContext(AppContext)
    const [ questionSet, setQuestionSet ] = useState([])

    useEffect(() => {
        if (dataSet.length === 0) {
            return;
        }
        let questionSet = generateQuestionSet(dataSet, 5)
        console.info({set: questionSet});
        setQuestionSet(questionSet)
    }, [ dataSet ])

    return (
        <div className="w-full">
            <div className="text-gray-500 text-3xl md:text-4xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl md:text-5xl opacity-70"/>
            </div>
            <div className="my-8 mr-2">
                {
                    questionSet.map((questionConfig, i) => {
                        if (i>questionIndex) {
                            return null;
                        }
                        return <ColosseumQuestion key={JSON.stringify(questionConfig)} index={i} questionConfig={questionConfig} />
                    })
                } 
                {   questionIndex === 5 && 
                    <div className="text-2xl text-primary-500 text-center my-4 px-6 py-3 hover:bg-primary-100 cursor-pointer"
                        onClick={() => {
                            setDataSet([ ... dataSet ]);
                            setQuestionIndex(0);
                        }}
                    >
                        Play Again ? 
                    </div>
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
            if (!answerTerm) {
                console.info("MISSING ANSWER TERM", {
                    config: questionConfig.map((q) => (q.answer)),
                    answerTerm
                });
                return;
            }
            const res = await searchGiphy(answerTerm.word)
            setSrc(
                res[Math.round(Math.random()*res.length-1)]
            )
        }
        getSrc()
    }, [questionConfig])

    return (
        <div className="card bg-stripped w-full my-8"> 
            <div className="p-2 md:p-4 bg-primary-100">
                <div className="text-primary-700 text-2xl md:text-3xl flex items-center mb-4"> 
                    Which term best matches?
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
        term.defs.slice(0, 2).map((def, i) => (
            <div className="text-xl md:text-2xl text-black" key={i}>
                <div dangerouslySetInnerHTML={{ __html: def.text }}></div>
                { 
                    def.samples &&
                    <div className="ml-2 text-gray-700" dangerouslySetInnerHTML={{ __html: def.samples[0] }}></div> 
                }
            </div>
        ))
    )
}

export const AnswerOptions = ({ questionConfig }) => {

    const { questionIndex, setQuestionIndex } = useContext(GameContext)
    const [ answered, setAnswered ] = useState(false)
    const [ selectedOption, setSelectedOption ] = useState(null)

    const handleAnswerSelect = (selectedOption) => {
        if (answered) {
            return;
        }
        setSelectedOption(selectedOption);
        setQuestionIndex(questionIndex+1);
        setAnswered(true);
    }

    const scoredClass = (option) => {
        if (!option) {
            return '';
        }
        if (option.answer) {
            return 'correct-answer';
        }
        const { word, partOfSpeech } = selectedOption;
        if (option.word === word && option.partOfSpeech === partOfSpeech) {
            return 'wrong-answer';
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
        <div className="card card-sm bg-primary-200 w-full m-2 cursor-pointer"
            onClick={() => onClick(term)}
        >
            <div className={className+" text-gray-800 bg-gray-200 p-1 px-2"}>
                { `${term.word} - ${term.partOfSpeech}` }
            </div>
        </div>
    )
}