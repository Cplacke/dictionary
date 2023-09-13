
export const getWordOfDay = () => {

    // TODO add a hash based read for the words
    return words[
        Math.round(Math.random()*words.length-1)
    ];
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