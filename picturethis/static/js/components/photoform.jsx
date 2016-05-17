import React from 'react';
class PhotoForm extends React.Component{
    constructor() {
        super();
        this.state = {
            file: ""
        };
    }

    _handleFileChange(event) {
        this.setState({file: event.target.value});
    }

    _handleSubmit(event) {
        event.preventDefault();
        // var file = this.state.file;
        this.props.onFileSubmit({file: file});
        this.setState({file: ''});
    }

    render() {
        return (
            <form className="photouploadform" onSubmit={this.handleSubmit}>
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Add new Photo</span>
                    <input type="file"
                           placeholder="Add New Photo"
                           value={this.state.file}
                           onChange={this._handleFileChange}
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                  </div>
                </div>
            </form>
        );
    }
}
export default PhotoForm