import React from 'react';
import request from 'superagent';
import imageStore from '../stores/imageStore';
import * as imageActions from '../actions/imageActions';
import toastr from 'toastr';

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
        console.log(imageStore.getPhotos());
        let data = imageStore.getPhotos();
        if(data !== {}) {
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
        if (!confirm('Are you sure you want to delete this image')) return;
        imageActions.deleteimagefromstore(sel.id)
    }

    // send image data to the server
    _addphoto(photo){
        let formData = new FormData();
        let files = document.getElementById('files').files;
        Object.keys(files).forEach((index) => {
            formData.append("image", files[index]);
        });
        toastr.info('Uploading your photo', null, {
                      timeOut: 2000
                    });
        request
            .post('/api/photos/')
            .send(formData)
            .end(
                (err, result) => {
                console.log('result',result.body)
                if(!err) {
                    toastr.info('Successfully Uploaded', null, {
                      timeOut: 2000
                    });
                    this.setState({
                        originalPhotos: [result.body, ...this.state.originalPhotos],
                        newPhoto: ''
                    });
                } else {
                    toastr.warning('Oops please try again', null, {
                      timeOut: 2000
                    });
                }
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
        this.setState({newPhoto: photo});
        this._addphoto(this.state.newPhoto);
    }


    componentWillUnmount(){
        imageStore.removeChangeListener(this._fetchOriginalPhotos);
    }

    render(){
        const originalphotos = this._getoriginalPhotos();
        return(
            <div className="photos-list">
                <form enctype="multipart/form-data" onSubmit={this._handleSubmit.bind(this)}>
                    <div className="row">
                        <input style={{marginRight: 15}} className="col s5" value={this.state.newPhoto} id="uploadFile" placeholder="Choose File" disabled="disabled" />
                        <div className="file-upload btn btn-primary col s6">
                            <span>Upload</span>
                            <input type="file" className="upload" name="image" id="files" onChange={this._handleChange.bind(this)}/>
                        </div>
                    </div>
                </form>
                {originalphotos}
            </div>
        );
    }
}


// single photo component
const OriginalPhoto  = (props) => {
        console.log(props.photo.image)
        let name = (props.photo.image).split("myphotos/")[1]
        if (name.length < 20){
            let name = name.slice(20) + name.split(".")[1]
        }
        console.log(name);
        return(
            <div className="original-photos">
                <div className="card small">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img src={props.body} onClick={() => props.update(props.photo)} />
                    </div>
                    <div className="card-content">
                      <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
                      <a className="tooltipped" data-position="right" data-delay="50" data-tooltip="Download" href={props.photo.image} target="_self" download={name}><i className="material-icons">cloud_download</i></a>
                      <a style={{marginLeft: 15}} className="tooltipped" data-position="right" data-delay="50" data-tooltip="Delete" onClick={() => props.delete(props.photo)}><i className="material-icons">delete</i></a>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Pic Details<i className="material-icons right">close</i></span>
                      <p>Uploader:
                        {props.uploader_id}
                      </p>
                      <p>Name:
                        {name}
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

export default OriginalPhotoList