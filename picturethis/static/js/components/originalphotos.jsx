import React from 'react';
import PhotoForm from'./photoform.jsx';
class OriginalPhotoList extends React.Component {
    // set original component state
    constructor() {
        super();
        this.state = {
            originalphotos: [],
            newphoto: ""
        };
        this._fetchoriginalPhotos = this._fetchoriginalPhotos.bind(this);
        this._addphoto = this._addphoto.bind(this);
    }

    // set image render on component load on page
    componentDidMount(){
         this._fetchoriginalPhotos();
    }

    // collect all photos from server
    _fetchoriginalPhotos() {
        $.ajax({
            type: 'GET',
            url: '/api/photos/',
            success: (originalphotos) => {
                console.log(this.state);
                this.setState({originalphotos:  originalphotos });
                console.log(this.state.originalphotos, 'states');
            }
        });
    }

    _addphoto(event) {
        this.setState({newphoto: event.target.value})
    }

    _handlePhotoSubmit(photo){
        $.ajax({
          url: '/api/photos/',
          type: 'POST',
          data: photo,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/photos/', status, err.toString());
          }.bind(this)
        });
    }

    // map out all photos returned from server to the single photo component
    _getoriginalPhotos(){
        return this.state.originalphotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                body={originalphoto.image}/>);
        });
    }

    render(){
        const originalphotos = this._getoriginalPhotos();
        return(
            <div className="photos-list">
                <PhotoForm onFileSubmit={this._handlePhotoSubmit}/>
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