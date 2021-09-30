import React from 'react';
import Hero from '../Hero/Hero';
import { IHero } from '../HomePage/HomePage';

interface IProps {
  heroes: IHero[];
}

function HeroList(props: IProps): JSX.Element {
  return (
    <div className="hero_heroes">
      {props.heroes.map((item) => (
        <Hero key={item.id} hero={item} />
      ))}
    </div>
  );
}

export default HeroList;
