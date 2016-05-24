import React from 'react';
import request from 'superagent';
import {OriginalPhoto} from './originalphotos.jsx';
import imageStore from '../stores/imageStore';
import * as imageActions from '../actions/imageActions';

class ImagePanel extends React.Component {
  // set original component state
  constructor(){
    super();
    this.state = {
        filteredPhotos: [],
        selectedPhoto: ''
    };
    this._fetchPreviewFilters = this._fetchPreviewFilters.bind(this);
    this._fetchSelectedPhoto = this._fetchSelectedPhoto.bind(this);
    this.updateSelectedFilter = this.updateSelectedFilter.bind(this);
  }

  // set image render on component load on page
  componentWillMount(){
      imageStore.addChangeListener(this._fetchSelectedPhoto);
      imageStore.addChangeListener(this._fetchPreviewFilters)
  }

  _fetchSelectedPhoto() {
    let photo = imageStore.getSelectedPhoto();
    this.setState({selectedPhoto: photo})
  }

  // collect all photos from server
    _fetchPreviewFilters(){
        let data = imageStore.getFilters();
        // console.log(data);
        if(data) {
            this.setState({
                filteredPhotos: data
            });
        }
    }

  // map out all photos returned from server to the single photo component with each having unique id
  _getpreviewPhotos(){
      return this.state.filteredPhotos.map((filteredphoto) => {
          return (<PreFilteredPhoto
              key={filteredphoto.id}
              filter={filteredphoto}
              body={'http://localhost:8000/' + filteredphoto.image}
              effect_name={filteredphoto.effect}
              update_canvas={this.updateSelectedFilter}
              />);
      });
  }

  updateSelectedFilter(sel, event) {
        this.setState({selectedPhoto: sel})
  }
  _onSave () {
    imageActions.savefinalimage(p, p2, p3);
  }

  render() {
    const previewphotos = this._getpreviewPhotos();
    return(
      <div>
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large red">
            <i className="large material-icons">more_vert</i>
          </a>
          <ul>
            <li><a className="btn-floating red tooltipped" data-position="left" data-delay="50" data-tooltip="Edit photo"><i className="material-icons">mode_edit</i></a></li>
            <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
            <li><a className="btn-floating blue tooltipped" data-position="left" data-delay="50" data-tooltip="Clear canvas"><i className="material-icons">layers_clear</i></a></li>
          </ul>
        </div>
        <div className="save">
          <div className="btn" onClick={this._onSave}>Save</div>
        </div>
        <div>
          <Canvas photo={this.state.selectedPhoto}/>
        </div>
        <div className="filters row">
          {previewphotos}
        </div>
      </div>
      );
  }
}

const PreFilteredPhoto  = (props) => {
      console.log(props)
      return(
        <div className="col s3">
          <img src={props.body} width="150" height="100" onClick={() => props.update_canvas(props.filter)}/>
          <p>{props.effect_name}</p>
        </div>
        );
}

const Canvas = (props) => {
      return (
        <div className="canvas">
          {!props.photo.parent_image
            ? <img src={props.photo.image} width="800" height="500"/>
            : <img src={'http://localhost:8000/' + props.photo.image} width="800" height="500"/>
          }
        </div>
      );
}

export default ImagePanel