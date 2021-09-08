import React from "react";

class HeroSearchBar extends React.Component {
    render(): JSX.Element {
        return (
            <div className='hero_seach'>
                <div className='hero_search__input'></div>
                <div className='hero_search__sort'></div>
                <div className='hero_search__btn'></div>
            </div>
        )
    }
}

export default HeroSearchBar
