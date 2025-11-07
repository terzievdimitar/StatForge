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
import StatForgeLogo from '../../public/icons/statforge-logo-light.svg';
import HideOnScroll from './HideOnScroll';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

const pages_landing = ['Products', 'Pricing', 'About', 'FAQ'];
const pages_dashboard = ['Overview', 'Hosting', 'Analytics', 'Development'];
const settings = ['Account', 'Logout'];

function ResponsiveAppBar() {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const { user, logout } = useUserStore();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (page?: string) => {
		setAnchorElNav(null);
		// User Not Logged In Navigation
		if (!user) {
			if (page === 'Products') {
				navigate('/#products');
			}
			if (page === 'Pricing') {
				navigate('/pricing');
			}
			if (page === 'About') {
				navigate('/about');
			}
			if (page === 'FAQ') {
				navigate('/#faq');
			}
		}

		// User Logged In Navigation
		if (page === 'Overview') {
			navigate('/dashboard/overview');
		}
		if (page === 'Hosting') {
			navigate('/dashboard/hosting');
		}
		if (page === 'Analytics') {
			navigate('/dashboard/analytics');
		}
		if (page === 'Development') {
			navigate('/dashboard/development');
		}
	};

	const handleCloseUserMenu = (setting?: string) => {
		setAnchorElUser(null);
		if (setting === 'Account') {
			navigate('/dashboard/account');
		}
		if (setting === 'Dashboard') {
			navigate('/dashboard/overview');
		}
		if (setting === 'Logout') {
			logout();
			navigate('/');
		}
	};

	return (
		<>
			<HideOnScroll>
				<AppBar position='fixed'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<Box
								component='a'
								href='/'
								sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
								<Box
									component='img'
									src={StatForgeLogo}
									alt='StatForge Logo'
									sx={{ mr: 1, width: 60, height: 60 }}
								/>
							</Box>

							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'>
									<MenuIcon />
								</IconButton>
								<Menu
									id='menu-appbar'
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
									onClose={() => handleCloseNavMenu()}
									sx={{ display: { xs: 'block', md: 'none' } }}>
									{user ? (
										<>
											{pages_dashboard.map((page) => (
												<MenuItem
													key={page}
													onClick={() => handleCloseNavMenu(page)}>
													<Typography sx={{ textAlign: 'center' }}>{page}</Typography>
												</MenuItem>
											))}
										</>
									) : (
										<>
											{pages_landing.map((page) => (
												<MenuItem
													key={page}
													onClick={() => handleCloseNavMenu(page)}>
													<Typography sx={{ textAlign: 'center' }}>{page}</Typography>
												</MenuItem>
											))}
										</>
									)}
								</Menu>
							</Box>
							<Box
								component='a'
								href='/'
								sx={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
								<Box
									component='img'
									src={StatForgeLogo}
									alt='StatForge Logo'
									sx={{ display: 'none', mr: 1 }}
								/>
							</Box>
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								{user ? (
									<>
										{pages_dashboard.map((page) => (
											<Button
												key={page}
												onClick={() => handleCloseNavMenu(page)}
												sx={{ my: 2, color: 'white', display: 'block' }}>
												{page}
											</Button>
										))}
									</>
								) : (
									<>
										{pages_landing.map((page) => (
											<Button
												key={page}
												onClick={() => handleCloseNavMenu(page)}
												sx={{ my: 2, color: 'white', display: 'block' }}>
												{page}
											</Button>
										))}
									</>
								)}
							</Box>
							{user ? (
								<>
									<Box sx={{ flexGrow: 0 }}>
										<Tooltip title='Open settings'>
											<IconButton
												onClick={handleOpenUserMenu}
												sx={{ p: 0 }}>
												<Avatar />
											</IconButton>
										</Tooltip>
										<Menu
											sx={{ mt: '45px' }}
											id='menu-appbar'
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
											onClose={() => handleCloseUserMenu()}>
											{settings.map((setting) => (
												<MenuItem
													key={setting}
													onClick={() => handleCloseUserMenu(setting)}>
													<Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
												</MenuItem>
											))}
										</Menu>
									</Box>
								</>
							) : (
								<>
									<Button
										variant='outlined'
										color='inherit'
										href='/login'
										sx={{ mx: 1 }}>
										Login
									</Button>
									<Button
										variant='contained'
										color='secondary'
										href='/signup'
										sx={{ mx: 1 }}>
										Signup
									</Button>
								</>
							)}
						</Toolbar>
					</Container>
				</AppBar>
			</HideOnScroll>

			{/* spacer so page content doesn't jump under the fixed AppBar */}
			<Toolbar />
		</>
	);
}
export default ResponsiveAppBar;
