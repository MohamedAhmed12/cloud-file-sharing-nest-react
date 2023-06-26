import FileUploadForm from '../components/forms/file-upload-form/FileUploadForm';
import Header from '../components/header/Header';

import 'assets/scss/pages/app.scss';

function App() {
  return (
    <div className="App">
        <Header />
        <FileUploadForm className="App-logo" />
    </div>
  );
}

export default App;
