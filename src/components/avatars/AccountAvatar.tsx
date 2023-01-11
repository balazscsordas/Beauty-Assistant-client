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
import Link from 'next/link';

const AccountAvatar = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/logout";
        const response = await axios.delete(url, { withCredentials: true });
        setAnchorElUser(null);
        Router.push('/login');
      } 
      catch (e) {
        console.log(e);
      }
    }

    return (
        <>  
            <a onClick={handleOpenUserMenu}><PersonIcon /><span>Laci</span></a>
            <Menu
              sx={{ mt: '-10px'}}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Link href="/admin/user-data" passHref>
                  <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon><ManageAccountsIcon fontSize="small"/></ListItemIcon>Adatok
                  </MenuItem>
                </Link>
                <Link href="/admin/settings" passHref>
                  <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon><Settings fontSize="small"/></ListItemIcon>Beállítások
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small"/></ListItemIcon>Kijelentkezés
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountAvatar;