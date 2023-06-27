import { Component } from 'react';

import 'assets/scss/components/forms/file-upload-form.scss';

import FileUploadFormProps from './interfaces/FileUploadFormProps';
import FileUploadFormState from './interfaces/FileUploadFormState';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class FileUploadForm extends Component<
  FileUploadFormProps,
  FileUploadFormState
> {
  constructor(props: FileUploadFormProps) {
    super(props);
    this.state = { selectedFile: null };
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileSelect(file: File[]) {
    this.setState({ selectedFile: file[0] });
  }

  async handleFileUpload() {
    const { selectedFile } = this.state;

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('/api/files', formData, {
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
          <div {...getRootProps({ className: 'drop-zone' })}>
            <input {...getInputProps()} />

            {selectedFile ? (
              <p>Selected file: {selectedFile.name}</p>
            ) : (
              <p>Drag and drop a file here, or click to select a file</p>
            )}

            <button className="App-link" onClick={this.handleFileUpload}>
              Upload File
            </button>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default FileUploadForm;
