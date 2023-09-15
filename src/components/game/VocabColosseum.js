import { useContext } from 'react'
import { AppContext } from '../../App'
import { Icon, Definition } from '../functional'

export const VocabColosseum = () => {

    const { data } = useContext(AppContext)
    console.info({ data });

    return (
        <div className="w-full">
            <div className="text-gray-400 text-3xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl opacity-70"/>
            </div>
            <div className="my-8">
                {
                    data.slice(0,3).map((term) => (
                        <ColosseumQuestion term={term} data={data} />
                    ))
                }
            </div>
        </div>
    )
}

export const ColosseumQuestion = ({ term, data }) => {
    return (
        <div className="card bg-stripped w-full my-8"> 
            <div className="p-2 bg-pink-100">
                <div className="text-pink-700 text-2xl flex items-center"> 
                    Which definition best matches
                    <Icon icon="question_mark" className="ml-auto text-4xl text-gray-500 opacity-70"/>
                </div>
                <AnswerHint term={term}/>
                <AnswerOptions options={data}/>
            </div>
        </div>
    )
}

export const AnswerHint = ({ term }) => {
    return (
        term.defs.slice(0, 2).map((def, i) => (
            <div className="text-lg text-black px-4">
                <div dangerouslySetInnerHTML={{ __html: def.text }}></div>
                { def.samples && <div className="ml-2 text-gray-700" dangerouslySetInnerHTML={{ __html: def.samples[0] }}></div> }
            </div>))
    )
}

export const AnswerOptions = ({ options }) => {
    return (
        <div className="mr-2 mt-5">
            <div className="flex items-center">
                <div className="card card-sm w-1/2 m-1 md:mb-3 md:mr-3 cursor-pointer">
                    <div className="bg-red-400 hover:bg-red-500 text-lg p-1 px-2">
                        a. { `${options[0]?.word} - ${options[0]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm w-1/2 m-1 md:mb-3 cursor-pointer">
                    <div className="bg-blue-400 hover:bg-blue-500 text-lg p-1 px-2">
                        b. { `${options[1]?.word} - ${options[1]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="card card-sm w-1/2 m-1 md:mr-3 cursor-pointer">
                    <div className="bg-green-400 hover:bg-green-500 text-lg p-1 px-2">
                        c. { `${options[2]?.word} - ${options[2]?.partOfSpeech}` }
                    </div>
                </div>
                <div className="card card-sm w-1/2 m-1 cursor-pointer">
                    <div className="bg-yellow-300 hover:bg-yellow-400 text-lg p-1 px-2">
                        d. { `${options[3]?.word} - ${options[3]?.partOfSpeech}` }
                    </div>
                </div>
            </div>
        </div>
    )
}