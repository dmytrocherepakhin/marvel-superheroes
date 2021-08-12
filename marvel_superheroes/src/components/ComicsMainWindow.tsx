import React from "react";
import Comics from "./Comics";
import HeroHeader from "./HeroHeader";

class ComicsMainWindow extends React.Component {
    render(): JSX.Element {
        return (
            <div className='comics_main'>
                <HeroHeader />
                <p className='comics_main__title'></p>
                <Comics />
            </div>
        )
    }
}

export default ComicsMainWindow
