import React from 'react';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import './header.scss';

function Header() {
  return (
    <header className="transparent-header">
      <CloudUploadOutlinedIcon className="upload-icon" />
    </header>
  );
}

export default Header;
