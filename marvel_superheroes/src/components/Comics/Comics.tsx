import React from "react"
import "./Comics.css"
import { IComics } from "../ComicsPage/ComicsPage"

interface IProps {
  comics: IComics
}

class Comics extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <div className="comics_item">
        <div className="comics_item__picture">
          <img
            className="comics_item__picture-img"
            src={this.props.comics.thumbnail.path + ".jpg"}
            alt="comics"
          />
        </div>
        <div className="comics_item__info">
          <p>{this.props.comics.title}</p>
          <p style={{ whiteSpace: "pre-line" }}>
            {this.props.comics.description
              ? this.props.comics.description.replaceAll("<br>", "\n")
              : null}
          </p>
        </div>
      </div>
    )
  }
}

export default Comics
