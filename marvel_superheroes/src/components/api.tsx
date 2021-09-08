import axios, { AxiosResponse } from "axios";
import { IGetHeroes } from "./HomePage/HomePage";
import { RouteComponentProps } from "react-router";
import queryString from 'query-string';
import { IGetComics } from "./ComicsPage/ComicsPage";
import { IComicsPops } from "./ComicsPage/ComicsPage";

const baseUrl = 'https://gateway.marvel.com';

export async function getHeroes(requestData: IGetHeroes, props: RouteComponentProps): Promise<AxiosResponse> {
    const limit = requestData.limit;
    const orderBy = requestData.orderBy;
    const offset = requestData.offset;
    const { query, sort, page } = queryString.parse(props.location.search);

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
        apikey: process.env.REACT_APP_API_KEY,
    }

    if (query) {
        params.nameStartsWith = query.toString();
    }
    if (sort) {
        params.orderBy = sort.toString();
    }
    if (page) {
        params.offset = (parseInt(page.toString()) - 1) * 4
    }
    const url = `${baseUrl}/v1/public/characters`;

    const requestHeroes = await axios.get(url, { params })
    try {
        return requestHeroes;
    } catch (err) {
        throw new Error('Error  of requestHeroes');
    }
}

export async function getComics(requestData: IGetComics, props: IComicsPops): Promise<AxiosResponse> {
    const limit = requestData.limit;
    let offset = requestData.offset;
    const page = queryString.parse(props.location.search).page;

    type Params = {
        limit: number,
        offset: number,
        apikey: string | undefined,
    }

    const params: Params = {
        limit: limit,
        offset: offset,
        apikey: process.env.REACT_APP_API_KEY,
    }

    if (page) {
        offset = (parseInt(page.toString()) - 1) * 4
    }

    const url = `${baseUrl}:443/v1/public/characters/${props.match.params.id}/comics`
    // const url = `${baseUrl}:443/v1/public/characters/${props.match.params.id}/comics?limit=${limit}&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`;

    const requestComics = await axios.get(url, { params })
    try {
        return requestComics;
    } catch (err) {
        throw new Error('Error  of requestComics');
    }
}

export async function getComicsHero(props: IComicsPops): Promise<AxiosResponse> {
    const urlHero = `${baseUrl}:443/v1/public/characters/${props.match.params.id}`;

    const requestComicsHero = await axios.get(urlHero, {
        params: {
            apikey: process.env.REACT_APP_API_KEY
        }
    })
    try {
        return requestComicsHero;
    } catch (err) {
        throw new Error('Error  of requestComicsHero');
    }
}
