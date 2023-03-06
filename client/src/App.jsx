import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './Root';

const THEME = createMuiTheme({
	palette: {
		primary: {
			main: '#1ecde2',
		},
	},
});

function App({ store }) {
	return (
		<ThemeProvider theme={THEME}>
			<Provider store={store}>
				<Root />
			</Provider>
		</ThemeProvider>
	);
}

App.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	store: PropTypes.object.isRequired,
};

export default App;
