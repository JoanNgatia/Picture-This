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
            </div>
        );
    }

    _fetchoriginalPhotos() {
        $.ajax({
            type: 'GET',
            url: '/api/photos/',
            success: (originalphotos) => {
                // this.setState({originalphotos});
                console.log(this.state);
                this.setState({ originalphotos });
            }
        });
    }
}
export default PhotoList