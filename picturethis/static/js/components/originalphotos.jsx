import React from 'react';
import request from 'superagent';

// import PhotoForm from'./photoform.jsx';
class OriginalPhotoList extends React.Component {
    // set original component state
    constructor() {
        super();
        this.state = {
            originalPhotos: [],
            newPhoto: null
        };
        this._fetchoriginalPhotos = this._fetchoriginalPhotos.bind(this);
        this._addphoto = this._addphoto.bind(this);
    }

    // set image render on component load on page
    componentWillMount(){
        this._fetchoriginalPhotos();
    }

    // collect all photos from server
    _fetchoriginalPhotos(){
        request
            .get('/api/photos/')
            .end(
                (err, result) => {
                this.setState({
                    originalPhotos: result.body
                });
            });
    }

    // map out all photos returned from server to the single photo component with each having unique id
    _getoriginalPhotos(){
        return this.state.originalPhotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                body={originalphoto.image}/>);
        });
    }

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

    render(){
        const originalphotos = this._getoriginalPhotos();
        return(
            <div className="photos-list">
                <form enctype="multipart/form-data" onSubmit={this._handleSubmit.bind(this)}>
                    <input type="file" name="image" id="files" onChange={this._handleChange.bind(this)}/>
                    <button className='add-photo' type="submit">Upload new Photo</button>
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
                <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={props.body} />
                    </div>
                    <div className="card-content">
                      <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
                      <p><a href="#">This is a link</a></p>
                    </div>
                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                      <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            </div>
        );

}

export default OriginalPhotoList