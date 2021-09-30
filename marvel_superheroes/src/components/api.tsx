import axios, { AxiosResponse } from 'axios';

const baseUrl = 'https://gateway.marvel.com';

export async function getHeroes(
  currentHeroesPage: number,
  orderBy: string,
  nameStartsWith?: string
): Promise<AxiosResponse> {
  const limit = 4;
  const offset = (currentHeroesPage - 1) * limit;

  type Params = {
    nameStartsWith?: string;
    limit: number;
    offset: number;
    orderBy: string;
    apikey: string | undefined;
  };

  const params: Params = {
    limit,
    offset,
    orderBy,
    apikey: process.env.REACT_APP_API_KEY_2
  };

  if (nameStartsWith) {
    params.nameStartsWith = nameStartsWith;
  }

  const url = `${baseUrl}/v1/public/characters`;
  const requestHeroes = await axios.get(url, { params });
  try {
    return requestHeroes;
  } catch (err) {
    throw new Error('Error  of requestHeroes');
  }
}

export async function getComics(
  currentComicsPage: number,
  heroId: number
): Promise<AxiosResponse> {
  const limit = 4;
  const offset = (currentComicsPage - 1) * limit;

  type Params = {
    limit: number;
    offset: number;
    apikey: string | undefined;
  };

  const params: Params = {
    limit,
    offset,
    apikey: process.env.REACT_APP_API_KEY_2
  };

  const url = `${baseUrl}:443/v1/public/characters/${heroId}/comics`;
  const requestComics = await axios.get(url, { params });
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
      apikey: process.env.REACT_APP_API_KEY_2
    }
  });
  try {
    return requestComicsHero;
  } catch (err) {
    throw new Error('Error  of requestComicsHero');
  }
}
