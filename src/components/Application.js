import React from 'react';

import Searchbar from './Searchbar';

// In my solution, I chose to save the JSON file provided by the Waste Wizard website.
// The data will be directly parsed, so no need for API calls
import lookupData from './../database/data.json'; 

export default class Application extends React.Component {

  state = {
    lookupData
  };

  handleSearch = (searchInput) => {
    // Use the ES6 filter method on the lookupData.
    // This works by taking all objects where 'searchInput' is found in the 'title' or 'keywords' properties.
    const searchResults = this.state.lookupData.filter((item) => 
      item.keywords.includes(searchInput) || item.title.includes(searchInput)
    );
    console.log(searchResults);
  };

  render() {

    return (
      <div>
        <div className="header">
          Toronto Waste Lookup
        </div>
        <Searchbar onSearch={this.handleSearch} />
        Hello World!
      </div>
    )
  }

}