import React from 'react';
import Comics from '../Comics/Comics';
import Header from '../Header/Header';
import './ComicsPage.css';
import ProgressBarIndeterminate from '../ProgressBarIndeterminate';
import PaginationRounded from '../PaginationRounded';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../HomePage/HomePage';
import { getComicsSaga, IGetComicsSaga } from '../../store/actions/actions';

type IProps = {
  match: {
    params: {
      id: number;
    };
  };
  location: { search: string };
  history: RouteComponentProps['history'];
  heroName: string;
  comics: IComics[];
  totalOfItems: number;
  progressBar: boolean;
  getComicsSaga(currentComicsPage: number, heroId: number): IGetComicsSaga;
  error: string;
};

export interface IComics {
  path: string;
  description: string;
  title: string;
  id: number;
  thumbnail: { path: string };
}

interface IState {
  currentComicsPage: number;
}

class ComicsPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.state = {
      currentComicsPage: 1
    };
  }

  addressBarMaker = (pageArg: number | null): void => {
    this.props.history.push('?page=' + pageArg);
  };

  setCurrentPage = (currentComicsPage: number): void => {
    this.setState({ currentComicsPage });
    this.addressBarMaker(currentComicsPage);
  };

  makeRequest = async (): Promise<void> => {
    const page = queryString.parse(this.props.location.search).page;
    const heroId = this.props.match.params.id;
    const currentComicsPage = page
      ? parseInt(page.toString())
      : this.state.currentComicsPage;
    this.props.getComicsSaga(heroId, currentComicsPage);
  };

  async componentDidMount(): Promise<void> {
    this.makeRequest();
  }

  async componentDidUpdate(prevProps: IProps): Promise<void> {
    if (this.props.location !== prevProps.location) {
      this.makeRequest();
    }
  }

  render(): JSX.Element {
    const queryStringParse = queryString.parse(this.props.location.search);
    const pageInAddressBar = queryStringParse.page?.toString();
    const err = this.props.error;
    if (err) {
      console.log(err);
    }

    return (
      <div className="comics_main">
        <Header />
        <div className="comics_main__title">
          <h1 className="comics_main__title-text">
            {this.props.heroName} comics
          </h1>
        </div>
        {this.props.progressBar ? (
          <ProgressBarIndeterminate />
        ) : (
          <div style={{ height: '8px' }} />
        )}
        {this.props.comics.map((item) => (
          <Comics key={item.id} comics={item} />
        ))}
        <PaginationRounded
          count={Math.ceil(this.props.totalOfItems / 4)}
          setCurrentPage={this.setCurrentPage}
          page={pageInAddressBar ? parseInt(pageInAddressBar) : 1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { heroName, comics, totalOfItems, progressBar, error } =
    state.comicsReducer;
  return {
    heroName,
    comics,
    totalOfItems,
    progressBar,
    error
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getComicsSaga: (currentComicsPage: number, heroId: number) =>
      dispatch(getComicsSaga(currentComicsPage, heroId))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ComicsPage);
