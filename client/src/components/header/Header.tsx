import React, { useState, MouseEvent } from 'react';

import 'assets/scss/components/header.scss';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClose = (route?: string) => {
    if (route) {
      navigate(route);
    }
    setAnchorEl(null);
  };
  const handleClick = (event: MouseEvent) => setAnchorEl(event.currentTarget);

  return (
    <header className="App-header transparent-header">
      <CloudUploadOutlinedIcon className="upload-icon" />

      <span className="right-group">
        <Tooltip title="login">
          <Button onClick={() => navigate('/auth/login')}>Login</Button>
        </Tooltip>
        <Tooltip title="register">
          <Button onClick={() => navigate('/auth/register')}>Register</Button>
        </Tooltip>

        <Tooltip title="Account settings" onClick={handleClick}>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 50, height: 50 }}></Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={() => handleClose()}
          onClose={() => handleClose()}
        >
          <MenuItem onClick={() => handleClose('/my-files')}>Files</MenuItem>
        </Menu>
      </span>
    </header>
  );
}

export default Header;
