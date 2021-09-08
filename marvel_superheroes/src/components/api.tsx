import axios, { AxiosResponse } from "axios";
import { IGetHeroes } from "./HomePage/HomePage";
import { RouteComponentProps } from "react-router";
import queryString from 'query-string';
import { IGetComics } from "./ComicsPage/ComicsPage";
import { IComicsPops } from "./ComicsPage/ComicsPage";

const baseUrl = 'https://gateway.marvel.com';


export async function getHeroes(requestData: IGetHeroes, props: RouteComponentProps): Promise<AxiosResponse> {
    const limit = requestData.limit;
    let nameStartsWith = requestData.nameStartsWith;
    let orderBy = requestData.orderBy;
    let offset = requestData.offset;
    const { query, sort, page } = queryString.parse(props.location.search);

    if (query) {
        nameStartsWith = "nameStartsWith=" + query
    }
    if (sort) {
        orderBy = sort.toString()
    }
    if (page) { offset = (parseInt(page.toString()) - 1) * 4 }

    const url = `${baseUrl}/v1/public/characters?${nameStartsWith}&limit=${limit}&offset=${offset}&orderBy=${orderBy}&apikey=${process.env.REACT_APP_API_KEY}`;

    const requestHeroes = await axios.get(url)
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

    if (page) { offset = (parseInt(page.toString()) - 1) * 4 }

    const url = `${baseUrl}:443/v1/public/characters/${props.match.params.id}/comics?limit=${limit}&offset=${offset}&apikey=${process.env.REACT_APP_API_KEY}`;

    const requestComics = await axios.get(url)
    try {
        return requestComics;
    } catch (err) {
        throw new Error('Error  of requestComics');
    }
}

export async function getComicsHero(props: IComicsPops): Promise<AxiosResponse> {
    const urlHero = `${baseUrl}:443/v1/public/characters/${props.match.params.id}?apikey=${process.env.REACT_APP_API_KEY}`;

    const requestComicsHero = await axios.get(urlHero)
    try {
        return requestComicsHero;
    } catch (err) {
        throw new Error('Error  of requestComicsHero');
    }
}
