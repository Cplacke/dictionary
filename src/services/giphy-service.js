import giphyApi from "giphy-api";

const giphy_KEY = '9NEWkU8d9mtMTbEI3HWtc9ffhtRLbGAs'

export const searchGiphy = async (search) => {
    const result = await giphyApi(giphy_KEY).search(search);
    console.info('GIPHY :: ', { result });
    return result.data.map((i) => (i.id))
}