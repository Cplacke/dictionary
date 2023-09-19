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
            <div className="shadow-xl w-full pb-4 px-2 md:p-4 bg-primary-100 ">
                <div> 
                    <div className="flex uppercase text-primary-600 my-2 mt-6 relative"> 
                        <div className="w-9/12 text-4xl md:text-5xl font-macondo"> { word } </div>
                        <div className="w-auto ml-auto text-base text-gray-700 pb-2 pl-auto align-top absolute right-0 -top-5"> 
                            { defs.length } Definition{ defs.length > 1 ? 's' : '' }
                        </div>
                    </div>

                    <div className="flex text-base mt-4"> 
                        <div className="w-full">
                            { stems.map((stem) => (
                                <span key={stem} className="card card-sm bg-primary-200 inline-block font-mono mr-2 my-0.5"
                                    onClick={(e) => { setSearchTerm(e.target.innerText) }}
                                >
                                    <div className={
                                        "p-1 bg-opacity-80 cursor-pointer" + 
                                        badgeColor(partOfSpeech)
                                    }>{ stem }</div>
                                </span>
                            ) ) }
                            
                        </div>
                        <div className="w-auto mr-2 ml-auto">
                            <div className={
                                "card card-sm inline-block bg-primary-200 uppercase" 
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
        case 'plural noun':
            return ' bg-blue-400 text-always-black '
        case 'abbreviation or noun':
        case 'abbreviation':
            return ' bg-purple-400 text-always-black '
        case 'adjective':
            return ' bg-amber-400 text-always-black '
        case 'adverb':
        case 'verb':
        case 'phrasal verb':
            return ' bg-rose-400 text-always-black '

        case 'idiom':
        case 'biographical name':
        case 'geographical name':
        case 'idiomatic phrase':
        case 'verbal phrase':
        case 'Latin phrase':
            return ' bg-green-400 text-always-black '
        case 'symbol':
        case 'prefix':
        case 'suffix':
        case 'combining form':
        case 'preposition':
            return ' bg-slate-400 text-always-black '

        default:
            unhandled.add(pos)
            console.info({unhandled});
            return ' bg-slate-500 '
    }
}

export const Definition = ({ definition, sample }) => {

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
