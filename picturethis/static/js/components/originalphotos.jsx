import React from 'react';
import request from 'superagent';
import imageStore from '../stores/imageStore';
import * as imageActions from '../actions/imageActions';


class OriginalPhotoList extends React.Component {
    // set original component state
    constructor() {
        super();
        this.state = {
            originalPhotos: [],
            newPhoto: null
        };
        this._fetchOriginalPhotos = this._fetchOriginalPhotos.bind(this);
        this._addphoto = this._addphoto.bind(this);
        this.updateSelectedImage = this.updateSelectedImage.bind(this);
    }

    // set image render on component load on page
    componentWillMount(){
        imageStore.addChangeListener(this._fetchOriginalPhotos);
        imageActions.getallphotos();
    }

    // collect all photos from server
    _fetchOriginalPhotos(){
        let data = imageStore.getPhotos();
        if(data) {
            this.setState({
                originalPhotos: data
            });
        }
    }

    // map out all photos returned from server to the single photo component with each having unique id
    _getoriginalPhotos(){
        return this.state.originalPhotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                photo={originalphoto}
                body={originalphoto.image}
                date_created={originalphoto.created_at}
                date_updated={originalphoto.updated_at}
                update={this.updateSelectedImage}
                />);
        });
    }

    // send image data to the server
    _addphoto(photo){
        let formData = new FormData();
        let files = document.getElementById('files').files;
        Object.keys(files).forEach((index) => {
            formData.append("image", files[index]);
        });
        formData.append('owner',2);
        request
            .post('/api/photos/')
            .send(formData)
            .end(
                (err, result) => {
                this.setState({
                    originalPhotos: this.state.originalPhotos.concat(result.body)
                });
            });
    }

    updateSelectedImage(sel, event) {
       // event.preventDefault();
        imageStore.setSelectedPhoto(sel)
        imageActions.getimagefilters(sel.id)
    }

    _handleSubmit(event){
        event.preventDefault();
        console.log(this.state.newPhoto);
        this._addphoto(this.state.newPhoto);
    }

    _handleChange(event){
        event.preventDefault();
        let photo =  event.target.value
        console.log(photo);
        this.setState({newPhoto: photo})
    }


    componentWillUnmount(){
        imageStore.removeChangeListener(this._fetchOriginalPhotos);
    }
 // form for image upload
    render(){
        const originalphotos = this._getoriginalPhotos();
        return(
            <div className="photos-list">
                <form enctype="multipart/form-data" onSubmit={this._handleSubmit.bind(this)}>
                    <input type="file" name="image" id="files" onChange={this._handleChange.bind(this)}/>
                    <button className='btn btn-primary add-photo' type="submit">Upload new Photo</button>
                </form>
                {originalphotos}
            </div>
        );
    }
}


// single photo component
const OriginalPhoto  = (props) => {
        return(
            <div className="original-photos">
                <div className="card small">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img src={props.body} onClick={() => props.update(props.photo)} />
                    </div>
                    <div className="card-content">
                      <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                      <p><a href="#">This is a link</a></p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Pic Details<i className="material-icons right">close</i></span>
                      <p>Date Created:
                        {props.date_created}
                      </p>
                      <p>Date Modified:
                        {props.date_updated}
                      </p>
                    </div>
                </div>
            </div>
        );

}

module.exports = OriginalPhotoList