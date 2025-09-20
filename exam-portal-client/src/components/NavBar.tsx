import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/react.png';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

const pages = [{name:'Exams', path:'/home/exams'}, {name:'Results',path:"/home/results"}, {name:'Blog',path:"/home/blog"}];
const settings = [{name:'Profile',path:"/profile"}, {name:'Dashboard',path:"/home/dashboard"}, {name:'Logout',path:"/logout"}];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#111827', boxShadow: "0px 1px 2px rgba(0,0,0,0.05)"  }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
            <Avatar alt="logo" src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
        
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            ExamEasy
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                <MenuItem sx={{  "&:hover": { backgroundColor: "#f0f0f0", color: "#d23819ff" } 
             , color: location.pathname === page.path ? "#d23819ff" : "#111827",
            fontWeight: location.pathname === page.path ? "bold" : "normal",}} 
                key={page.name}
                 onClick={handleCloseNavMenu}
                  component={NavLink}
                to={page.path}
                 >
                <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
        <Avatar alt="logo" src={logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
        <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            }}
        >
            ExamEasy
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
            <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' ,"&:hover": { backgroundColor: "#f0f0f0", color: "#d23819ff" }
            , color: location.pathname === page.path ? "#d23819ff" : "#111827",
            fontWeight: location.pathname === page.path ? "bold" : "normal",}
            }
            >
                {page.name}
            </Button>
            ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
            </IconButton>
            </Tooltip>
            <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} component={NavLink}
                to={setting.path} onClick={handleCloseUserMenu}  sx={{
      color: location.pathname === setting.path ? "#1976d2" : "black",
      fontWeight: location.pathname === setting.path ? "bold" : "normal",
    }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
