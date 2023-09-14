import { Icon } from '../functional'

export const VocabColosseum = () => {


    return (
        <div className="w-full">
            <div className="text-gray-400 text-3xl px-1 flex items-center"> 
                Vocab Colosseum 
                <Icon icon="swords" className="ml-auto text-4xl opacity-70"/>
            </div>
            <div className="my-8">
                <div className="card bg-stripped w-full"> 
                    <div className="p-2 bg-pink-100">

                        <div className="text-pink-700 text-2xl flex items-center"> 
                            Which definition best matches
                            <Icon icon="question_mark" className="ml-auto text-4xl text-gray-400 opacity-70"/>
                        </div>
                        <div className="text-gray-800 mb-4 pl-1"> simple, no-time-limit, challenging ride of selecting the work that best matches the shown definition. Do you know what the word means and look for clues? </div>

                        <div className="mr-2 mt-2">
                            <div className="flex items-center">
                                <div className="card card-sm w-1/2 m-1 md:mb-3 md:mr-3 cursor-pointer">
                                    <div className="bg-red-400 text-lg p-1">
                                        Vocab Colessuem
                                    </div>
                                </div>
                                <div className="card card-sm w-1/2 m-1 md:mb-3 cursor-pointer">
                                    <div className="bg-blue-400 text-lg p-1">
                                        Vocab Colessuem
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="card card-sm w-1/2 m-1 md:mr-3 cursor-pointer">
                                    <div className="bg-green-400 text-lg p-1">
                                        Vocab Colessuem
                                    </div>
                                </div>
                                <div className="card card-sm w-1/2 m-1 cursor-pointer">
                                    <div className="bg-yellow-300 text-lg p-1">
                                        Vocab Colessuem
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}