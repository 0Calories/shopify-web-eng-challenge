import React from 'react';

export default class SearchBar extends React.Component {

  state = {
    searchInput: ''
  };

  handleSearch = e => {
    e.preventDefault();
    // Remove focus from the input so autofill suggestions are hidden
    this.refs.input.blur();
    // Trim the input before performing a search
    const searchInput = this.state.searchInput.trim();
    // Update the searchInput in the state so whitespace is removed from the SearchBar input
    this.setState({ searchInput });
    // Use the onSearch method passed in by the Application component so the Application can display the results
    this.props.onSearch(searchInput);
  }

  handleChangeSearchInput = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    return (
      <div className="search-bar">
        <form>
          <input 
            className="search-bar__input" 
            type="text" 
            name="search" 
            onChange={this.handleChangeSearchInput}
            value={this.state.searchInput}
            ref="input"
          />
          <input 
            className="search-bar__button" 
            type="image" 
            src="/images/search-icon.png" 
            onClick={this.handleSearch}
          />
        </form>
      </div>
    )
  }

}