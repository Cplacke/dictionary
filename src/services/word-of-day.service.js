import { useContext } from "react";
import { AppContext } from "../App";

export const getWordOfDay = () => {

    // // TODO add a hash based read for the words (unique for day?)
    // const { dataSet } = useContext(AppContext)

    // if ( dataSet && dataSet.length ) {
    //     return dataSet[
    //         Math.round(Math.random()*dataSet.length-1)
    //     ]
    // } else {
        return words[
            Math.round(Math.random()*words.length-1)
        ];
    // }
}


const words = [
    "Ubiquitous",
    "Cacophony",
    "Ephemeral",
    "Aplomb",
    "Anachronism",
    "Aberration",
    "Clandestine",
    "Ebullient",
    "Opulent",
    "Esoteric",
    "Voracious",
    "Quixotic",
    "Ineffable",
    "Nefarious",
    "Sycophant",
    "Mellifluous",
    "Languid",
    "Munificent",
    "Recalcitrant",
    "Sagacious",
    "Inexorable",
    "Meticulous",
    "Surreptitious",
    "Equivocate",
    "Exacerbate",
    "Delineate",
    "Capitulate",
    "Querulous",
    "Vociferous",
    "Perfidious",
    "Pernicious",
    "Precarious",
    "Reprehensible",
    "Reticent",
    "Superfluous",
    "Trepidation",
    "Intransigent",
    "Munificent",
    "Exonerate",
    "Pragmatic"
];