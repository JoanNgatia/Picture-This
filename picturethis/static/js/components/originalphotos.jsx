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
        this.handleDelete = this.handleDelete.bind(this);
    }

    // set image render on component load on page
    componentWillMount(){
        imageActions.getallphotos();
    }

    componentDidMount() {
        imageStore.addChangeListener(this._fetchOriginalPhotos, 'photo');
        imageStore.addChangeListener(this._fetchOriginalPhotos, 'delete');
    }

    // collect all photos from server
    _fetchOriginalPhotos(){
        let data = imageStore.getPhotos();
        console.log('data:', data);
        if(data !== {}) {
            window.Materialize.toast('Welcome Back!', 2000, 'success-toast');
            this.setState({
                originalPhotos: data
            });
        } else {
            if(data)
            window.Materialize.toast('Please try again', 2000, 'error-toast');
        }
    }

    // map out all photos returned from server to the single photo component with each having unique id
    _getoriginalPhotos(){
        // console.log('mapping', this.state.originalPhotos);
        return this.state.originalPhotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                photo={originalphoto}
                body={originalphoto.image}
                uploader_id={originalphoto.owner}
                date_created={originalphoto.created_at}
                date_updated={originalphoto.updated_at}
                update={this.updateSelectedImage}
                delete={this.handleDelete}
                />);
        });
    }

    handleDelete(sel, event){
        // console.log(sel)
        // imageStore.setDeletedPhoto(sel)
        imageActions.deleteimage(sel.id)
        imageActions.deleteimagefromstore(sel.id)
    }

    // send image data to the server
    _addphoto(photo){
        let formData = new FormData();
        let files = document.getElementById('files').files;
        Object.keys(files).forEach((index) => {
            formData.append("image", files[index]);
        });
        request
            .post('/api/photos/')
            .send(formData)
            .end(
                (err, result) => {
                console.log(result.body)
                this.setState({
                    originalPhotos: [result.body, ...this.state.originalPhotos]
                });
            });
    }

    // set selected photo to clicked photo
    updateSelectedImage(sel, event) {
        imageStore.setSelectedPhoto(sel)
        imageActions.getimagefilters(sel.id)
    }

    // handle form submission
    _handleSubmit(event){
        event.preventDefault();
        this._addphoto(this.state.newPhoto);
    }

    // handle file input on image upload form
    _handleChange(event){
        event.preventDefault();
        let photo =  event.target.value
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
                      <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
                      <p><a className="btn-floating red tooltipped" data-position="right" data-delay="50" data-tooltip="Delete" onClick={() => props.delete(props.photo)}><i className="material-icons">delete</i></a></p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Pic Details<i className="material-icons right">close</i></span>
                      <p>Uploader:
                        {props.uploader_id}
                      </p>
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