
import {
  Nav,
  Container,
  Brand,
  BrandImage,
  Menu,
  MenuItems,
  NavLink,
  MobileMenuContainer,
  MobileMenu,
  MobileMenuHover,
  BrandImage2,
} from './NavbarStyle';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import logo from './logo.png';
import logo2 from './nitt.png';


import { logout } from '../../../actions/adminAction';

export default function Navbar() {
  const screenSize = 880;
  const [menu, setMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  window.addEventListener('resize', (e) => {
    if (e.target.innerWidth < screenSize) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth < screenSize) setMenu(true);
  }, []);

  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    Swal.fire({
      icon: 'success',
      title: 'Admin',
      text: 'Logout Successfully.',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Nav>
        <Container ss={screenSize}>
          <Brand>
          {menu?(<BrandImage2 src={logo} alt="logo" />):(<BrandImage src={logo2} alt="logo2" />)}
         
          </Brand>

          <MobileMenuContainer
            menu={menu?true:false}
            onClick={() => setToggleMenu((!toggleMenu))}
          >
            <MobileMenu />
            <MobileMenuHover />
          </MobileMenuContainer>
          <Menu togglemenu={toggleMenu} ss={screenSize}>
            {admin ? (
              <>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink to="/admin" style={{ color: 'white' }}>
                    Home
                  </NavLink>
                </MenuItems>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink to="/profile" style={{ color: 'white' }}>
                    Profile
                  </NavLink>
                </MenuItems>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink to="/admin/notification" style={{ color: 'white' }}>
                    Notification
                  </NavLink>
                </MenuItems>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink
                    to="/"
                    style={{ color: 'white' }}
                    onClick={logoutHandler}
                  >
                    Logout
                  </NavLink>
                </MenuItems>
              </>
            ) : (
              <>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink to="/" style={{ color: 'white' }}>
                    Home
                  </NavLink>
                </MenuItems>
                <MenuItems togglemenu={toggleMenu}    onClick={() => setToggleMenu((!toggleMenu))} ss={screenSize}>
                  <NavLink to="/admin/login" style={{ color: 'white' }}>
                    Admin
                  </NavLink>
                </MenuItems>
              </>
            )}
          </Menu>
        </Container>
      </Nav>
    </div>
  );
}
