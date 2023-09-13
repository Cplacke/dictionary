import * as giphy from "https://deno.land/x/deno_giphy_api/mod.ts";

// TODO: export to Deno.env
const giphy_KEY = '9NEWkU8d9mtMTbEI3HWtc9ffhtRLbGAs'

export const searchGiphy = async (term: string) => {
    const result = await giphy.searchGif({
        api_key: giphy_KEY,
        q: term,
        limit: 40,
        offset: 0,
    });
    return [
        ... result.data.map((i: any) => (i.id))
    ];
}