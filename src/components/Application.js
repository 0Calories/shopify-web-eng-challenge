import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


export default class Application extends React.Component {

  state = {
    lookupData: undefined,
    searchResults: [],
    favourites: [],
    favouriteIds: []
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

  handleSearch = searchInput => {
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
    this.setState({ searchResults: [] });
  };

  handleAddFavourite = favourite => {
    console.log(`${favourite.title} added`);

    // I've noticed that some objects do not have an id property.
    // In this case, use the title of the object as the id instead
    if (favourite.id) {
      this.setState(prevState => ({
        favourites: [...prevState.favourites, favourite],
        favouriteIds: [...prevState.favouriteIds, favourite.id]
      }));
    } else {
      this.setState(prevState => ({
        favourites: [...prevState.favourites, favourite],
        favouriteIds: [...prevState.favouriteIds, favourite.title]
      }));
    }
  };

  handleRemoveFavourite = favourite => {
    console.log(`${favourite.title} removed`);
    let favourites;
    let favouriteIds;

    // Check for the ID, but if the ID does not exist, check by using title
    if (favourite.id) {
      favourites = this.state.favourites.filter((fav) => fav.id !== favourite.id);
      favouriteIds = this.state.favouriteIds.filter((fav) => fav !== favourite.id);
    } else {
      favourites = this.state.favourites.filter((fav) => fav.title !== favourite.title);
      favouriteIds = this.state.favouriteIds.filter((fav) => fav !== favourite.title);
    }

    this.setState({
      favourites,
      favouriteIds
    });
  };

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
              id={result.id}
              onAddFavourite={this.handleAddFavourite}
              onRemoveFavourite={this.handleRemoveFavourite}
              isFavourite={this.state.favouriteIds.includes(result.id) || this.state.favouriteIds.includes(result.title)}
            />
        )}

        <div className="favourites">
          {this.state.favourites.length > 0 && <h1 className="favourites__header">Favourites</h1>}

          {this.state.favourites.map((result) =>
            <SearchResult
              title={result.title}
              body={result.body}
              id={result.id}
              onAddFavourite={this.handleAddFavourite}
              onRemoveFavourite={this.handleRemoveFavourite}
              isFavourite={true}
              isStatic={true}
            />
          )}
        </div>

      </div>
    )
  }

}