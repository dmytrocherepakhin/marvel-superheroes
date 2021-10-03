import React from 'react';
import './Comics.css';
import { IComics } from '../ComicsPage/ComicsPage';

interface IProps {
  comics: IComics;
}

function Comics(props: IProps): JSX.Element {
  return (
    <div className="comics_item">
      <div className="comics_item__picture">
        <img
          className="comics_item__picture-img"
          src={props.comics.thumbnail.path + '.jpg'}
          alt="comics"
        />
      </div>
      <div className="comics_item__info">
        <p>{props.comics.title}</p>
        <p style={{ whiteSpace: 'pre-line' }}>
          {props.comics.description
            ? props.comics.description.replaceAll('<br>', '\n')
            : null}
        </p>
      </div>
    </div>
  );
}

export default Comics;
