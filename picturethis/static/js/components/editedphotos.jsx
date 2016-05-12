import React from 'react';
class EditedPhotoList extends React.Component {
    constructor() {
        super();
        this.state = {
            editedphotos: []
        };
        this._fetcheditedPhotos = this._fetcheditedPhotos.bind(this);
    }

    componentDidMount(){
        this._fetcheditedPhotos();
    }

    render(){
        const editedphotos = this._geteditedPhotos();
        return(
            <div className="photos-list">
                {editedphotos}
            </div>
        );
    }

    _fetcheditedPhotos() {
        $.ajax({
            type: 'GET',
            url: '/api/edits/',
            success: (editedphotos) => {
                // this.setState({originalphotos});
                console.log(this.state);
                this.setState({editedphotos: editedphotos });
                console.log(this.state.editedphotos);
            }
        });
    }

    _geteditedPhotos(){
        return this.state.editedphotos.map((editedphoto) => {
            return (<EditedPhoto
                key={editedphoto.id}
                body={editedphoto.image}/>);
        });
    }
}

const EditedPhoto = (props) => {
    return(
        <div className="original-photos">
            <h5>Filtered Image names</h5>
            <img src={this.props.body}/>
        </div>
    );
}

export default EditedPhotoList