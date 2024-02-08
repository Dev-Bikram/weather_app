import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (route: string) => {
    router.push(route);
    setIsDrawerOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
          

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src='https://cdn.iconscout.com/icon/free/png-256/free-weather-191-461610.png?f=webp' alt='logo' height={80}/>
        </Typography>

        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h2>
         Weather-App
          </h2>
        </Typography>

       
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
          <List>
            <ListItem button onClick={() => handleNavigation('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/ratepages')}>
              <ListItemText primary="Games" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/exchangepages')}>
              <ListItemText primary="Teams" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/MarketPage')}>
              <ListItemText primary="Coaches" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/MarketPage')}>
              <ListItemText primary="Conferences" />
            </ListItem>
         
         
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
