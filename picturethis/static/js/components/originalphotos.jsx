import React from 'react';
class OriginalPhotoList extends React.Component {
    constructor() {
        super();
        this.state = {
            originalphotos: []
        };
        this._fetchoriginalPhotos = this._fetchoriginalPhotos.bind(this);
    }

    componentDidMount(){
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
                console.log(this.state);
                this.setState({originalphotos:  originalphotos });
                console.log(this.state.originalphotos, 'states');
            }
        });
    }

    _getoriginalPhotos(){
        return this.state.originalphotos.map((originalphoto) => {
            return (<OriginalPhoto
                key={originalphoto.id}
                body={originalphoto.image}/>);
        });
    }
}

const OriginalPhoto  = (props) => {

        return(
            <div className="original-photos">
                <h5>Image names</h5>
                <img src={props.body}/>
            </div>
        );

}

export default OriginalPhotoList