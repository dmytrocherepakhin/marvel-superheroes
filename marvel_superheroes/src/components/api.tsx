import axios, { AxiosResponse } from "axios";

const baseUrl = 'https://gateway.marvel.com';

export async function getHeroes(
    orderBy: string,
    currentHeroesPage: number,
    query: string | string[] | null,
    sort: string | string[] | null,
    page: string | string[] | null): Promise<AxiosResponse> {
    const limit = 4;
    const offset = ((currentHeroesPage - 1) * limit);

    type Params = {
        nameStartsWith?: string,
        limit: number,
        offset: number,
        orderBy: string,
        apikey: string | undefined,
    }

    const params: Params = {
        limit: limit,
        offset: offset,
        orderBy: orderBy,
        // apikey: process.env.REACT_APP_API_KEY,
        apikey: process.env.REACT_APP_API_KEY_2,
    }

    if (query) {
        params.nameStartsWith = query.toString();
    }
    if (sort) {
        params.orderBy = sort.toString();
    }
    if (page) {
        params.offset = (parseInt(page.toString()) - 1) * limit
    }
    const url = `${baseUrl}/v1/public/characters`;
    const requestHeroes = await axios.get(url, { params })
    try {
        return requestHeroes;
    } catch (err) {
        throw new Error('Error  of requestHeroes');
    }
}



export async function getComics(
    currentComicsPage: number,
    page: string | string[] | null,
    heroId: number
): Promise<AxiosResponse> {
    const limit = 4;
    let offset = ((currentComicsPage - 1) * limit);

    type Params = {
        limit: number,
        offset: number,
        apikey: string | undefined,
    }

    const params: Params = {
        limit: limit,
        offset: offset,
        // apikey: process.env.REACT_APP_API_KEY,
        apikey: process.env.REACT_APP_API_KEY_2,
    }

    if (page) {
        offset = (parseInt(page.toString()) - 1) * limit
    }

    const url = `${baseUrl}:443/v1/public/characters/${heroId}/comics`
    const requestComics = await axios.get(url, { params })
    try {
        return requestComics;
    } catch (err) {
        throw new Error('Error  of requestComics');
    }
}

export async function getComicsHero(heroId: number): Promise<AxiosResponse> {
    const urlHero = `${baseUrl}:443/v1/public/characters/${heroId}`;
    const requestComicsHero = await axios.get(urlHero, {
        params: {
            // apikey: process.env.REACT_APP_API_KEY
            apikey: process.env.REACT_APP_API_KEY_2
        }
    })
    try {
        return requestComicsHero;
    } catch (err) {
        throw new Error('Error  of requestComicsHero');
    }
}
