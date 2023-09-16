import { useContext, useEffect } from 'react'
import { Icon } from '..'
import { GameContext } from '../../routes'

export const VocabColosseum = () => {

    const { data } = useContext(GameContext)

    return (
        <div className="w-full">
            <div className="text-gray-400 text-3xl md:text-4xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl md:text-5xl opacity-70"/>
            </div>
            <div className="my-8 mr-2">
                {
                    data.map((term, i) => (
                        <ColosseumQuestion key={i} index={i} term={term} data={data} />
                    ))
                } 
            </div>
        </div>
    )
}

export const ColosseumQuestion = ({ term, data, index }) => {
    return (
        <div className="card bg-stripped w-full my-8"> 
            <div className="p-4 bg-pink-100">
                <div className="text-pink-700 text-2xl md:text-3xl flex items-center mb-4"> 
                    Which definition best matches
                    {/* <Icon icon="question_mark" className="ml-auto text-4xl text-pink-500 opacity-70 relative"/> */}
                    <div className="text-2xl text-black opacity-100 ml-auto"> #{index+1}</div>
                </div>
                <AnswerHint term={term} />
                <AnswerOptions answer={term} data={data} index={index}/>
            </div>
        </div>
    )
}

export const AnswerHint = ({ term }) => {
    return (
        term.defs.slice(0, 2).map((def, i) => (
            <div className="text-xl md:text-2xl text-black" key={i}>
                <div dangerouslySetInnerHTML={{ __html: def.text }}></div>
                { def.samples && <div className="ml-2 text-gray-700" dangerouslySetInnerHTML={{ __html: def.samples[0] }}></div> }
            </div>))
    )
}

export const AnswerOptions = ({ data, answer, index }) => {

    const { answerIndexes } = useContext(GameContext)

    // TODO: change to pull double answers / MAKE DISTINCT OPTIONS
    const randomDecoys = [
        data[Math.floor(Math.random()*data.length-1)],
        data[Math.floor(Math.random()*data.length-1)],
        data[Math.floor(Math.random()*data.length-1)],
    ]

    const options = [ 
        ...randomDecoys.slice(0, answerIndexes[index]), 
        answer,
        ...randomDecoys.slice(answerIndexes[index], 3)
    ];

    if ( options.find((o) => (o?.word === undefined)) != null ) {
        console.info({
            options,
        });
    }

    return (
        <div className="mr-4 -ml-2 md:ml-0 mt-10 text-xl md:text-2xl">
            <div className="block md:flex items-center">
                <div className="card card-sm bg-pink-200 w-full m-2 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 p-1 px-2">
                        a. { `${options[0]?.word} - ${options[0]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm bg-pink-200 w-full m-2 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 p-1 px-2">
                        b. { `${options[1]?.word} - ${options[1]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
            <div className="block md:flex items-center">
                <div className="card card-sm bg-pink-200 w-full m-2 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 p-1 px-2">
                        c. { `${options[2]?.word} - ${options[2]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm bg-pink-200 w-full m-2 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 p-1 px-2">
                        d. { `${options[3]?.word} - ${options[3]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
        </div>
    )
}