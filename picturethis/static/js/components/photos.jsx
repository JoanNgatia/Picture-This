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
        const originalphotos = this._getoriginalPhotos();
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
            success: (originalphotos) => {
                // this.setState({originalphotos});
                console.log(this.state);
                this.setState({ originalphotos });
                console.log(originalphotos);
            }
        });
    }

    _getoriginalPhotos(){
        return this.state.originalphotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                body={originalphoto.image}/>);
                // image_path={originalphoto.image}
                // key={originalphoto.id}/>);
            // <img src={originalphoto.image}/>
            // <div>{originalphoto}</div>
        });
    }
}

class OriginalPhoto extends React.Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div className="original-photos">
                <h5>Image names</h5>
                <img src={this.props.body}/>
            </div>
        );
    }
}

export default PhotoList