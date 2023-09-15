// const BASE_URL = 'https://diction.deno.dev'
const BASE_URL = 'http://localhost:8000'
const GET_OPTIONS = { 
    method: 'GET',
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // }
};

export const searchDictionaryResults = async (term, learners = false) => {
    const res = await fetch(
        `${BASE_URL}/search?term=${term}`,
        GET_OPTIONS
    );
    const data = await res.json();
    return data;
}

export const searchGiphy = async (term) => {
    const res = await fetch(
        `${BASE_URL}/gif?term=${term}`,
        GET_OPTIONS
    );
    const data = await res.json();
    return data;
}

export const getDataSets = async () => {
    const res = await fetch(
        `${BASE_URL}/game-data`,
        GET_OPTIONS
    );
    const data = await res.json();
    return data;
}

export const getDataSetByName = async (name) => {
    const res = await fetch(
        `${BASE_URL}/game-data?set=${name}`,
        GET_OPTIONS
    );
    const data = await res.json();
    return data;
}

export const getVersion = async () => {
    const res = await fetch(
        `${BASE_URL}/version`,
        GET_OPTIONS
    );
    const data = await res.text();
    return data;
}
