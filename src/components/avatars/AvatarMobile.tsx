import React, { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';
import Router from 'next/router';
import AuthContext from '../../context/AuthProvider';
import Link from 'next/link';

const AvatarMobile = () => {

  const { auth } = useContext(AuthContext);
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
      const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/logout";
      const response = await axios.delete(url, { withCredentials: true });
      setAnchorElUser(null);
      deleteCookie();
    } 
    catch (e) {
      console.log(e);
    }
  }

  const deleteCookie = async () => {
    try {
      const url = "/api/deleteCookie";
      const response = await axios.delete(url, { withCredentials: true });
      Router.push('/');
    } 
    catch (e) {
      console.log(e);
    }
  }
  return (
      <>  
          <a onClick={handleOpenUserMenu} className="mr-2"><PersonIcon /></a>
          <Menu
            sx={{ mt: '30px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
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

export default AvatarMobile;