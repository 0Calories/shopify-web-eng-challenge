import React from 'react';

export default class Searchbar extends React.Component {

  state = {
    searchInput: undefined,
    favourites: []
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchInput);
  }

  handleChangeSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    return (
      <div className="searchbar">
        <form>
          <input 
            className="searchbar__input" 
            type="text" 
            name="search" 
            onChange={this.handleChangeSearchInput}
          />
          <input 
            className="searchbar__button" 
            type="image" 
            src="/images/search-icon.png" 
            onClick={this.handleSearch}
          />
        </form>
      </div>
    )
  }

}