import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class FileUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFile: null };
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileSelect(file) {
    this.setState({ selectedFile: file[0] });
  }

  async handleFileUpload() {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    try {
      const res = await axios.props('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { selectedFile } = this.state;
    return (
      <Dropzone onDrop={this.handleFileSelect}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />

            {selectedFile ? (
              <p>Selected file: {selectedFile.name}</p>
            ) : (
              <p>Drag and drop a file here, or click to select a file</p>
            )}

            <button onClick={this.handleFileUpload}>Upload File</button>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default FileUploadForm;
