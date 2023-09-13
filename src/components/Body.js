import React, { useContext, useEffect } from "react";
import { useDebounce } from 'usehooks-ts';
import { WordCard, ImageCard, SearchBar } from "./functional"
import { searchDictionaryResults, searchGiphy } from '../services/backend-service'
import { AppContext } from '../App'

const Body = () => {

    const {
        searchTerm, setSearchTerm,
        data, setData,
        src, setSrc,
        themeColor
    } = useContext(AppContext)

    useEffect(
        () => {
            setData([]);
            searchDictionaryResults(searchTerm).then((data) => {
                setData(data);
                searchGiphy(searchTerm).then((result) => {
                    setSrc(result);
                    console.info('Data and GIFs retrieved for', { searchTerm });
                })
            })
        },
        [ useDebounce(searchTerm, 500) ]
    )

    const getContent = () => {
        if (data[0] && data[0].partOfSpeech === null) {
            return (
                <div class="mx-auto w-7/12">
                    <div className="text-5xl text-gray-200 mt-8"> Maybe you meant ... </div>
                    {
                        data.map((w,i) => {
                            return (
                                <a key={i+'_stem'}
                                    className={`inline mr-4 text-pink-400 text-3xl hover:underline cursor-pointer`}
                                    onClick={() => {setSearchTerm(w.word)}}
                                > { w.word } </a>
                            )
                        })
                    }
                    <ImageCard 
                        className={"mx-auto lg:w-1/2 md:w-3/4 md:mx-auto ml-4 mr-6 my-8"} 
                        url={`https://media.giphy.com/media/${src[0]}/giphy.gif`}
                    />
                </div>
            )
        } else {
            // return paperLayout(data, src)
            return (
                data.map((w, i) => {
                    const card = [
                        <WordCard key={i+'_wrd'}
                            className="lg:w-1/2 md:w-3/4 md:mx-auto ml-4 mr-6 my-8"
                            defs={w.defs} word={w.word}
                            syllabic={w.syllabic} stems={w.stems}
                            partOfSpeech={w.partOfSpeech}
                            shortDef={w.shortDef}
                        />
                    ]
                    if (i%4 === 0 && src.length) {
                        card.push(
                            <ImageCard key={src[i]}
                                className={"lg:w-1/2 md:w-3/4 md:mx-auto ml-4 mr-6 my-8"}
                                url={`https://media.giphy.com/media/${src[i]}/giphy.gif`}
                            />
                        )
                    }
                    return card
                })
            )
        }
    }

    return (
        <div style={{ minHeight: '85vh' }}>
            {
                !searchTerm &&
                <ImageCard 
                    className={"mx-auto lg:w-1/2 md:w-3/4 md:mx-auto ml-4 mr-6 mt-8"} 
                    url={`https://media.giphy.com/media/${src[0]}/giphy.gif`}
                />
            }
            <SearchBar />
            { getContent() }
        </div>
    );
}

export default Body;


const paperLayout = (data, src) => {
    return (
        <div className="flex mt-8">
            <div className="flex w-full flex-wrap">{
                data.map((w, i) => {
                    return <WordCard key={i+'_wrd'}
                            className="w-full ml-4 mr-6 my-4"
                            defs={w.defs} word={w.word}
                            syllabic={w.syllabic} stems={w.stems}
                            partOfSpeech={w.partOfSpeech}
                            shortDef={w.shortDef}
                        />
                })
            }</div>
            <div className="flex w-3/4 flex-wrap items-center">
                {
                    data.map((w, i) => {
                        if (i%2 === 0 && src.length) {
                            return (
                                <ImageCard key={src[i]}
                                    className={"w-full h-auto ml-4 mr-6 my-4"}
                                    url={`https://media.giphy.com/media/${src[i]}/giphy.gif`}
                                />
                            )
                        }
                        return undefined
                    })
                }
            </div>
        </div>
    )
}