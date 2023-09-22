const LOCAL_STORAGE_KEY = 'appStorage'
export const getLocalStorage = () => {
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!value) {
        console.warn('no local storage object found, using default');
        return {
            themeColor: 'Rose',
            darkMode: false,
            dataSetName: 'SAT Terms',
            gold: 250,
            themes: [
                'Pink',
                'Rose',
                'Blue'
            ],
            highScores: {
                vocab: { }
            },
            savedTerms: {
                won: [],
                bookmark: []
            }
        };
    }
    return JSON.parse(value);
}

const writeToLocalStorage = (value) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, 
        JSON.stringify(value)
    );
}

export const patchLocalStorage = (partial) => {
    let value = getLocalStorage();
    writeToLocalStorage({
        ... value,
        ... partial
    });
} 

export const saveTermToLocal = (term, won=false) => {
    let value = getLocalStorage();
    if (won) {
        value.savedTerms.won.push(term);
        value.gold += 50;
    } else {
        value.savedTerms.bookmark.push(term);
    }
    
    writeToLocalStorage(value);
}

export const removeTermFromLocal = (term) => {
    let value = getLocalStorage();
    value.savedTerms.bookmark = value.savedTerms.bookmark
        .filter((t) => (t.word !== term.word && t.partOfSpeech !== term.partOfSpeech));

    writeToLocalStorage(value);
}

export const setGold = (count) => {
    patchLocalStorage({
        gold: count
    });
}
