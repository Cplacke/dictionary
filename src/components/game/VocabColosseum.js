import { useContext, useState } from 'react'
import { Icon } from '..'
import { GameContext } from '../../routes'

export const VocabColosseum = () => {

    const { data } = useContext(GameContext)
    console.info({ data });

    return (
        <div className="w-full">
            <div className="text-gray-400 text-3xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl opacity-70"/>
            </div>
            <div className="my-8">
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
    const answerIndex = Math.round(Math.random()*3)
    return (
        <div className="card bg-stripped w-full my-8"> 
            <div className="p-2 bg-pink-100">
                <div className="text-pink-700 text-2xl flex items-center mb-4"> 
                    <div className="text-lg text-black mr-2"> #{index+1}</div>
                    Which definition best matches
                    <Icon icon="question_mark" className="ml-auto text-4xl text-gray-500 opacity-70"/>
                </div>
                <AnswerHint term={term} />
                <AnswerOptions answer={term} data={data} answerIndex={answerIndex} />
            </div>
        </div>
    )
}

export const AnswerHint = ({ term }) => {
    return (
        term.defs.slice(0, 2).map((def, i) => (
            <div className="text-lg text-black px-4" key={i}>
                <div dangerouslySetInnerHTML={{ __html: def.text }}></div>
                { def.samples && <div className="ml-2 text-gray-700" dangerouslySetInnerHTML={{ __html: def.samples[0] }}></div> }
            </div>))
    )
}

export const AnswerOptions = ({ data, answer, answerIndex }) => {
    // TODO: change to pull double answers / MAKE DISTINCT OPTIONS
    const randomDecoys = [
        data[Math.floor(Math.random()*data.length-1)],
        data[Math.floor(Math.random()*data.length-1)],
        data[Math.floor(Math.random()*data.length-1)],
    ]

    const options = [ 
        ...randomDecoys.slice(0, answerIndex), 
        answer,
        ...randomDecoys.slice(answerIndex, 3)
    ];

    return (
        <div className="mr-2 mt-10">
            <div className="flex items-center">
                <div className="card card-sm w-1/2 m-1 md:mr-3 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 text-lg p-1 px-2">
                        a. { `${options[0]?.word} - ${options[0]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm w-1/2 m-1 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 text-lg p-1 px-2">
                        b. { `${options[1]?.word} - ${options[1]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="card card-sm w-1/2 m-1 md:mr-3 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 text-lg p-1 px-2">
                        c. { `${options[2]?.word} - ${options[2]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm w-1/2 m-1 cursor-pointer">
                    <div className="text-gray-800 bg-gray-200 hover:text-pink-800 hover:bg-pink-200 text-lg p-1 px-2">
                        d. { `${options[3]?.word} - ${options[3]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
        </div>
    )
}