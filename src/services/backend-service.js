const BASE_URL = 'https://diction.deno.dev'
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

export const getVersion = async () => {
    const res = await fetch(
        `${BASE_URL}/version`,
        GET_OPTIONS
    );
    const data = await res.text();
    return data;
}
