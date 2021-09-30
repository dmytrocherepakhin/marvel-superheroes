import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import { IHero } from '../HomePage/HomePage';

interface IProps {
  hero: IHero;
}

function Hero(props: IProps): JSX.Element {
  return (
    <div className="hero_item">
      <div className="hero_item__avatar">
        <img
          className="hero_item__avatar-img"
          src={props.hero.thumbnail.path + '/' + 'standard_large' + '.jpg'}
          alt="---Hero--"
        />
      </div>
      <div className="hero_item__info">
        <p>{props.hero.name}</p>
        <p>{props.hero.description}</p>
      </div>
      <Link to={'/comics/' + props.hero.id} style={{ textDecoration: 'none' }}>
        <div className="hero_item__btn">See more</div>
      </Link>
    </div>
  );
}

export default Hero;
