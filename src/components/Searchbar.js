import React from 'react';

export default class Searchbar extends React.Component {

  state = {
    searchInput: undefined
  };

  handleSearch = e => {
    e.preventDefault();
    // Trim the input before performing a search
    const searchInput = this.state.searchInput.trim();
    // Update the searchInput in the state so whitespace is removed from the Searchbar input
    this.setState({ searchInput });
    // Use the onSearch method passed in by the Application component so the Application can display the results
    this.props.onSearch(searchInput);
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
            value={this.state.searchInput}
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