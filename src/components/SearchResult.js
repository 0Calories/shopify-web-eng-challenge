import React from 'react';

const parser = new DOMParser();

export default class SearchResult extends React.Component {

  state = {
    favourite: false,
    body: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (props.body !== state.body) {
      // Convert the body text into HTML so it can be directly set in the render method
      const bodyHTML = parser.parseFromString(props.body, "text/html");
      
      return {
        body: bodyHTML.documentElement.textContent
      };
    }
  }

  render() {

    return (
      <div>
        <div className="result-title">{this.props.title}</div>
        <div 
          className="result-body"
          dangerouslySetInnerHTML={{ __html: this.state.body }}
        >
        </div>
      </div>
    )
  }

}