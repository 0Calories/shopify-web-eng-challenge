import React from 'react';

import Searchbar from './Searchbar';

// In my solution, I chose to save the JSON file provided by the Waste Wizard website.
// The data will be directly parsed, so no need for API calls
import recyclingData from './../database/data.json'; 

export default class Application extends React.Component {

  handleSearch = (searchInput) => {
    console.log(searchInput);
  }

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