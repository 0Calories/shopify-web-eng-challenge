import React from 'react';

const parser = new DOMParser();

export default class SearchResult extends React.Component {

  state = {
    body: ''
  };

  // Called whenever the props are updated for this SearchResult component, or a new SearchResult is created
  static getDerivedStateFromProps(props, state) {
    if (props.body !== state.body) {
      // Convert the body text into HTML so it can be directly set in the render method
      const bodyHTML = parser.parseFromString(props.body, "text/html");
      
      return {
        body: bodyHTML.documentElement.textContent,
      };
    } 
  }

  handleToggleFavourite = () => {
    const favouriteObject = {
      title: this.props.title,
      body: this.props.body,
      id: this.props.id
    };

    if (this.props.isFavourite) {
      this.props.onRemoveFavourite(favouriteObject);
    } else {
      this.props.onAddFavourite(favouriteObject);
    }
    this.setState({ favourite: !this.props.isFavourite});
  }

  render() {

    return (
      <div className="result-container">
        <div className="icon-wrapper">
          <i
            className={this.props.isFavourite ? "fas fa-star fa-star--favourite" : "fas fa-star"}
            onClick={this.handleToggleFavourite}
          />
        </div>
        <div className="result-title">
          
          {this.props.title}
        </div>
        <div 
          className="result-body"
          dangerouslySetInnerHTML={{ __html: this.state.body }}
        >
        </div>
      </div>
    )
  }

}