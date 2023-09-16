import { useState } from "react";
import { Icon } from '../index'

export const ImageCard = ({ 
    src, className, 
    caption, startIndex
}) => {

    const [index, setIndex] = useState(startIndex);
    const [refresh, setRefresh] = useState(true);

    const setRandomIndex = () => {
        setIndex(
            Math.floor(Math.random()*src.length)
        );
        setRefresh(false);
    }
    
    return (
        <div className={"flex "+className}>
            <div className={"card bg-stripped bg-red  mx-auto relative"}>
                <img key={src[index]} alt="loading experience ..."
                    className="w-full rounded-sm"
                    src={`https://media.giphy.com/media/${src[index]}/giphy.gif`}
                    onLoad={() => { setRefresh(true) }}
                />
                {
                    refresh && <Icon 
                        icon="sync" 
                        className="absolute cursor-pointer top-1 right-2 text-3xl text-white bg-black opacity-50 px-1 rounded-full"
                        onClick={setRandomIndex} 
                    />
                }
            </div>
        </div>
    )
};
