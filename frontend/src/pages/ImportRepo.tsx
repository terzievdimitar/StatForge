import { useLocation } from 'react-router-dom';
import { Box, Typography, Stack, TextField, Button, Divider, Select, MenuItem, InputLabel, FormControl, Collapse, Avatar, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import ViteIcon from '../../public/icons/vite.svg';
import NextJsIcon from '../../public/icons/nextjs.svg';
import VueIcon from '../../public/icons/vue.svg';
import RemoveIcon from '@mui/icons-material/Remove';
import useDeploymentStore from '../stores/useDeploymentStore';

const ImportRepo = () => {
	const location = useLocation();
	const repo = location.state?.repo; // Retrieve repository details from state

	const [framework, setFramework] = useState('vite');
	const [port, setPort] = useState('4000');
	const [rootDirectory, setRootDirectory] = useState('./');
	const [buildCommand, setBuildCommand] = useState('npm run build');
	const [outputDirectory, setOutputDirectory] = useState('dist');
	const [installCommand, setInstallCommand] = useState('npm install');
	const [startCommand, setStartCommand] = useState('npm run start');
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [envSettingsOpen, setEnvSettingsOpen] = useState(false);
	const [envVariables, setEnvVariables] = useState([{ key: '', value: '' }]);

	const { deployRepository, isDeploying, deploymentError } = useDeploymentStore();

	const toggleSettings = () => setSettingsOpen((prev) => !prev);

	const handleAddEnvVariable = () => {
		setEnvVariables((prev) => [...prev, { key: '', value: '' }]);
	};

	const handleRemoveEnvVariable = (index: number) => {
		setEnvVariables((prev) => prev.filter((_, i) => i !== index));
	};

	const handleEnvVariableChange = (index: number, field: 'key' | 'value', value: string) => {
		setEnvVariables((prev) => {
			const updated = [...prev];
			updated[index][field] = value;
			return updated;
		});
	};

	useEffect(() => {
		// Update commands based on selected framework
		switch (framework) {
			case 'vite':
				setPort('4000');
				setBuildCommand('npm run build');
				setOutputDirectory('dist');
				setInstallCommand('npm install');
				setStartCommand('npm run start');
				break;
			case 'next.js':
				setPort('4000');
				setBuildCommand('next build');
				setOutputDirectory('.next');
				setInstallCommand('npm install');
				setStartCommand('next start');
				break;
			case 'vue':
				setPort('4000');
				setBuildCommand('npm run build');
				setOutputDirectory('dist');
				setInstallCommand('npm install');
				setStartCommand('npm run serve');
				break;
			default:
				setPort('4000');
				setBuildCommand('npm run build');
				setOutputDirectory('dist');
				setInstallCommand('npm install');
				setStartCommand('npm run start');
		}
	}, [framework]);

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				p: 3,
			}}>
			<Typography
				variant='h4'
				sx={{ fontWeight: 800, mb: 2 }}>
				Import Repository
			</Typography>

			{repo ? (
				<Box
					sx={{
						width: '100%',
						maxWidth: 800,
						bgcolor: 'background.paper',
						p: 3,
						borderRadius: 1,
						boxShadow: 3,
					}}>
					<Typography
						variant='h5'
						sx={{ fontWeight: 700, mb: 2 }}>
						{repo.name}
					</Typography>

					<Divider sx={{ my: 2, borderColor: 'text.secondary' }} />

					<Stack spacing={2}>
						<FormControl fullWidth>
							<InputLabel id='framework-label'>Framework Preset</InputLabel>
							<Select
								labelId='framework-label'
								value={framework}
								onChange={(e) => setFramework(e.target.value)}
								renderValue={(value) => (
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'>
										<Avatar
											src={value === 'vite' ? ViteIcon : value === 'next.js' ? NextJsIcon : VueIcon}
											sx={{ width: 24, height: 24 }}
										/>
										<Typography>{value}</Typography>
									</Stack>
								)}>
								<MenuItem value='vite'>
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'>
										<Avatar
											src={ViteIcon}
											sx={{ width: 24, height: 24 }}
										/>
										<Typography>Vite</Typography>
									</Stack>
								</MenuItem>
								<MenuItem value='next.js'>
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'>
										<Avatar
											src={NextJsIcon}
											sx={{ width: 24, height: 24 }}
										/>
										<Typography>Next.js</Typography>
									</Stack>
								</MenuItem>
								<MenuItem value='vue'>
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'>
										<Avatar
											src={VueIcon}
											sx={{ width: 24, height: 24 }}
										/>
										<Typography>Vue</Typography>
									</Stack>
								</MenuItem>
							</Select>
						</FormControl>

						<TextField
							label='Root Directory'
							value={rootDirectory}
							onChange={(e) => setRootDirectory(e.target.value)}
							fullWidth
						/>

						<Box
							sx={{
								width: '100%',
								border: '1px solid',
								borderColor: 'text.secondary',
								py: 1,
								px: 2,
								borderRadius: 1,
								overflow: 'hidden',
							}}>
							<Button
								onClick={toggleSettings}
								sx={{
									fontSize: 16,
									px: 0,
									textTransform: 'none',
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									color: 'text.primary',
									':hover': { backgroundColor: 'transparent' },
								}}>
								Build and Output Settings
							</Button>

							<Collapse
								in={settingsOpen}
								sx={{ overflow: 'hidden', mt: envSettingsOpen ? 2 : 0 }}>
								<Stack
									spacing={2}
									sx={{ mt: 2 }}>
									<TextField
										label='Build Command'
										value={buildCommand}
										onChange={(e) => setBuildCommand(e.target.value)}
										fullWidth
									/>
									<TextField
										label='Output Directory'
										value={outputDirectory}
										onChange={(e) => setOutputDirectory(e.target.value)}
										fullWidth
									/>
									<TextField
										label='Install Command'
										value={installCommand}
										onChange={(e) => setInstallCommand(e.target.value)}
										fullWidth
									/>
									<TextField
										label='Start Command'
										value={startCommand}
										onChange={(e) => setStartCommand(e.target.value)}
										fullWidth
									/>
									<TextField
										label='Running App Port'
										value={port}
										onChange={(e) => setPort(e.target.value)}
										fullWidth
									/>
								</Stack>
							</Collapse>
						</Box>

						<Box
							sx={{
								width: '100%',
								border: '1px solid',
								borderColor: 'text.secondary',
								py: 1,
								px: 2,
								borderRadius: 1,
								overflow: 'hidden',
							}}>
							<Button
								onClick={() => setEnvSettingsOpen((prev) => !prev)}
								sx={{
									fontSize: 16,
									px: 0,
									textTransform: 'none',
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									color: 'text.primary',
									':hover': { backgroundColor: 'transparent' },
								}}>
								Environment Variables
							</Button>

							<Collapse
								in={envSettingsOpen}
								sx={{ overflow: 'hidden', mt: envSettingsOpen ? 2 : 0 }}>
								<Stack spacing={2}>
									{envVariables.map((env, index) => (
										<Stack
											direction='row'
											spacing={1}
											alignItems='center'
											key={index}>
											<TextField
												label='Key'
												value={env.key}
												onChange={(e) => handleEnvVariableChange(index, 'key', e.target.value)}
												fullWidth
											/>
											<Typography>=</Typography>
											<TextField
												label='Value'
												value={env.value}
												onChange={(e) => handleEnvVariableChange(index, 'value', e.target.value)}
												fullWidth
											/>
											<IconButton
												onClick={() => handleRemoveEnvVariable(index)}
												color='error'>
												<RemoveIcon />
											</IconButton>
										</Stack>
									))}
									<Button
										variant='outlined'
										onClick={handleAddEnvVariable}
										sx={{
											textTransform: 'none',
											width: 'fit-content',
											color: 'text.primary',
											borderColor: 'text.secondary',
										}}>
										+ Add More
									</Button>
								</Stack>
							</Collapse>
						</Box>

						<Button
							variant='contained'
							color='primary'
							sx={{ mt: 2 }}
							onClick={() =>
								deployRepository(
									port,
									repo.owner?.login || repo.owner, // Ensure owner is a string
									repo.name,
									framework,
									buildCommand,
									startCommand,
									outputDirectory,
									installCommand,
									envVariables
								)
							}
							disabled={isDeploying}>
							{isDeploying ? 'Deploying...' : 'Deploy'}
						</Button>

						{deploymentError && (
							<Typography
								variant='body2'
								color='error'
								sx={{ mt: 1 }}>
								{deploymentError}
							</Typography>
						)}
					</Stack>
				</Box>
			) : (
				<Typography
					variant='body1'
					color='text.secondary'>
					No repository information available.
				</Typography>
			)}
		</Box>
	);
};

export default ImportRepo;
