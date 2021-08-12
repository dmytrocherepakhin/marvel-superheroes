import React from "react";

class Comics extends React.Component {
    render(): JSX.Element {
        return (
            <div className='comics_item'>
                <div className='comics_item__picture'>
                    <img className='comics_item__picture-img' src="#" alt="comics" />
                </div>
                <div className='comics_item__info'></div>
            </div>
        )
    }
}

export default Comics
