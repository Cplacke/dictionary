const BASE_URL = 'https://diction.deno.dev'

export const searchDictionaryResults = async (term, learners = false) => {
    const res = await fetch(`${BASE_URL}/search?term=${term}`, { 
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    const data = await res.json();
    return data;
}

export const searchGiphy = async (term) => {
    const res = await fetch(`${BASE_URL}/gif?term=${term}`, { 
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    const data = await res.json();
    return data;
}
