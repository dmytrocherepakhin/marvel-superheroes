/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Comics from '../Comics/Comics';
import Header from '../Header/Header';
import './ComicsPage.css';
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import PaginationRounded from '../PaginationRounded';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../HomePage/HomePage';
import { getComicsSaga } from '../../store/actions/actions';

type IMatch = {
  params: {
    id: string;
  };
};

export interface IComics {
  path: string;
  description: string;
  title: string;
  id: number;
  thumbnail: { path: string };
}

function ComicsPage(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const match: IMatch = useRouteMatch();
  const [currentComicsPage, setCurrentComicsPage] = useState(1);

  const { heroName, comics, totalOfItems, progressBar, error } = useSelector(
    (state: RootState) => state.comicsReducer
  );
  const dispatch = useDispatch();

  const addressBarMaker = (pageArg: number | null): void => {
    history.push('?page=' + pageArg);
  };

  const setCurrentPage = (currentComicsPage: number): void => {
    setCurrentComicsPage(currentComicsPage);
    addressBarMaker(currentComicsPage);
  };

  const makeRequest = async (): Promise<void> => {
    const page = queryString.parse(location.search).page;
    const heroId = parseInt(match.params.id);
    const currentComicsPageToSaga = page
      ? parseInt(page.toString())
      : currentComicsPage;
    dispatch(getComicsSaga(heroId, currentComicsPageToSaga));
  };

  useEffect(() => {
    makeRequest();
  }, [location]);

  const pageInAddressBar = queryString.parse(location.search).page?.toString();
  const err = error;
  if (err) {
    console.log(err);
  }

  return (
    <div className="comics_main">
      <Header />
      <div className="comics_main__title">
        <h1 className="comics_main__title-text">{heroName} comics</h1>
      </div>
      {progressBar ? (
        <ProgressBarIndeterminate />
      ) : (
        <div style={{ height: '8px' }} />
      )}
      {comics.map((item) => (
        <Comics key={item.id} comics={item} />
      ))}
      <PaginationRounded
        count={Math.ceil(totalOfItems / 4)}
        setCurrentPage={setCurrentPage}
        page={pageInAddressBar ? parseInt(pageInAddressBar) : 1}
      />
    </div>
  );
}

export default ComicsPage;
