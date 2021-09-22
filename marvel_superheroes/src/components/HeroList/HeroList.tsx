import React from "react";
import Hero from "../Hero/Hero";
import { IHero } from '../HomePage/HomePage'

interface IProps {
    heroes: IHero[]
}

class HeroList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
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
