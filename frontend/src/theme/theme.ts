import { createTheme } from '@mui/material/styles';

export const colors = {
	cream: '#fffcf2',
	sand: '#ccc5b9',
	stone: '#403d39',
	coal: '#252422',
	accent: '#eb5e28',
};

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: colors.accent, contrastText: '#ffffff' },
		secondary: { main: colors.stone, contrastText: colors.cream },
		background: { default: colors.coal, paper: colors.stone },
		text: { primary: colors.cream, secondary: colors.sand },
		divider: '#2f2d2b',
	},
	typography: {
		fontFamily: 'Roboto Mono , monospace',
		h1: { fontWeight: 800, letterSpacing: -0.5 },
		h5: { color: colors.sand },
		button: { textTransform: 'none', fontWeight: 600 },
	},
	shape: { borderRadius: 12 },
	components: {
		MuiButton: {
			styleOverrides: {
				root: { borderRadius: 10, paddingInline: 18, paddingBlock: 10 },
			},
		},
		MuiPaper: {
			styleOverrides: { root: { backgroundImage: 'none' } },
		},
	},
});

export default theme;
