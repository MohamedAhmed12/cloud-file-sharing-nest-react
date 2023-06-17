import React, { useState, MouseEvent } from 'react';

import './header.scss';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Menu, MenuItem, Tooltip, IconButton, Avatar } from '@mui/material';

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: MouseEvent) => setAnchorEl(event.currentTarget);

  return (
    <header className="transparent-header">
      <CloudUploadOutlinedIcon className="upload-icon" />

      <Tooltip title="Account settings" onClick={handleClick}>
        <IconButton onClick={handleClick}>
          <Avatar sx={{ width: 50, height: 50 }}></Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Files</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;
