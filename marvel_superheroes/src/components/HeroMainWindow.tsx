import React from "react";
import HeroPagination from "./HeroPagination";
import HeroSearchBar from "./HeroSearchBar";
import Heroes from "./Heroes";
import HeroHeader from "./HeroHeader";

class HeroMainWindow extends React.Component {
    render(): JSX.Element {
        return (
            <div className='hero_main'>
                <HeroHeader />
                <HeroSearchBar />
                <Heroes />
                <HeroPagination />
            </div>
        )
    }
}

export default HeroMainWindow
