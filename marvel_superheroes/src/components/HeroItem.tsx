import React from "react";

class HeroItem extends React.Component {
    render(): JSX.Element {
        return (
            <div className='hero_item'>
                <div className='hero_item__avatar'>
                    <img src="#" alt="avatar" />
                </div>
                <div className='hero_item__info'></div>
                <div className='hero_item__btn'></div>
            </div>
        )
    }
}

export default HeroItem
