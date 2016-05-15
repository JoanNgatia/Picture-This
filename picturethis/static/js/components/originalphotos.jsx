import React from 'react';
class OriginalPhotoList extends React.Component {
    // set original component state
    constructor() {
        super();
        this.state = {
            originalphotos: []
        };
        this._fetchoriginalPhotos = this._fetchoriginalPhotos.bind(this);
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
                {originalphotos}
            </div>
        );
    }
}

// single photo component
const OriginalPhoto  = (props) => {

        return(
            <div className="original-photos">
                <h5>Image names</h5>
                <img src={props.body} width="400" height="400"/>
            </div>
        );

}

export default OriginalPhotoList