import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

// In my solution, I chose to save the JSON file provided by the Waste Wizard website.
// The data will be directly parsed, so no need for API calls
// I'm doing this under the assumption that load time is not the utmost importance for this challenge.
// To improve load time and performance, I would store the JSON in Firebase instead and retrieve the data from there.
import lookupData from './../database/data.json'; 

export default class Application extends React.Component {

  state = {
    lookupData,
    searchResults: [],
    favourites: []
  };

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

  render() {
    return (
      <div>
        <div className="header">
          Toronto Waste Lookup
        </div>
        <SearchBar onSearch={this.handleSearch} />
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