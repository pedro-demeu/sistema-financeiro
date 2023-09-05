import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useTranslation } from 'react-i18next';
import { UserLoggedAtom } from '@/atoms/login';
import { useTheme } from '@mui/material';

export const TopBar: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [username, setUsername] = React.useState('');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const setLoggedUser = useSetRecoilState(UserLoggedAtom);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLoggedUser(null);
    navigate('/');
  };

  const settings = [
    {
      name: 'Meu Perfil',
      onClick: handleCloseUserMenu,
      key: Math.random()
    },
    {
      name: 'Contato',
      onClick: handleCloseUserMenu,
      key: Math.random()
    },
    {
      name: 'Sobre',
      onClick: handleCloseUserMenu,
      key: Math.random()
    },
    {
      name: 'Compartilhar',
      onClick: handleCloseUserMenu,
      key: Math.random()
    },
    {
      name: 'Logout',
      onClick: handleLogout,
      key: Math.random()
    }
  ];

  React.useEffect(() => {
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      setUsername(currentUser.username);
    }
  });

  return (
    <AppBar
      sx={{
        bgcolor: theme.palette.info.main
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center">
            <AttachMoneyIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                marginRight: 0.5,
                color: theme.palette.success.main
              }}
            />
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
                color: theme.palette.success.main,
                textDecoration: 'none'
              }}
            >
              {t('_common:finantial').toUpperCase()}
            </Typography>
          </Box>

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
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            ></Menu>
          </Box>
          <AttachMoneyIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            FINANCEIRO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
          <Typography
            sx={{
              marginRight: '0.5rem',
              color: 'white',
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}
          >
            {username}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleRoundedIcon
                  fontSize="large"
                  sx={{ color: 'white' }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.key} onClick={setting.onClick}>
                  <Typography color="#222" textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
