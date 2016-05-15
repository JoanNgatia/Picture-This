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
        var file = this.state.file;
        this.props.onFileSubmit({file: file});
        this.setState({file: ''});
    }

    render() {
        return (
          <form className="photouploadform" onSubmit={this.handleSubmit}>
            <input
              type="file"
              placeholder="Add New Photo"
              value={this.state.file}
              onChange={this._handleFileChange}
            />
            <input type="submit" value="Post" />
          </form>
        );
    }
}
export default PhotoForm