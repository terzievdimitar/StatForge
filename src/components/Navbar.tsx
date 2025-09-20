import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<AppBar
			position='relative'
			color='transparent'
			elevation={0}>
			<Toolbar>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1 }}>
					StatForge
				</Typography>
				{isMobile ? (
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				) : (
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button color='inherit'>Hosting</Button>
						<Button color='inherit'>Website Development</Button>
						<Button color='inherit'>Analytics</Button>
						<Button color='inherit'>Contact Us</Button>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
