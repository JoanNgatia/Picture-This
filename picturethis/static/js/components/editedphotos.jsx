import React from 'react';
class EditedPhotoList extends React.Component {
    // set initial state of component
    constructor() {
        super();
        this.state = {
            editedphotos: []
        };
        this._fetcheditedPhotos = this._fetcheditedPhotos.bind(this);
    }

    // check that component is rendered with all edited photos
    componentDidMount(){
        this._fetcheditedPhotos();
    }

    // Fetch prerendered filters from server
    _fetcheditedPhotos() {
        $.ajax({
            type: 'GET',
            url: '/api/edits/',
            success: (editedphotos) => {
                console.log(this.state);
                this.setState({editedphotos: editedphotos });
                console.log(editedphotos);
            }
        });
    }

    // map prerendered filters to single photo component
    _geteditedPhotos(){
        return this.state.editedphotos.map((editedphoto) => {
            return (<EditedPhoto
                key={editedphoto.id}
                body={editedphoto.file_path}/>);
        });
    }

    render(){
        const editedphotos = this._geteditedPhotos();
        return(
            <div className="filteredphotos">
                {editedphotos}
            </div>
        );
    }
}

const EditedPhoto = (props) => {
    return(
        <div className="filteredphotos">
            <h5>Filtered Image </h5>
            <img src={props.body} width="400" height="400"/>
        </div>
    );
}

export default EditedPhotoList