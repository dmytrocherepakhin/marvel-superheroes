import React from "react";
import './HeroSearchBar.css';

interface IProps {
    query: string | null,
    sort: string | null,
    searchBarHandleSubmit(
        changeInputState: boolean,
        nameStartsWith: string,
        changeSelectState: boolean,
        orderBy: string
    ): void
}

interface IState {
    nameStartsWith: string,
    orderBy: string,
    changeInputState: boolean,
    changeSelectState: boolean
}

class HeroSearchBar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            nameStartsWith: '',
            orderBy: 'name',
            changeInputState: false,
            changeSelectState: false
        }
    }

    handleInput = (event: React.ChangeEvent): void => {
        const target = event.target as HTMLInputElement;
        this.setState({
            nameStartsWith: target.value,
            changeInputState: true,
        })
    }

    handleSelect = (event: React.ChangeEvent): void => {
        const target = event.target as HTMLSelectElement;
        this.setState({
            orderBy: target.value,
            changeSelectState: true,
        })
    }

    handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();
        const { changeInputState, nameStartsWith, changeSelectState, orderBy } = this.state;
        this.props.searchBarHandleSubmit(changeInputState, nameStartsWith, changeSelectState, orderBy);
        this.setState({
            changeInputState: false,
            changeSelectState: false,
        })
    }

    render(): JSX.Element {

        let inputValue = this.state.nameStartsWith;
        let selectValue = this.state.orderBy;

        if (this.state.changeInputState) {
            inputValue = this.state.nameStartsWith
        } else if (this.props.query) {
            inputValue = this.props.query
        }

        if (this.state.changeSelectState) {
            selectValue = this.state.orderBy
        } else if (this.props.sort) {
            selectValue = this.props.sort
        }

        return (
            <div className='hero_seach'>
                <form onSubmit={this.handleSubmit} className='hero_search__form'>
                    <input onChange={this.handleInput} value={inputValue} className='hero_search__input' type="text" />
                    <select onChange={this.handleSelect} value={selectValue} className='hero_search__sort' name="sort" >
                        <option value="name">By name</option>
                        <option value="-name">By name (reverse)</option>
                        <option value="modified">Modified</option>
                        <option value="-modified">Modified (reverse)</option>
                    </select>
                    <button className='hero_search__submit' type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default HeroSearchBar
