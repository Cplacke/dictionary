import { useContext } from "react";
import { AppContext } from "../../App";

export const WordCard = ({ 
    word,
    defs,
    syllabic,
    stems,
    partOfSpeech,
    shortDef,
    className,
}) => {

    const { setSearchTerm } = useContext(AppContext)
        
    return (
        <div className={"card bg-stripped flex "+className}>
            <div className="shadow-xl w-full p-4 bg-pink-100 ">

                <div> 
                    <div className="flex uppercase text-pink-600 my-2 relative"> 
                        <div className="w-9/12 text-4xl md:text-5xl font-macondo"> { word } </div>
                        <div className="w-auto ml-auto text-base text-gray-700 pb-2 pl-auto align-top absolute right-0 -top-5"> 
                            { defs.length } Definition{ defs.length > 1 ? 's' : '' }
                        </div>
                    </div>

                    <div className="flex text-base text-gray-900 mt-4"> 
                        <div className="w-full">
                            { stems.map((stem) => (
                                <span key={stem} className="card card-sm inline-block font-mono mr-2 my-0.5 bg-gray-100"
                                    onClick={(e) => { setSearchTerm(e.target.innerText) }}
                                >
                                    <div className={
                                        "p-1 bg-opacity-75 cursor-pointer" + 
                                        badgeColor(partOfSpeech)
                                    }>{ stem }</div>
                                </span>
                            ) ) }
                            
                        </div>

                        <div className="w-auto mr-2 ml-auto">
                            <div className={
                                "card card-sm inline-block opacity-1 uppercase" 
                            }>
                                <div className={
                                    "p-1 text-2xl" + 
                                    badgeColor(partOfSpeech)
                                }>{ partOfSpeech }</div>
                            </div>
                        </div>

                    </div>

                </div>
                {
                    defs.map((def) => (
                        [ 
                            <Definition key={def.text} definition={def.text} />,
                            ... def.samples.map( 
                                (sample) => ( <Definition sample key={sample} definition={sample} /> )
                            )
                        ]
                    ))
                }
            </div>
        </div>
    );

};

const unhandled = new Set();
const badgeColor = (pos) => {
    switch (pos) {
        case 'noun':
            return ' bg-blue-500 border-blue-200 text-white '
        case 'plural noun':
            return ' bg-blue-200 border-blue-500 text-gray-800 '
        case 'abbreviation or noun':
            return ' bg-blue-300 border-blue-600 text-gray-800  '
        case 'abbreviation':
            return ' bg-green-500 border-green-300 text-white '
        case 'adjective':
            return ' bg-yellow-400 border-yellow-200 text-gray-800 '
        case 'adverb':
            return ' bg-orange-500 border-purple-200 text-white '
        case 'verb':
            return ' bg-red-500 border-red-200 text-white '
        case 'phrasal verb':
            return ' bg-red-200 border-red-500 text-gray-800 '
        case 'idiom':
            return ' bg-green-500 border-green-200 text-white '
        case 'biographical name':
            return ' bg-purple-200 border-purple-500 text-gray-800 '
        case 'geographical name':
            return ' bg-green-200 border-green-500 text-gray-800 '
        case 'idiomatic phrase':
        case 'verbal phrase':
        case 'Latin phrase':
            return ' bg-blue-900 border-white-500 text-white '        
        case 'symbol':
            return ' bg-gray-300 border-blue-600 text-gray-800 '
        case 'prefix':
        case 'suffix':
            return ' bg-purple-200 border-blue-400 text-gray-800 '
        case 'combining form':
            return ' bg-yellow-200 border-orange-200 text-gray-800 '
                
        case 'preposition':
        default:
            unhandled.add(pos)
            console.info({unhandled});
            return ' bg-gray-300 border-gray-500 text-gray-800 '
    }
}

const Definition = ({ definition, sample }) => {

    const { setSearchTerm } = useContext(AppContext);
    const handleLink = (event) => {
        if (event.target.className.includes('term-link')) {
            const term = event.target.innerText.replace(
                /\//g, ''
            );
            setSearchTerm(term)
        }
    }

    return (
        <div 
            className={ 'text-xl ' + (sample ? ' text-gray-700 mt-1 ml-2' : 'mt-4') }
            dangerouslySetInnerHTML={{ __html: definition }}
            onClick={handleLink}
        ></div>
    )
}
