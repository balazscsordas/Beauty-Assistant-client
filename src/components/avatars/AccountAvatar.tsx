import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';
import Router from 'next/router';

const AccountAvatar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget);
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = async () => {
      try {
        const url = 'http://localhost:8001/logout';
        const response = await axios.delete(url, { withCredentials: true });
        console.log(response.data.message);
        setAnchorElUser(null);
        Router.push('/login');
      } 
      catch (e) {
        console.log(e);
      }
    }

    return (
        <>
            <IconButton onClick={handleOpenUserMenu} className="nav-link">
              <PersonIcon />Laci
            </IconButton>
            <Menu
              sx={{ mt: '-10px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon><ManageAccountsIcon fontSize="small"/></ListItemIcon>Adatok
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <ListItemIcon><Settings fontSize="small"/></ListItemIcon>Beállítások
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small"/></ListItemIcon>Kijelentkezés
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountAvatar;