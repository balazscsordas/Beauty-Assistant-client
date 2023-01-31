import React, { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import LangContext from '../../context/LanguageProvider';

const AvatarMobile = () => {

  const { lang } = useContext(LangContext);
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
      deleteCookie();
      setAnchorElUser(null);
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
                    <ListItemIcon><Settings fontSize="small"/></ListItemIcon>{ lang === 'hun' ? 'Beállítások' : 'Settings' }
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                  <ListItemIcon><Logout fontSize="small"/></ListItemIcon>{ lang === 'hun' ? 'Kijelentkezés' : 'Log out' }
              </MenuItem>
          </Menu>
      </>
  )
}

export default AvatarMobile;