import React from 'react';

import SearchBar from './SearchBar';
import SearchResult from './SearchResult';


export default class Application extends React.Component {

  state = {
    lookupData: undefined,
    searchResults: [],
    favourites: [],
    favouriteIds: [],
    pendingSearch: undefined
  };

  // Grab the JSON data from the Toronto Waste Wizard website before the application loads
  componentWillMount() {
    fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000').then(res => {
      return res.json();
    }).then(lookupData => {
      this.setState({ lookupData }, () => {
        // Check if there is a pending search and apply it now that the JSON has loaded
        if (this.state.pendingSearch)
          this.handleSearch(this.state.pendingSearch);
      });
    }).catch(err => {
      console.log(err);
    });

    // Get the saved favourites from the local storage, if they exist
    let favouritesJSON = localStorage.getItem('favourites');
    let favouriteIdsJSON = localStorage.getItem('favouriteIds');

    console.log(favouritesJSON);

    let favourites;
    let favouriteIds;
    // Set these variables to empty arrays if they are null
    if (!favouritesJSON)
      favourites = [];
    else
      favourites = JSON.parse(favouritesJSON);
    
    if (!favouriteIdsJSON)
      favouriteIds = [];
    else
      favouriteIds = JSON.parse(favouriteIdsJSON);

    this.setState({
      favourites,
      favouriteIds
    });
  }

  handleSearch = searchInput => {
    if (searchInput) {
      // If the user tried to search before the JSON data loaded, set the pendingSearch state variable so it can search when loaded
      if (!this.state.lookupData) {
        this.setState({ pendingSearch: searchInput });
        return;
      }
      // Use the ES6 filter method on the lookupData.
      // This works by taking all objects where 'searchInput' is found in the 'title' or 'keywords' properties.
      let searchResults = this.state.lookupData.filter((item) =>
        item.keywords.includes(searchInput) || item.title.includes(searchInput)
      );

      this.setState({ searchResults, pendingSearch: undefined });
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
      }), () => {
        // Store the favourites as a cookie so they can be accessed again when the page is refreshed
        localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
        localStorage.setItem('favouriteIds', JSON.stringify(this.state.favouriteIds));
      });
    } else {
      this.setState(prevState => ({
        favourites: [...prevState.favourites, favourite],
        favouriteIds: [...prevState.favouriteIds, favourite.title]
      }), () => {
        localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
        localStorage.setItem('favouriteIds', JSON.stringify(this.state.favouriteIds));
      });
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
    }, () => {
        localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
        localStorage.setItem('favouriteIds', JSON.stringify(this.state.favouriteIds));
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

        {this.state.pendingSearch && 
          <div className="loading-wrapper">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        }

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