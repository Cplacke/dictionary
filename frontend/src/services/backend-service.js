
export const searchDictionaryResults = async (term, learners = false) => {
    const res = await fetch(`http://localhost:8000/search?term=${term}`, { 
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    const data = await res.json();
    return data;
}

export const searchGiphy = async (term) => {
    const res = await fetch(`http://localhost:8000/gif?term=${term}`, { 
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    const data = await res.json();
    return data;
}
