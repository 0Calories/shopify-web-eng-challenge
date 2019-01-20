import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


export default class Application extends React.Component {

  state = {
    lookupData: undefined,
    searchResults: [],
    favourites: []
  };

  // Grab the JSON data from the Toronto Waste Wizard website before the application loads
  componentWillMount() {
    fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000').then(res => {
      return res.json();
    }).then(lookupData => {
      this.setState({ lookupData });
    }).catch(err => {
      console.log(err);
    });
  }

  handleSearch = (searchInput) => {
    if (searchInput) {
      // Use the ES6 filter method on the lookupData.
      // This works by taking all objects where 'searchInput' is found in the 'title' or 'keywords' properties.
      let searchResults = this.state.lookupData.filter((item) =>
        item.keywords.includes(searchInput) || item.title.includes(searchInput)
      );

      this.setState({ searchResults });
    } else {
      // Clear the searchResults if an empty string was entered
      this.setState({ searchResults: [] });
    }
  };

  handleClearSearch = () => {
    this.setState({ searchResults: []});
  }

  render() {
    return (
      <div>
        <div className="header">
          Toronto Waste Lookup
        </div>
        <SearchBar 
          onSearch={this.handleSearch} 
          onClearSearch={this.handleClearSearch}
        />
        {this.state.searchResults.map((result) => 
            <SearchResult 
              title={result.title}
              body={result.body}
            />
        )}
      </div>
    )
  }

}