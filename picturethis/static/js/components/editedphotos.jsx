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
            <div className="filteredphotos">
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
                console.log(editedphotos);
            }
        });
    }

    _geteditedPhotos(){
        return this.state.editedphotos.map((editedphoto) => {
            return (<EditedPhoto
                key={editedphoto.id}/>);
        });
    }
}

class EditedPhoto extends React.Component {
    constructor() {
        super();
    }

    render(){
        return(
            <div className="filteredphotos">
                <h5>Filtered Image names</h5>
                <img src={this.props.body}/>
            </div>
        );
    }
}

export default EditedPhotoList