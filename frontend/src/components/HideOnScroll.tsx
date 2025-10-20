import * as React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

interface Props {
	window?: () => Window;
	children?: React.ReactElement<unknown>;
}

const HideOnScroll: React.FC<Props> = ({ children, window }) => {
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide
			appear={false}
			direction='down'
			in={!trigger}>
			{children ?? <div />}
		</Slide>
	);
};

export default HideOnScroll;
