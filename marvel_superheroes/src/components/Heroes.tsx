import React from "react";
import HeroItem from "./HeroItem";

class Heroes extends React.Component {
    render(): JSX.Element {
        return (
            <div className='hero_heroes'>
                <HeroItem />
            </div>
        )
    }
}

export default Heroes
