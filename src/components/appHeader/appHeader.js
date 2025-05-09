import { Component } from "react";

import "./appHeader.scss"

export default class AppHeader extends Component {
  render() {
    return (
      <header className="app__header">
        <h1 className="app__title">
          <a href="#">
            <span>Marvel</span> information portal
          </a>
        </h1>
        <nav className="app__menu">
          <ul>
            <li>
              <a href="#">Characters</a>
            </li>
            /
            <li>
              <a href="#">Comics</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}