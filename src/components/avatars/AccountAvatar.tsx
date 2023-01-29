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
import Link from 'next/link';
import AuthContext from '../../context/AuthProvider';

const AccountAvatar = () => {

  const { firstName } = useContext(AuthContext);
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
          <a className='flex items-center mx-2 my-2 p-3 hover:bg-slate-100 hover:text-[#4154f1] rounded-xl cursor-pointer' onClick={handleOpenUserMenu}><PersonIcon className='m-auto lg:m-0'/><span className='ml-3 hidden lg:block'>{ firstName }</span></a>
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