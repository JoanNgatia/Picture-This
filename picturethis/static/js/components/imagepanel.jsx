import React from 'react';
import request from 'superagent';

class ImagePanel extends React.Component {
  // set original component state
  constructor(){
    super();
    this.state = {
        filteredPhotos: []
    };
    this._fetchpreviewFilters = this._fetchprerenderedFilters.bind(this);
  }

  // set image render on component load on page
  componentWillMount(){
      this._fetchpreviewFilters();
  }

  _fetchprerenderedFilters(){
    request
      .get('/api/photos/65/edits/')
      .end(
          (err, result) => {
          this.setState({
              filteredPhotos: result.body
          });
      });
  }

  // map out all photos returned from server to the single photo component with each having unique id
  _getpreviewPhotos(){
      return this.state.filteredPhotos.map((filteredphoto) => {
          return (<PreFilteredPhoto
              key={filteredphoto.id}
              body={'http://localhost:8000/' + filteredphoto.image}
              effect_name={filteredphoto.effect}
              />);
      });
  }

  render() {
    const previewphotos = this._getpreviewPhotos();
    return(
      <div>
        {previewphotos}
      </div>
      );
  }
}

const PreFilteredPhoto  = (props) => {
      return(
        <div className="filters">
          <img src={props.body} width="150" height="100"/>
          <p>{props.effect_name}</p>
        </div>
        );
}

module.exports = ImagePanel