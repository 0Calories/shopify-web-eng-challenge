import React from 'react';
import ReactDOM from 'react-dom';

import Searchbar from './Searchbar';

export default class Application extends React.Component {

  render() {
    return (
      <div>
        <div className="header">
          Toronto Waste Lookup
        </div>
        <Searchbar />
        Hello World!
      </div>
    )
  }

}