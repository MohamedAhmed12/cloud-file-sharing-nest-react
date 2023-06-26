import FileUploadForm from '../components/forms/file-upload-form/FileUploadForm';
import Header from '../components/header/Header';

import '../css/app.css';

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
