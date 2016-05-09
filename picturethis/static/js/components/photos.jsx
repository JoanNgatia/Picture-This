import React from 'react';
class PhotoList extends React.Component {
    constructor() {
        super();
        this.state = {
            originalphotos: []
        };
        this._fetchoriginalPhotos = this._fetchoriginalPhotos.bind(this);
    }

    componentWillMount(){
        this._fetchoriginalPhotos();
    }

    render(){
        return(
            <div className="photos-list">
                {originalphotos}
            </div>
        );
    }

    _fetchoriginalPhotos() {
        $.ajax({
            type: 'GET',
            url: '/api/photos/',
            success: function(originalphotos){
                this.setState({originalphotos});
                console.log(`response code is ${result.status}`);
                console.log(this.state);
            }
        });
    }
}
export default PhotoList