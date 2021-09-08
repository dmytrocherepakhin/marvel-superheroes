import React from "react";
import Hero from "../Hero/Hero";
import { IHero } from '../HomePage/HomePage'

interface IProps {
    heroes: IHero[]
}

interface IState {
    heroes: IHero[];
}

class HeroList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { heroes: [] }
    }

    render(): JSX.Element {
        return (
            <div className='hero_heroes' >
                {this.props.heroes.map((item) => <Hero key={item.id} hero={item} />)}
            </div>
        )
    }
}

export default HeroList
