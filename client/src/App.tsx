import React from 'react';
import logo from './logo.svg';

import './App.css';

import FileUploadForm from './components/file-upload-form/FileUploadForm';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <FileUploadForm className="App-logo" />
      </header>
    </div>
  );
}

export default App;
