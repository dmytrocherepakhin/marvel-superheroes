/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import HeroList from '../HeroList/HeroList';
import Header from '../Header/Header';
import './HomePage.css';
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import queryString from 'query-string';
import HeroSearchBar from '../HeroSearchBar/HeroSearchBar';
import PaginationRounded from '../PaginationRounded';
import { useDispatch, useSelector } from 'react-redux';
import { getHeroesSaga } from '../../store/actions/actions';
import { store } from '../../index';
import { useHistory, useLocation } from 'react-router-dom';

export interface IHero {
  id: number;
  name: string;
  thumbnail: { path: string };
  description: string;
  path: string;
}

export type RootState = ReturnType<typeof store.getState>;

function HomePage(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { heroes, totalOfItems, progressBar, error } = useSelector(
    (state: RootState) => state.heroesReducer
  );

  const addressBarMaker = (
    queryArg?: string,
    sortArg?: string,
    pageArg?: number | null
  ): void => {
    const { query, sort, page } = queryString.parse(location.search);
    const newQuery = queryArg ? queryArg : query ? query?.toString() : '';
    const newSort = sortArg ? sortArg : sort ? sort?.toString() : '';
    const newPage = pageArg ? pageArg : page ? page : null;

    const queryData = newQuery ? 'query=' + newQuery : '';
    const sortData =
      newSort && newQuery
        ? '&sort=' + newSort
        : newSort
          ? 'sort=' + newSort
          : '';
    const pagedata =
      (newSort || newQuery) && newPage
        ? '&page=' + newPage
        : newPage
          ? 'page=' + newPage
          : '';
    history.push('?' + queryData + sortData + pagedata);
  };

  const setCurrentPage = (currentHeroesPage: number): void => {
    addressBarMaker('', '', currentHeroesPage);
  };

  const searchBarHandleSubmit = (
    nameStartsWith: string,
    orderBy: string
  ): void => {
    addressBarMaker(nameStartsWith, orderBy, 1);
  };

  const makeRequest = async (): Promise<void> => {
    const { query, sort, page } = queryString.parse(location.search);
    const orderBy = sort ? sort.toString() : 'name';
    const currentHeroesPage = page ? parseInt(page.toString()) : 1;
    const nameStartsWith = query ? query.toString() : '';
    dispatch(getHeroesSaga(currentHeroesPage, orderBy, nameStartsWith));
  };

  useEffect(() => {
    makeRequest();
  }, [location]);

  const { query, sort, page } = queryString.parse(location.search);
  const err = error;
  if (err) {
    console.log(err);
  }

  return (
    <div className="hero_main">
      <Header />
      <HeroSearchBar
        query={query ? query.toString() : null}
        sort={sort ? sort.toString() : null}
        searchBarHandleSubmit={searchBarHandleSubmit}
      />
      {progressBar ? (
        <ProgressBarIndeterminate />
      ) : (
        <div style={{ height: '8px' }} />
      )}
      <HeroList heroes={heroes} />
      <PaginationRounded
        count={Math.ceil(totalOfItems / 4)}
        setCurrentPage={setCurrentPage}
        page={page ? parseInt(page.toString()) : 1}
      />
    </div>
  );
}

export default HomePage;
