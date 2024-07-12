import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
   
  ];

  const drawer = (
    <div className="bg-gray-100 h-full">
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} href={item.href} onClick={handleDrawerToggle}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static" className="bg-gradient-to-r from-blue-500 to-purple-600">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="mr-2 lg:hidden"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className="flex-grow">
            WebSite
          </Typography>
          <div className="flex m-0 ml-auto">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="lg:hidden"
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;