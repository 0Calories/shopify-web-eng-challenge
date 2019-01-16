import React from 'react';
import ReactDOM from 'react-dom';

export default class Searchbar extends React.Component {

  render() {
    return (
      <div className="searchbar">
        <form>
          <input className="searchbar__input" type="text" name="search" />
          <input className="searchbar__button" type="image" />
        </form>
      </div>
    )
  }

}