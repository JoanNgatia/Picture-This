import React from 'react';
import request from 'superagent';
import {OriginalPhoto} from './originalphotos.jsx';
import imageStore from '../stores/imageStore';
import * as imageActions from '../actions/imageActions';
// import share from '../main.js';
import * as h from '../main.js';

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';
const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

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
    this._onSave = this._onSave.bind(this);
  }

  // set image render on component load on page
  componentWillMount(){
      // this.setState({selectedPhoto: './static/img/artpaint.jpeg'})
      imageStore.addChangeListener(this._fetchSelectedPhoto, 'select');
      imageStore.addChangeListener(this._fetchPreviewFilters, 'preview')
  }

  // set selected photo on canvas
  _fetchSelectedPhoto() {
    let photo = imageStore.getSelectedPhoto();
    this.setState({selectedPhoto: photo})
  }

  // collect all photos from server
  _fetchPreviewFilters(){
      let data = imageStore.getFilters();
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
              body={window.location.origin + '/' + filteredphoto.image}
              effect_name={filteredphoto.effect}
              update_canvas={this.updateSelectedFilter}
              save_image={this._onSave}
              />);
      });
  }

  // update selected flter preview photo on canvas
  updateSelectedFilter(sel, event) {
        this.setState({selectedPhoto: sel})
  }

  _onSave(sel, event) {
    console.log(sel)
    imageActions.savefinalimage(sel.parent_image, sel.id);
  }

  // _shareImage(sel, event){
  // }

  render() {
    const previewphotos = this._getpreviewPhotos();
    return(
      <div>
        <div>
          <Canvas photo={this.state.selectedPhoto}/>
          <div className="fixed-action-btn">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">more_vert</i>
            </a>
            <ul>
              <li><a className="btn-floating red tooltipped" data-position="left" data-delay="50" data-tooltip="Edit photo"><i className="material-icons">mode_edit</i></a></li>
              <li><a className="btn-floating yellow tooltipped" data-position="left" data-delay="50" data-tooltip="Clear canvas"><i className="material-icons">layers_clear</i></a></li>
            </ul>

          </div>
        </div>
        <div className="fbshare">

        </div>
        <div className="filters row">
          {previewphotos}
        </div>
      </div>
      );
  }
}

//  render preview thumbnails
const PreFilteredPhoto  = (props) => {
      return(
        <div className="previews">
          <img src={props.body} width="150" height="100" onClick={() => props.update_canvas(props.filter)}/>
          <p className="effect_name">{props.effect_name}</p>
        </div>
        );
}

// render image in focus on canvas
const Canvas = (props) => {
      return (
        <div className="row">
        {props.photo
          ?<div className="canvas col s9">
            {!props.photo.parent_image
              ? <img src={props.photo ? props.photo.image: this.state.selectedPhoto} width="800" height="500"/>
              : <img src={window.location.origin + '/' + props.photo.image} width="800" height="500"/>
            }
            <div>

            <a className="btn" onClick={h.share((props.photo.image).substring((props.photo.image).indexOf('media') -1))}></a>
            </div>
          </div>
          :<div className="canvas col s9">
            <img src={window.location.origin + "/static/img/emptycanvas.jpg"} width="800" height="500"/>
          </div>
        }
        </div>
      );
}

export default ImagePanel