import { useContext } from 'react'
import { Icon } from '..'
import { GameContext } from '../../routes'
import { QuestionCard } from './QuestionElements'

export const VocabColosseum = ({ questionSet }) => {

    const { 
        setPage,
        questionIndex,
    } = useContext(GameContext)

    if ( !questionSet || questionSet.length === 0 ) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="text-gray-500 text-3xl md:text-4xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl md:text-5xl opacity-70"/>
            </div>
            <div className="my-8 mr-2">
                {
                    questionSet.length && questionSet.map((questionConfig, i) => {
                        if (i>questionIndex || !questionConfig) {
                            return null;
                        }
                        return <QuestionCard key={JSON.stringify(questionConfig)} index={i} 
                            prompt="Which term best matches?"
                            questionConfig={questionConfig} 
                            answerTerm={questionConfig.find((c) => (c.answer === true))}
                        />
                    })
                } 
                {   questionIndex === 5 && 
                    <div className="text-2xl text-primary-500 text-center my-4 px-6 py-3 hover:bg-primary-100 cursor-pointer"
                        onClick={() => {
                            setPage('level-select');
                        }}
                    >
                        Play Again ? 
                    </div>
                }
            </div>
        </div>
    )
}

