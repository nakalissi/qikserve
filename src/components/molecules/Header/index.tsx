import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import Hero from "../../atoms/Hero";

const Header: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('MENU');
  let [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ['MENU', 'ENTRAR', 'CONTATO'];

  return (
    <>
    <AppBar position="static" sx={{ height: '52px', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ width: '100%', justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleOpenNavMenu}
              sx={{ 
                my: 2,
                width: '232px',
                height: '51px',
                color: 'white', 
                display: 'block', 
                paddingTop: '13px', 
                margin: 0, 
                borderRadius: 0,
                borderBottomWidth: 3,
                borderBottomStyle: 'solid', 
                borderBottomColor: activePage === page ? 'white' : 'transparent',
                '&:hover': {
                  borderBottomColor: 'white',
                }
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        
        <Box sx={{ width: '90%', display: { xs: 'flex', justifyContent: 'center', md: 'none' } }}>MENU</Box>
        <Box sx={{ width: '10%', display: { xs: 'flex', justifyContent: 'right', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
         
      </Container>
    </AppBar>
    <Hero />
    </>
  );
}

export default Header;
