import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import Logo from '../../logo.svg';

function Navbar() {
	const user = useSelector((state) => state.auth.user);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box>
						<img
							className="mx-3"
							src={Logo}
							alt="Logo"
							style={{ height: '72px' }}
						/>
					</Box>
					<Box sx={{ display: 'flex' }} className="text-white">
						<Typography variant="h6">Alaya Blog</Typography>
					</Box>
					{user && (
						<Box sx={{ display: 'flex' }}>
							<Typography variant="h6">
								<Link href="/" className="text-white mx-5">
									Home
								</Link>
							</Typography>
						</Box>
					)}
					{user && (
						<Box sx={{ display: 'flex', align: 'items-end' }}>
							<Typography variant="h6">
								<Link href="/" className="text-white mx-5">
									Home
								</Link>
							</Typography>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navbar;
